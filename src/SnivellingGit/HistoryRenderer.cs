namespace SnivellingGit
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.IO.Abstractions;
    using System.Linq;
    using LibGit2Sharp;

    /// <summary>
    /// Entry point to the sg command line
    /// </summary>
    public class HistoryRenderer : IHistoryRenderer
    {
        readonly IFileSystem fs;

        /// <summary>
        /// Create entry point
        /// </summary>
        /// <param name="fs"></param>
        public HistoryRenderer(IFileSystem fs)
        {
            this.fs = fs;
        }

        /// <summary>
        /// Start a host from the current directory
        /// </summary>
        public string Render(string path)
        {
            ICommitGraph table = new ColumnsCommitGraph
            {
                ShowVirtualBranches = true,     // show merges inside the same branch as if they were in different branches (each side gets it's own column)
                SquashFlatMerges = false        // hide merges inside the same branch
            };

            using (var repo = new Repository(path))
            {
                BuildCommitGraph(repo, table);


                var outp = new StringWriter();
                WriteHtmlHeader(outp);
 /*
                var status = repo.Index.RetrieveStatus();
                var wc = repo.Diff.Compare<TreeChanges>();

               
                var stg = string.Join(", ", status.Staged.Select(s=>s.FilePath));

                outp.WriteLine("<p>Working copy: " + wc.Added.Count() + " added, " + wc.Deleted.Count() + " deleted, " + wc.Modified.Count() + " modified.</p>");

                outp.WriteLine("<p>Staged files: " + stg + "</p>");
                outp.WriteLine("<p>Undergoing operation " + repo.Info.CurrentOperation + "</p>");
                outp.WriteLine("<p>" + SafeEnumerate(repo.Commits).Count() + " commits</p>");
                outp.WriteLine("<p>  currently on " + repo.Head.CanonicalName + "</p>");
                outp.WriteLine("<p>&middot;branches " + string.Join(", ", repo.Branches.Select(b => b.CanonicalName)) + ";</p>");
                outp.WriteLine("<p>&middot;tags: " + string.Join(", ", repo.Tags.Select(t => t.Name)) + ";</p>");*/

                //RenderCommitGraphToHtml(outp, table, rowLimit: -1);
                WriteGraphJson(outp, table);
                WriteHtmlFooter(outp);

                return outp.ToString();
            }
        }

        static void WriteHtmlFooter(TextWriter f)
        {
            f.WriteLine(@"<script>
function draw() {
    var renderer = new dagreD3.Renderer();
    renderer.zoom(false);
    var layout = renderer.run(dagreD3.json.decode(commits, edges), d3.select('svg g'));

  d3.select('svg')
    .attr('width', layout.graph().width + 40)
    .attr('height', layout.graph().height + 40);
}
</script>");
            f.WriteLine("</body></html>");
        }

        static void WriteHtmlHeader(TextWriter f)
        {
            f.WriteLine("<html><head><title>Log</title>");
            f.WriteLineAsync("<script src=\"/?js\"></script>");
            f.WriteLineAsync("<style>");
            f.WriteLine(@"
svg{border:none;overflow:visible}

text {
  font-weight: 300;
  font-family: Helvetica, Arial, sans-serf;
  font-size: 14px;
}

.node rect {
  stroke-width: 2px;
  stroke: #333;
  fill: #fff;
}

#node-CLOSED rect {
  fill: #f77;
}

#node-ESTAB rect {
  fill: #7f7;
}

.edgeLabel rect {
  fill: #fff;
}

.edgePath path {
  stroke: #333;
  stroke-width: 1.5px;
  fill: none;
}
");
            f.WriteLine("</style></head>");
            f.WriteLine("<body onload='draw();'>");
            f.WriteLine("<svg width='100%' height='100%'><g transform='translate(20,20)'/></svg>");

        }

        static void WriteGraphJson(TextWriter outp, ICommitGraph table)
        {
            outp.WriteLine("<script>");

            // Write this out directly. Add colour and/or gravatar of author.
            outp.Write("var commits = [");
            outp.Write(string.Join(", ", table.Cells().Select(c=>"\"" + c.CommitPoint.Id + "\"")));
            outp.Write("].map(function(s){return {id:s}});");


            outp.WriteLine();
            outp.WriteLine("var edges = [");
            foreach (var cell in table.Cells())
            {
                foreach (var parent in cell.CommitPoint.Parents)
                {
                    outp.WriteLine("{ u: \"" + cell.CommitPoint.Id + "\", v: \"" + parent + "\"},");
                }
            }
            outp.WriteLine("];");

            outp.WriteLine("</script>");
        }

        static void RenderCommitGraphToHtml(TextWriter f, ICommitGraph table, int rowLimit)
        {
            var maxWidth = table.Cells().Select(c => c.Column).Max() + 2;
            f.WriteLine("<table>");
            foreach (var cell in table.Cells())
            {
                f.Write("\r\n<tr>");
                if (rowLimit-- == 0) break;

                f.Write("<td>" + string.Join(", ", cell.BranchNames) + "</td>");

                if (cell.IsMerge)
                {
                    f.Write("<td colspan='" + (cell.Column + 1) + "'/>");
                    if (cell.FlatMerge)
                    {
                        f.Write("<td><div class='flat'></div></td>");
                    }
                    else
                    {
                        f.Write("<td><div class='fullMerge'></div></td>");
                    }
                    f.Write("<td colspan='" + (maxWidth - cell.Column) + "'/>");

                    f.Write("<td rowspan='2'>" + Cleanup(cell.CommitPoint.Message) + "</td>");
                    // to do: merge lines

                    f.WriteLine("</tr><td></td><td></td>");
                    for (var i = 0; i < maxWidth; i++)
                    {
                        if (cell.ParentCols.Contains(i)) f.Write("<td><div class='line'></div></td>");
                        else f.Write("<td></td>");
                    }
                    f.WriteLine();
                    f.Write("<tr>");
                }
                else
                {
                    f.Write("<td colspan='" + (cell.Column + 1) + "'/>");
                    f.Write("<td><div class='commit' style='background:#" + cell.CommitPoint.Colour + "' title='" + cell.CommitPoint.Author + "'></div></td>"); // to do: colourise
                    f.Write("<td colspan='" + (maxWidth - cell.Column) + "'/>");
                    f.Write("<td>" + Cleanup(cell.CommitPoint.Message) + "</td>");
                }

                f.Write("</tr>");
            }
            f.Write("</table>");
        }

        static void BuildCommitGraph(IRepository repo, ICommitGraph table)
        {
            foreach (var branch in repo.Branches.Where(b => !b.IsRemote))
            {
                var tide = GetTide(branch);
                table.AddBranch(branch.Name, branch.Tip.Sha, tide);

                if (branch.IsTracking)
                {
                    table.AddReference(branch.Remote.Name, branch.TrackedBranch.Tip.Sha);
                }
            }

            foreach (var commit in SafeEnumerate(repo.Commits))
            {
                table.AddCommit(CommitPoint.FromGitCommit(commit));
            }
        }

        /// <summary>
        /// Yield results until any kind of failure, then stop.
        /// </summary>
        static IEnumerable<T> SafeEnumerate<T>(IEnumerable<T> commits)
        {
            var e = commits.GetEnumerator();
            for(;;)
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