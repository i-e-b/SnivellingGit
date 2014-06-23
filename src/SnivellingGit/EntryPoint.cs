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
            var d = @"C:\Gits\SnivellingGit"; //fs.Directory.GetCurrentDirectory();
            using (var repo = new Repository(d))
            {
                Console.WriteLine("That repo has " + repo.Commits.Count() + " commits");
            }
        }
    }
}