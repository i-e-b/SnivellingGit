namespace SnivellingGit
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Text;
    using LibGit2Sharp;

    /// <summary>
    /// Entry point to the sg command line
    /// </summary>
    public class HistoryRenderer : IHistoryRenderer
    {
        /// <summary>
        /// Default false. If true, try to show a branch named 'Master' before all others, including 'HEAD'.
        /// To do: generalise this to any named branch
        /// </summary>
        public bool AlwaysShowMasterFirst { get; set; }

        /// <summary>
        /// Start a host from the current directory
        /// </summary>
        public string Render(IRepository repo)
        {
            ICommitGraph table = new ColumnsCommitGraph();

            BuildCommitGraph(repo, table);


            var outp = new StringWriter();
            WriteHtmlHeader(outp);

            var status = repo.Index.RetrieveStatus();
            var wc = repo.Diff.Compare<TreeChanges>();

            var stg = string.Join(", ", status.Staged.Select(s => s.FilePath));

            outp.WriteLine("<p>Working copy: " + wc.Added.Count() + " added, " + wc.Deleted.Count() + " deleted, " + wc.Modified.Count() + " modified.</p>");

            outp.WriteLine("<p>Staged files: " + stg + "</p>");
            outp.WriteLine("<p>Undergoing operation " + repo.Info.CurrentOperation + "</p>");
            outp.WriteLine("<p>" + SafeEnumerate(repo.Commits).Count() + " commits</p>");
            outp.WriteLine("<p>  currently on " + repo.Head.CanonicalName + "</p>");
            outp.WriteLine("<p>&middot;branches " + string.Join(", ", repo.Branches.Select(b => b.CanonicalName)) + ";</p>");
            outp.WriteLine("<p>&middot;tags: " + string.Join(", ", repo.Tags.Select(t => t.Name)) + ";</p>");

            RenderCommitGraphToHtml(outp, table, rowLimit:-1);
            WriteHtmlFooter(outp);

            return outp.ToString();
        }

        static void WriteHtmlFooter(TextWriter f)
        {
            f.Write("</body></html>");
        }

        static void WriteHtmlHeader(TextWriter f)
        {
            f.WriteLine(@"<html><head><title>Log</title><style>

.flat {margin-left:10px;width:4px;height:4px;background:#aaa;}
.fullMerge {margin-left:8px;width:10px;height:10px;background:#ccc;border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;}
.commit {width:24px;height:16px;border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;}
.line {border-left: 2px solid #aaa;height: 16px;margin-left: 11px;margin-right: 11px;}

.tag path { stroke: #333; stroke-width: 1px; fill: none; }
path { stroke: #333; stroke-width: 1px; fill: none; }
svg{border:none;overflow:visible}
text { font-weight: 300; font-family: Helvetica, Arial, sans-serf; font-size: 10px; }
.node rect { stroke-width: 2px; stroke: #333; fill: #fff; opacity: 1;}
.merge circle { stroke-width: 2px; stroke: #bbb; fill: #fff; opacity: 1;}

</style></head><body>");
        }

        const string SvgHeader = @"
<svg width='{0}px' height='{1}px'>
<g transform='translate(20,20)'>
<defs>
    <marker id='arrowhead' viewBox='0 0 10 10' refX='8' refY='5' markerUnits='strokeWidth' markerWidth='8' markerHeight='5' orient='auto' style='fill: #333'>
        <path d='M 0 0 L 10 5 L 0 10 z'></path>
    </marker>
    <marker id='dot' viewBox='-10 -10 20 20' refX='0' refY='0' markerUnits='strokeWidth' markerWidth='10' markerHeight='10' orient='auto' style='fill: #333'>
        <circle cx='0' cy='0' r='3'></circle>
    </marker>
</defs>";
        const string trackedNode =
@"<g class='node' transform='translate({0},{1})'>
    <rect rx='5' ry='5' x='-10' y='-8' width='20' height='16' style='fill:#{3}'><title>{2}</title></rect>
</g>";
        const string localNode =
@"<g class='node' transform='translate({0},{1})'>
    <rect rx='5' ry='5' x='-10' y='-8' width='20' height='16' style='stroke:#{3}'><title>{2}</title></rect>
</g>";
        const string mergeNode =
@"<g class='merge' transform='translate({0},{1})'>
    <circle cx='0' cy='0' r='7'><title>{2}</title></circle>
</g>";
        const string branchTagAnnotation =
@"<g class='tag' transform='translate({0},{1})'>
    <text x='-40' y='3' text-anchor='end'>{2}</text>
    <path marker-end='url(#dot)' d='M-35,0L{3},0' style='opacity: 1;'></path>
</g>";
        const string straightLine = @"<g><path d='M{0},{1}L{2},{3}' style='opacity: 1;'></path></g>";
        const string commitMessage =
@"<g class='tag' transform='translate({0},{1})'>
    <text x='20' y='3' text-anchor='start'>{2}</text>
</g>";

        static void RenderCommitGraphToHtml(TextWriter f, ICommitGraph table, int rowLimit)
        {
            const int cellMargin = 4;
            const int cellw = 20;
            const int cellh = 16;

            var cells = table.Cells().ToArray();

            var widestLabel = cells.Select(c => GuessStringWidth(10, c.BranchNames.ToArray())).Max();
            int tagLabelMargin = widestLabel + 40;

            Func<int, int> cellX = col => (col * cellw) + tagLabelMargin;
            Func<int, int> cellY = row => (row * (cellh + cellMargin));
            Func<int, int> labelX = col => col * cellw;

            var rightMostColumnX = cellX(cells.Select(c => c.Column).Max() + 1);
            var rightMostNodeEdge = rightMostColumnX + 10;
            var rightMostEdgeOfSvg = rightMostNodeEdge;
            var sb = new StringBuilder();
            
            foreach (var cell in cells)
            {
                if (rowLimit-- == 0) break;


                // Draw branch lines (overdrawn by nodes)
                foreach (var parent in cell.ParentCells)
                {
                    // This would be much simpler to draw parent->child, rather than the native child->parent
                    // the logic would then be:
                    // if child.Col != my.Col, draw branch
                    // else if (count of children on same row == 1), draw plain line
                    // else, draw compound lines
                    //if (/*parent.Row == cell.Row + 1*/ cell.CommitPoint.Parents.Length == 1 || parent.Column != cell.Column) // simple case of nearest neigbour, or branching
                   // {
                        sb.AppendFormat(straightLine, cellX(cell.Column) + 10, cellY(cell.Row), cellX(parent.Column) + 15, cellY(parent.Row));
                    //}
                    //else // need to hint at more complex ancestry
                   // {
                    //    Console.Write(".");
                        //...
                   // }
                }

                // Draw node
                if (cell.IsMerge)
                {
                    sb.AppendFormat(mergeNode, cellX(cell.Column), cellY(cell.Row), cell.CommitPoint.Author);
                }
                else
                {
                    sb.AppendFormat(cell.LocalOnly ? localNode : trackedNode, cellX(cell.Column), cellY(cell.Row), cell.CommitPoint.Author, cell.CommitPoint.Colour);
                }

                // Draw commit message
                sb.AppendFormat(commitMessage, rightMostNodeEdge, cellY(cell.Row), cell.CommitPoint.Message);
                rightMostEdgeOfSvg = Math.Max(rightMostEdgeOfSvg, rightMostNodeEdge + GuessStringWidth(10, cell.CommitPoint.Message));

                // Draw tags and branch names
                if (cell.BranchNames.Any())
                {
                    sb.AppendFormat(branchTagAnnotation, tagLabelMargin, cellY(cell.Row), string.Join(", ", cell.BranchNames), labelX(cell.Column) - 5);
                }
            }

            f.WriteLine(SvgHeader, rightMostEdgeOfSvg + 25, cellY(cells.Length) + 25);
            f.Write(sb.ToString());
            f.Write("</g></svg>");
        }

        /// <summary>
        /// Guess the width for a proportional font.
        /// NOT ACCURATE.
        /// To do- have a client side library adjust the guesses with measurements
        /// </summary>
        static int GuessStringWidth(int fontSizePx, params string[] parts)
        {
            int l = 0;
            int narrow = fontSizePx / 8;
            int med = (2* fontSizePx) / 3;
            int wide = fontSizePx;

            foreach (var part in parts)
            {
                foreach (var c in part)
                {
                    switch (c)
                    {
                        case 'i':
                        case 'I':
                        case 'l':
                        case '1':
                        case '[':
                        case ']':
                        case '!':
                        case '|':
                        case '.':
                        case ',':
                            l += narrow;
                            break;
                        case '_':
                            l += wide;
                            break;
                        default:
                            l += char.IsUpper(c) ? wide : med;
                            break;
                    }        
                }
            }
            return l;
        }

        void BuildCommitGraph(IRepository repo, ICommitGraph table)
        {
            table.AddReference("HEAD", repo.Head.Tip.Sha);
            foreach (var branchRef in repo.Branches)
            {
                table.AddReference(branchRef.Name, branchRef.Tip.Sha);
                if (branchRef.IsTracking)
                {
                    table.AddReference(branchRef.Remote.Name, branchRef.TrackedBranch.Tip.Sha);
                }
            }

            var master = repo.Branches["master"];
            if (AlwaysShowMasterFirst && master != null)
            {
                var masterTide = GetTide(master);
                foreach (var commit in master.Commits)
                {
                    table.AddCommit(CommitPoint.FromGitCommit(commit), "master", masterTide);
                }
            }

            var headTide = GetTide(repo.Head);
            foreach (var commit in repo.Head.Commits)
            {
                table.AddCommit(CommitPoint.FromGitCommit(commit), "Head", headTide);
            }

            foreach (var branch in repo.Branches.OrderByDescending(b => b.Tip.Author.When))
            {

                if (branch.IsCurrentRepositoryHead) continue;
                if (branch.Name == "master" && AlwaysShowMasterFirst) continue;


                var tide = GetTide(branch);
                foreach (var commit in branch.Commits)
                {
                    table.AddCommit(CommitPoint.FromGitCommit(commit), branch.Name, tide);
                }

            }
        }

        /// <summary>
        /// Yield results until any kind of failure, then stop.
        /// </summary>
        static IEnumerable<T> SafeEnumerate<T>(IEnumerable<T> commits)
        {
            var e = commits.GetEnumerator();
            for (; ; )
            {
                try
                {
                    if (!e.MoveNext()) yield break;
                }
                catch
                {
                    yield break;
                }
                yield return e.Current;
            }
        }

        static string GetTide(Branch branch)
        {
            try
            {
                var common = branch.TrackingDetails.CommonAncestor;
                var tide = (common == null) ? ("") : (common.Sha);
                return tide;
            }
            catch
            {
                return "";
            }
        }

        // ReSharper disable once UnusedMember.Local
        static string Cleanup(string message, int width = 0)
        {
            var msg = message.Replace("\r", "").Replace("\n", " ").Replace("\t", " ");
            if (width <= 0) return msg;
            return msg.Substring(0, Math.Min(Console.BufferWidth - width - 10, msg.Length));
        }
    }

}