using System.Collections.Generic;
using System.Linq;
using LibGit2Sharp;

namespace SnivellingGit
{
    /// <summary>
    /// Walk a repo and build a commit graph
    /// </summary>
    public static class HistoryWalker
    {
        /// <summary>
        /// Walk a repo and fill in the commit graph. Also adds any extra meta-data needed
        /// </summary>
        public static void BuildCommitGraph(IRepository repo, ICommitGraph table, bool OnlyLocal, bool AlwaysShowMasterFirst)
        {
            table.AddReference("HEAD", repo.Head.Tip.Sha);
            foreach (var branchRef in repo.Branches)
            {
                if (branchRef.IsRemote && OnlyLocal) continue;

                if (branchRef.IsTracking)
                {
                    if (branchRef.TrackedBranch.Tip == null) // is prunable
                    {
                        table.AddReference(branchRef.Name, branchRef.Tip.Sha);
                        table.MarkPrunable(branchRef.Tip.Sha);
                    }
                    else // add remote reference
                    {
                        table.AddReference(branchRef.Name, branchRef.TrackedBranch.Tip.Sha);
                    }
                }
                else // add local reference
                {
                    table.AddReference(branchRef.Name, branchRef.Tip.Sha);
                }
            }

            var master = repo.Branches["master"];
            if (AlwaysShowMasterFirst && master != null)
            {
                var masterTide = GetTide(master);
                foreach (var commit in SafeEnumerate(master.Commits))
                {
                    if (table.AddCommit(CommitPoint.FromGitCommit(commit), "master", masterTide)) break;
                }
            }

            var headTide = GetTide(repo.Head);
            foreach (var commit in SafeEnumerate(repo.Head.Commits))
            {
                if (table.AddCommit(CommitPoint.FromGitCommit(commit), "Head", headTide)) break;
            }

            foreach (var branch in repo.Branches.OrderByDescending(b => b.Tip.Author.When))
            {
                if (branch.IsRemote && OnlyLocal) continue;
                if (branch.IsCurrentRepositoryHead) continue;
                if (branch.Name == "master" && AlwaysShowMasterFirst) continue;


                var tide = GetTide(branch);
                foreach (var commit in SafeEnumerate(branch.Commits))
                {
                    if (table.AddCommit(CommitPoint.FromGitCommit(commit), branch.Name, tide)) break;
                }

            }
        }
        

        /// <summary>
        /// Yield results until any kind of failure, then stop.
        /// </summary>
        public static IEnumerable<T> SafeEnumerate<T>(IEnumerable<T> commits)
        {
            using (var e = commits.GetEnumerator())
            {
                for (;;)
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
        }

        /// <summary>
        /// Get the SHA of the most common ancestor between the branch and it's tracked remote
        /// Returns empty string if not found.
        /// </summary>
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
    }
}