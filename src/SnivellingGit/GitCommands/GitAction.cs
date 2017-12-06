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

        
        /// <summary> Delegate for actions which take a single argument </summary>
        public delegate bool TargetAction(string repoPath, string target, out string logs);

        /// <summary>
        /// Fetch commits from all remotes, prune remotely deleted branches
        /// </summary>
        public static bool FetchAllPrune(string repoPath, out string logs)
        {
            return RunBasicCommand(repoPath, "fetch --all --prune", out logs);
        }
        
        /// <summary>
        /// Do a pull with fast-forward only flag set
        /// </summary>
        public static bool PullFastForward(string repoPath, out string logs)
        {
            return RunBasicCommand(repoPath, "pull --ff-only", out logs);
        }

        /// <summary>
        /// Checkout a name
        /// </summary>
        public static bool Checkout(string repoPath, string target, out string logs)
        {
            return RunBasicCommand(repoPath, "checkout \""+target+"\"", out logs);
        }

        private static bool RunBasicCommand(string repoPath, string command, out string logs) {
            using (var repo = ObjectFactory.GetInstance<IRepoLoader>().Load(repoPath))
            {
                if (repo == null) {
                    logs = "Repository not found at path " + repoPath;
                    return false;
                }

                using (var proc = new ProcessHost("git.exe", repo.Info.WorkingDirectory))
                {
                    Console.Write("Starting fetch");
                    proc.Start(command);
                    proc.WaitForExit(TimeSpan.FromSeconds(30), out var code);

                    logs = "git "+command+"\n"
                           + proc.StdOut.ReadAllText(Encoding.ASCII) + "\n"
                           + proc.StdErr.ReadAllText(Encoding.ASCII);

                    Console.WriteLine("...done");
                    return code == 0;
                }
            }
        }
    }
}