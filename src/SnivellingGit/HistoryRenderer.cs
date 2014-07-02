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

            RenderCommitGraphToHtml(outp, table, rowLimit: -1);
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

.edgePath path { stroke: #333; stroke-width: 1.5px; fill: none; }
svg{border:none;overflow:visible}
text { font-weight: 300; font-family: Helvetica, Arial, sans-serf; font-size: 14px; }
.node rect { stroke-width: 2px; stroke: #333; fill: #fff; opacity: 1;}

</style></head><body>");
        }

        static void RenderCommitGraphToHtml(TextWriter f, ICommitGraph table, int rowLimit)
        {
            var maxWidth = (table.Cells().Select(c => c.Column).Max() + 1) * 24;
            var sb = new StringBuilder();
            
            int y = 0;
            foreach (var cell in table.Cells())
            {
                if (rowLimit-- == 0) break;

                if (cell.IsMerge)
                {
                    // draw circle
                }
                else
                {
                    const string trackedNode =
@"<g class='node enter' transform='translate({0},{1})'>
    <rect rx='5' ry='5' x='-10' y='-10' width='20' height='20' style='fill:#{3}'><title>{2}</title></rect>
</g>";
                    const string localNode =
@"<g class='node enter' transform='translate({0},{1})'>
    <rect rx='5' ry='5' x='-10' y='-10' width='20' height='20' style='stroke:#{3}'><title>{2}</title></rect>
</g>";

                    sb.AppendFormat(cell.LocalOnly ? localNode : trackedNode, cell.Column * 24, y, cell.CommitPoint.Author, cell.CommitPoint.Colour);
                }

                y += 24;
            }
            f.WriteLine(@"
<svg width='100%' height='{0}px'>
<g transform='translate(20,20)'>
<defs>
    <marker id='arrowhead' viewBox='0 0 10 10' refX='8' refY='5' markerUnits='strokeWidth' markerWidth='8' markerHeight='5' orient='auto' style='fill: #333'>
        <path d='M 0 0 L 10 5 L 0 10 z'></path>
    </marker>
</defs>", y + 25);
            f.Write(sb.ToString());
            f.Write("</g></svg>");
        }

        static void BuildCommitGraph(IRepository repo, ICommitGraph table)
        {
            foreach (var commit in repo.Head.Commits)
            {
                table.AddCommit(CommitPoint.FromGitCommit(commit), "Head", "");
            }

            foreach (var branch in repo.Branches.OrderByDescending(b => b.Tip.Author.When))
            {
                if (branch.IsCurrentRepositoryHead) continue;

                var tide = GetTide(branch);
                foreach (var commit in branch.Commits)
                {
                    table.AddCommit(CommitPoint.FromGitCommit(commit), branch.Name, tide);
                }

                if (branch.IsTracking)
                {
                    table.AddReference(branch.Remote.Name, branch.TrackedBranch.Tip.Sha);
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

        static string Cleanup(string message, int width = 0)
        {
            var msg = message.Replace("\r", "").Replace("\n", " ").Replace("\t", " ");
            if (width <= 0) return msg;
            return msg.Substring(0, Math.Min(Console.BufferWidth - width - 10, msg.Length));
        }
    }

}