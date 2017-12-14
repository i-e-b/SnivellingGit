using System;
using LibGit2Sharp;
using SnivellingGit.Interfaces;

namespace SnivellingGit.LayoutEngine
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
            if (repo.Head == null || repo.Head.Tip == null)
            {
                table.AddCommit(new CommitPoint("0", "Empty Repo", DateTimeOffset.Now, new string[0]), "Empty", "");
                return;
            }

            table.AddReference("HEAD", repo.Head.Tip.Sha);
            foreach (var branchRef in repo.Branches)
            {
                if (branchRef.IsRemote && OnlyLocal) continue;

                if (branchRef.IsTracking)
                {
                    if (branchRef.TrackedBranch.Tip == null) // is prunable
                    {
                        table.MarkPrunable(branchRef.Tip.Sha);
                    }
                    else if (! OnlyLocal) // add remote reference
                    {
                        table.AddReference(branchRef.TrackedBranch.FriendlyName, branchRef.TrackedBranch.Tip.Sha);
                    }
                }

                // add direct reference (may be local, or untracked remote)
                table.AddReference(branchRef.FriendlyName, branchRef.Tip.Sha);
            }

            var master = repo.Branches["master"];
            if (AlwaysShowMasterFirst && master != null)
            {
                var masterTide = GetTide(master);
                var masterIter = HistoryCache.StartFrom(master.Tip);
                foreach (var commit in masterIter)
                {
                    if (table.AddCommit(CommitPoint.FromGitCommit(commit), "master", masterTide)) break;
                }
            }

            var headTide = GetTide(repo.Head);
            var headIter = HistoryCache.StartFrom(repo.Head.Tip);
            foreach (var commit in headIter)
            {
                if (table.AddCommit(CommitPoint.FromGitCommit(commit), "Head", headTide)) break;
            }

            foreach (var branch in repo.Branches)
            {
                if (branch.IsRemote && OnlyLocal) continue;
                if (branch.IsCurrentRepositoryHead) continue;
                if (branch.FriendlyName == "master" && AlwaysShowMasterFirst) continue;

                var tide = GetTide(branch);

                var iter = HistoryCache.StartFrom(branch.Tip);
                foreach (var commit in iter)
                {
                    var cp = CommitPoint.FromGitCommit(commit);
                    table.AddCommit(cp, branch.FriendlyName, tide);
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