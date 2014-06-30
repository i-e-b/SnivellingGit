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
                ShowVirtualBranches = false,     // show merges inside the same branch as if they were in different branches (each side gets it's own column)
                SquashFlatMerges = true         // hide merges inside the same branch
            };
            using (var repo = new Repository(@"C:\Gits\VsVim"))
            //using (var repo = new Repository(@"C:\Gits\SnivellingGit"))
            {
                Console.WriteLine("That repo has " + repo.Commits.Count() + " commits");
                Console.WriteLine("  with branches " + string.Join(", ", repo.Branches.Select(b => b.CanonicalName)));
                Console.WriteLine("  currently on " + repo.Head.CanonicalName);
                Console.WriteLine("  tags: " + string.Join(", ", repo.Tags.Select(t => t.Name)));
                Console.WriteLine();

                

                BuildCommitGraph(repo, table);
                //RenderCommitGraphToConsole(table, rowLimit: -1);
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

        static void RenderCommitGraphToConsole(ICommitGraph table, int rowLimit)
        {
            var maxWidth = table.Cells().Select(c => c.Column).Max() + 1;
            foreach (var cell in table.Cells())
            {
                if (rowLimit-- == 0) break;

                if (cell.IsMerge)
                {
                    Console.Write(new string(' ', cell.Column));
                    Console.Write(cell.FlatMerge ? "." : "o");
                    Console.Write(new string(' ', maxWidth - (cell.Column)));
                    Console.WriteLine(Cleanup(cell.CommitPoint.Message, maxWidth));
                    for (var i = 0; i < maxWidth; i++)
                    {
                        if (cell.ParentCols.Contains(i)) Console.Write('|');
                        else Console.Write(' ');
                    }
                    Console.WriteLine();
                }
                else
                {
                    Console.Write(new string(' ', cell.Column));
                    Console.Write("#");
                    Console.Write(new string(' ', maxWidth - (cell.Column)));
                    Console.WriteLine(Cleanup(cell.CommitPoint.Message, maxWidth));
                }

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

    /// <summary>
    /// Experimental
    /// </summary>
    public class CommitTable
    {
        /// <summary>
        /// Add a branch column
        /// </summary>
        /// <param name="tipSha1">sha1 hash of the branch tip. Should be child-less</param>
        /// <param name="name">Name of the branch</param>
        /// <param name="tideLineSha1">the most recent common ancestor between local and remote. Changes to this or its parents will require a force push.</param>
        public void AddBranch(string tipSha1, string name, string tideLineSha1)
        {
            /*
             * The plan:
             * 
             * Each commit is a column. Remotes not shown by default.
             * Local-only branches should be picked out visually.
             * We also want a 'tide-line' showing where the tracking remote ends --
             *   anything ahead of the tide line is safe and won't require a force-push.
             *   Anything behind it is tricky, rebases, splits and squashes will need to be forced,
             *   and should not be handled in the first version
             */
            Console.WriteLine("Add branch " + name + " / " + tipSha1 + " / " + tideLineSha1);
        }

        /// <summary>
        /// Add a commit to the table rows
        /// </summary>
        /// <param name="when">Date of commit</param>
        /// <param name="who">author name</param>
        /// <param name="what">commit short message</param>
        /// <param name="sha1">Hash of this commit</param>
        /// <param name="parents">Parents of this commit</param>
        public void AddCommit(DateTimeOffset when, string who, string what, string sha1, string[] parents)
        {
            /*
             * The plan:
             * 
             * Visually, we want the childless commits at the top, then a table of children going down.
             * Each branch should have its own column (we might not show all of them)
             * Ignore orphaned commits at the moment -- we should pick these up later
             */
        }
    }

}