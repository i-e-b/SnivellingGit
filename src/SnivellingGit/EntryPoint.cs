namespace SnivellingGit
{
    using System;
    using System.Collections.Generic;
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
            var table = new CommitGraph();
            using (var repo = new Repository(@"C:\Gits\VsVim"))
            //using (var repo = new Repository(@"C:\Gits\SnivellingGit"))
            {
                Console.WriteLine("That repo has " + repo.Commits.Count() + " commits");
                Console.WriteLine("  with branches " + string.Join(", ", repo.Branches.Select(b => b.CanonicalName)));
                Console.WriteLine("  currently on " + repo.Head.CanonicalName);
                Console.WriteLine("  tags: " + string.Join(", ", repo.Tags.Select(t => t.Name)));
                Console.WriteLine();

                var col = 0;
                foreach (var branch in repo.Branches/*.Where(b=>!b.IsRemote)*/)
                {
                    //var common = branch.TrackingDetails.CommonAncestor;
                    //var tide = (common == null) ? ("") : (common.Sha);
                    table.AddBranch(branch.CanonicalName, branch.Tip.Sha, col/*tide*/);
                    //Console.WriteLine(col + " -> " + branch.Tip.Sha);
                    col++;
                }

                foreach (var commit in repo.Commits)
                {
                    table.AddCommit(commit.Sha, commit.Message, commit.Parents.Select(p => p.Sha).ToArray());
                    //table.AddCommit(commit.Author.When, commit.Author.Name, commit.Message, commit.Sha, commit.Parents.Select(p => p.Sha).ToArray());

                    //Console.WriteLine(commit.Sha + " -> " + string.Join(", ", commit.Parents.Select(p => p.Sha)));
                    //Console.WriteLine(commit.Author.Name + " -> " + commit.Message.Replace("\r", "").Replace("\n", " "));
                }

                //var limit = 100;
                foreach (var cell in table.Cells)
                {
                    //if (limit-- < 0) break;

                    Console.Write(new string(' ', cell.Column));
                    Console.Write(cell.FlatMerge ? "." : (cell.IsMerge ? "o" : "#"));
                    Console.Write(new string(' ', 20 - (cell.Column)));
                    Console.WriteLine(Cleanup(cell.Message));
                }
            }
        }

        static string Cleanup(string message)
        {
            var msg = message.Replace("\r", "").Replace("\n", " ").Replace("\t", " ");
            return msg.Substring(0, Math.Min(Console.BufferWidth - 30, msg.Length));
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