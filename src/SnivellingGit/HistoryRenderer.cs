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
        /// Default false. If true, complex merge ancestry will be hidden
        /// </summary>
        public bool ShowSimpleHistory { get; set; }

        /// <summary>
        /// Default false. If true, only show local branches
        /// </summary>
        public bool OnlyLocal { get; set; }

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
            f.WriteLine("<html><head><title>Log</title><style>" + Styles + "</style></head><body>");
        }

        const string Styles = @"
.flat {margin-left:10px;width:4px;height:4px;background:#aaa;}
.fullMerge {margin-left:8px;width:10px;height:10px;background:#ccc;border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;}
.commit {width:24px;height:16px;border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;}
.line {border-left: 2px solid #aaa;height: 16px;margin-left: 11px;margin-right: 11px;}

.tag path { stroke: #333; stroke-width: 1px; fill: none; opacity: 0.5; }
.cmplx path { stroke: #000; stroke-width: 1px; fill: none;  opacity: 0.2;}
path { stroke: #aaa; stroke-width: 1px; fill: none; }
#arrow path { stroke: #000; stroke-width: 1px; fill: #000; }
svg{border:none;overflow:visible}
text { font-weight: 300; font-family: Helvetica, Arial, sans-serf; font-size: 10px; }
.node rect { stroke-width: 2px; stroke: #333; fill: #fff; opacity: 1;}
.merge circle { stroke-width: 2px; stroke: #bbb; fill: #fff; opacity: 1;}
";
        const string SvgHeader = @"
<svg width='{0}px' height='{1}px'>
<g transform='translate(20,20)'>
<defs>
    <marker id='arrow' viewBox='0 0 10 10' refX='8' refY='5' markerUnits='strokeWidth' markerWidth='8' markerHeight='5' orient='auto' style='fill: #000'>
        <path d='M 0 0 L 10 5 L 0 10 z'></path>
    </marker>
    <marker id='dot' viewBox='-10 -10 20 20' refX='0' refY='0' markerUnits='strokeWidth' markerWidth='10' markerHeight='10' orient='auto' style='fill: #333'>
        <circle cx='0' cy='0' r='3'></circle>
    </marker>
</defs>";
        const string trackedNode =
@"<g class='node' transform='translate({0},{1})'>
    <rect rx='5' ry='5' x='-10' y='-8' width='20' height='14' style='fill:#{3}'><title>{2}</title></rect>
</g>";
        const string localNode =
@"<g class='node' transform='translate({0},{1})'>
    <rect rx='5' ry='5' x='-10' y='-8' width='20' height='14' style='stroke:#{3}'><title>{2}</title></rect>
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
        const string simpleLine = @"<g><path d='M{0},{1}L{2},{3}' style='opacity: 1;'></path></g>";
        const string commitMessage =
@"<g class='tag' transform='translate({0},{1})'>
    <text x='20' y='3' text-anchor='start'>{2}</text>
</g>";

        const int cellMargin = 4;
        const int cellw = 20;
        const int cellmarginw = cellw + 10;
        const int cellh = 14;

        void RenderCommitGraphToHtml(TextWriter f, ICommitGraph table, int rowLimit)
        {
            var cells = table.Cells().ToArray();

            var widestLabel = cells.Select(c => GuessStringWidth(10, c.BranchNames.ToArray())).Max();
            int tagLabelMargin = widestLabel + 40;

            Func<int, int> cellX = col => (col * cellmarginw) + tagLabelMargin;
            Func<int, int> cellY = row => (row * (cellh + cellMargin));
            Func<int, int> labelX = col => col * cellmarginw;

            var rightMostColumnX = cellX(cells.Select(c => c.Column).Max() + 1);
            var rightMostNodeEdge = rightMostColumnX + 10;
            var rightMostEdgeOfSvg = rightMostNodeEdge;
            var sb = new StringBuilder();

            // Draw branch lines (overdrawn by nodes)
            bool odd;
            DrawAncestryLines(rowLimit, cells, sb, cellX, cellY, out odd);

            foreach (var cell in cells)
            {
                if (rowLimit-- == 0) break;

                var title = cell.CommitPoint.Author+"\r\n"+cell.CommitPoint.Id;
                // Draw node
                if (cell.IsMerge)
                {
                    sb.AppendFormat(mergeNode, cellX(cell.Column), cellY(cell.Row), title);
                }
                else
                {
                    sb.AppendFormat(cell.LocalOnly ? localNode : trackedNode, cellX(cell.Column), cellY(cell.Row), title, cell.CommitPoint.Colour);
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

        void DrawAncestryLines(int rowLimit, IEnumerable<GraphCell> cells, StringBuilder sb, Func<int, int> cellX, Func<int, int> cellY, out bool odd)
        {
            odd = true;
            foreach (var cell in cells) // increasing row number
            {
                if (rowLimit-- == 0)
                {
                    break;
                }

                var complex = cell.ChildCells.Count(c => cell.Column == c.Column) > 1;
                if (complex)
                {
                    odd = !odd;
                }
                int depth = 1;
                foreach (var child in cell.ChildCells) // increasing row number
                {
                    var distance = Math.Abs(child.Row - cell.Row);

                    if (child.Column != cell.Column) // an unmerged branch
                    {
                        sb.AppendFormat(simpleLine, cellX(cell.Column), cellY(cell.Row), cellX(child.Column), cellY(child.Row));
                    }
                    else if (!complex) // simple inheritance
                    {
                        if (child.IsMerge && distance > 1) // actually complex. Show on left.
                        {
                            if (!ShowSimpleHistory)
                            {
                                sb.Append(DrawLoop(left: true, depth: distance, x: cellX(cell.Column), y1: cellY(cell.Row), y2: cellY(child.Row)));
                            }
                        }
                        else // really simple, draw a straight line between the two
                        {
                            sb.AppendFormat(simpleLine, cellX(cell.Column), cellY(child.Row), cellX(child.Column), cellY(cell.Row));
                        }
                    }
                    else // complex inheritance, show on right
                    {
                        if (!ShowSimpleHistory)
                        {
                            sb.Append(DrawLoop(left: odd, depth: depth, x: cellX(cell.Column), y1: cellY(cell.Row), y2: cellY(child.Row)));
                            depth++;
                        }
                    }
                }
            }
        }

        const string complexLine = @"<g class='cmplx'><path d='M{0},{1} q{2} 0 {2} {3} L{4},{5} {4},{6} q0 {3} {7} {3}'></path></g>";
        static string DrawLoop(bool left, int depth, int x, int y1, int y2)
        {
            var offs = (left) ? (-(cellw / 2)) : (cellw / 2);
            var stepping = (left) ? ((-3 * depth) - 3) : ((3 * depth) + 3);
            var upPixDepth = -Math.Abs(stepping);
            var pixDepth = stepping;

            var x_inner = x + offs;
            var x_outer = x + offs + stepping;

            var yLower = Math.Max(y1,y2);
            var yUpper = Math.Min(y1,y2);

            var yL1 = yLower + upPixDepth;
            var yU1 = yUpper - upPixDepth;

            return string.Format(complexLine, x_inner, yLower, pixDepth, upPixDepth, x_outer, yL1, yU1, -pixDepth);
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
                var chars = part.ToCharArray();
                foreach (var c in chars)
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
                if (branchRef.IsRemote && OnlyLocal) continue;
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
                foreach (var commit in SafeEnumerate(master.Commits))
                {
                    if (table.AddCommit(CommitPoint.FromGitCommit(commit), "master", masterTide)) break;
                }
            }

            var headTide = GetTide(repo.Head);
            foreach (var commit in SafeEnumerate(repo.Head.Commits))
            {
                if (table.AddCommit(CommitPoint.FromGitCommit(commit), "Head", headTide)) break;
            }

            foreach (var branch in repo.Branches.OrderByDescending(b => b.Tip.Author.When))
            {
                if (branch.IsRemote && OnlyLocal) continue;
                if (branch.IsCurrentRepositoryHead) continue;
                if (branch.Name == "master" && AlwaysShowMasterFirst) continue;


                var tide = GetTide(branch);
                foreach (var commit in SafeEnumerate(branch.Commits))
                {
                    if (table.AddCommit(CommitPoint.FromGitCommit(commit), branch.Name, tide)) break;
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