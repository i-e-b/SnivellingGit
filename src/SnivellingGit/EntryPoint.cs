namespace SnivellingGit
{
    using System;
    using System.IO.Abstractions;
    using System.Linq;
    using LibGit2Sharp;

    /// <summary>
    /// Entry point to the sg command line
    /// </summary>
    public class EntryPoint : IEntryPoint
    {
        readonly IFileSystem fs;

        /// <summary>
        /// Create entry point
        /// </summary>
        /// <param name="fs"></param>
        public EntryPoint(IFileSystem fs)
        {
            this.fs = fs;
        }

        /// <summary>
        /// Start a host from the current directory
        /// </summary>
        public void Run()
        {
            ICommitGraph table = new ColumnsCommitGraph { 
                ShowVirtualBranches = true,     // show merges inside the same branch as if they were in different branches (each side gets it's own column)
                SquashFlatMerges = false         // hide merges inside the same branch
            };
            //using (var repo = new Repository(@"C:\Gits\VsVim"))
            //using (var repo = new Repository(@"C:\Gits\SnivellingGit"))
            using (var repo = new Repository(@"C:\Gits\repo-sample"))
            {
                Console.WriteLine("That repo has " + repo.Commits.Count() + " commits");
                Console.WriteLine("  with branches " + string.Join(", ", repo.Branches.Select(b => b.CanonicalName)));
                Console.WriteLine("  currently on " + repo.Head.CanonicalName);
                Console.WriteLine("  tags: " + string.Join(", ", repo.Tags.Select(t => t.Name)));
                Console.WriteLine();

                BuildCommitGraph(repo, table);
                RenderCommitGraphToHtml(@"C:\Temp\GitTable.html", table, rowLimit: -1);
            }
        }

        void RenderCommitGraphToHtml(string target, ICommitGraph table, int rowLimit)
        {
            var maxWidth = table.Cells().Select(c => c.Column).Max() + 1;
            using (var f = fs.File.CreateText(target))
            {
                f.WriteLine("<html><head><title>Log</title><style>");
                f.WriteLine(".flat {margin-left:10px;width:4px;height:4px;background:#aaa;}");
                f.WriteLine(".fullMerge {margin-left:8px;width:10px;height:10px;background:#ccc;border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;}");
                f.WriteLine(".commit {width:24px;height:16px;border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;}");
                f.WriteLine(".line {border-left: 2px solid #eee;height: 16px;margin-left: 11px;margin-right: 11px;}"); // vertical line to join commits
                f.WriteLine("</style></head><body><table>");
                foreach (var cell in table.Cells())
                {
                    f.Write("\r\n<tr>");
                    if (rowLimit-- == 0) break;

                    f.Write("<td>" + string.Join(", ", cell.BranchNames) + "</td>");

                    if (cell.IsMerge)
                    {
                        f.Write("<td colspan='" + cell.Column + "'/>");
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

                        f.WriteLine("</tr><td></td>");
                        for (int i = 0; i < maxWidth; i++)
                        {
                            if (cell.ParentCols.Contains(i)) f.Write("<td><div class='line'></div></td>");
                            else f.Write("<td></td>");
                        }
                        f.WriteLine();
                        f.Write("<tr>");
                    }
                    else
                    {
                        f.Write("<td colspan='" + cell.Column + "'/>");
                        f.Write("<td><div class='commit' style='background:#"+cell.CommitPoint.Colour+"' title='"+cell.CommitPoint.Author+"'></div></td>"); // to do: colourise
                        f.Write("<td colspan='" + (maxWidth - cell.Column) + "'/>");
                        f.Write("<td>" + Cleanup(cell.CommitPoint.Message) + "</td>");
                    }

                    f.Write("</tr>");
                }
                f.Write("</table></body></html>");
            }
        }

        static void BuildCommitGraph(IRepository repo, ICommitGraph table)
        {
            foreach (var branch in repo.Branches /*.Where(b=>!b.IsRemote)*/)
            {
                var common = branch.TrackingDetails.CommonAncestor;
                var tide = (common == null) ? ("") : (common.Sha);
                table.AddBranch(branch.CanonicalName, branch.Tip.Sha, tide);
            }

            foreach (var commit in repo.Commits)
            {
                table.AddCommit(CommitPoint.FromGitCommit(commit));
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