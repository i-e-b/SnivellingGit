using System;
using System.Text;
using LibGit2Sharp;
using RunProcess;

namespace SnivellingGit.GitCommands
{
    /// <summary>
    /// A set of actions that can be performed against a repo
    /// </summary>
    public static class GitAction
    {

        /// <summary>
        /// Fetch commits from all remotes, prune remotely deleted branches
        /// </summary>
        public static void FetchAllPrune(IRepository repo)
        {
            using (var proc = new ProcessHost("git.exe", repo.Info.Path))
            {
                Console.WriteLine("Starting fetch");
                proc.Start("fetch --all --prune");
                proc.WaitForExit(TimeSpan.FromSeconds(30));
                Console.WriteLine("OUT:" + proc.StdOut.ReadAllText(Encoding.ASCII));
                Console.WriteLine("ERR:" + proc.StdErr.ReadAllText(Encoding.ASCII));
                Console.WriteLine("Done");
            }

        }
    }
}