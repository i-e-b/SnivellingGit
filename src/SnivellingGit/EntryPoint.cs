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
            //using (var repo = new Repository(@"C:\Gits\VsVim"))
            using (var repo = new Repository(@"C:\Gits\SnivellingGit"))
            {
                Console.WriteLine("That repo has " + repo.Commits.Count() + " commits");
                Console.WriteLine("  with branches " + string.Join(", ", repo.Branches.Select(b => b.CanonicalName)));
                Console.WriteLine("  currently on " + repo.Head.CanonicalName);
                Console.WriteLine("  tags: " + string.Join(", ", repo.Tags.Select(t => t.Name)));
                Console.WriteLine();

                //repo.Branches.Where(b=>!b.IsRemote).Select

                foreach (var commit in repo.Commits)
                {
                    Console.WriteLine(commit.Sha + " " + commit.Author.Name + " -> " + commit.Message.Replace("\r", "").Replace("\n", " "));
                    Console.WriteLine("   " + string.Join(", ", commit.Parents.Select(p => p.Sha)));
                }
            }
        }
    }

}