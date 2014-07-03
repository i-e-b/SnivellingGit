namespace SnivellingGit
{
    using System.Collections.Generic;

    /// <summary>
    /// Interface for building graphical representations of commit graphs
    /// </summary>
    public interface ICommitGraph
    {
        /// <summary>
        /// Add a commit. Must be added in child->parent->g.parent order.
        /// You should always trace from HEAD first, then other unmerged branches in reverse
        /// chronological order (youngest first).
        /// </summary>
        /// <param name="commit">Commit point to add, from repository</param>
        /// <param name="sourceRefName">The name of the reference we are tracing from</param>
        /// <param name="remoteTide">The most recent commit on the remote for this ref. Used for display.</param>
        void AddCommit(CommitPoint commit, string sourceRefName, string remoteTide);

        /// <summary>
        /// Add a remote reference. These are branches or tags that shouldn't get their own column (such as remotes).
        /// </summary>
        /// <param name="name">reference name</param>
        /// <param name="commitId">sha id of the referenced commit</param>
        void AddReference(string name, string commitId);


        /// <summary>
        /// Get all commit cells as a dictionary of (sha1 id -> GraphCell)
        /// </summary>
        IEnumerable<GraphCell> Cells();
    }
}