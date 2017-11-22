using System;
using System.Text;
using RunProcess;
using SnivellingGit.Interfaces;
using StructureMap;

namespace SnivellingGit.GitCommands
{
    /// <summary>
    /// A set of actions that can be performed against a repo
    /// </summary>
    public static class GitAction
    {
        /// <summary> Delegate for actions which don't take arguments </summary>
        public delegate bool GeneralAction(string repoPath, out string logs);

        /// <summary>
        /// Fetch commits from all remotes, prune remotely deleted branches
        /// </summary>
        public static bool FetchAllPrune(string repoPath, out string logs)
        {
            using (var repo = ObjectFactory.GetInstance<IRepoLoader>().Load(repoPath))
            {
                if (repo == null) {
                    logs = "Repository not found at path " + repoPath;
                    return false;
                }

                using (var proc = new ProcessHost("git.exe", repo.Info.Path))
                {
                    Console.Write("Starting fetch");
                    proc.Start("fetch --all --prune");
                    proc.WaitForExit(TimeSpan.FromSeconds(30), out var code);

                    logs = "git fetch --all --prune\n"
                        + proc.StdOut.ReadAllText(Encoding.ASCII) + "\n"
                        + proc.StdErr.ReadAllText(Encoding.ASCII);

                    Console.WriteLine("...done");
                    return code == 0;
                }
            }

        }

    }
}