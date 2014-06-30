namespace SnivellingGit
{
    using System.Collections.Generic;

    /// <summary>
    /// Interface for building graphical representations of commit graphs
    /// </summary>
    public interface ICommitGraph
    {
        /// <summary>
        /// Add a branch (all branches must be added before adding commits)
        /// </summary>
        /// <param name="name">reference name of the branch</param>
        /// <param name="tip">sha id of the tip of this branch</param>
        /// <param name="remoteTide">most recent shared commit between local and remote. Changes to this commit or older require a force push.</param>
        void AddBranch(string name, string tip, string remoteTide);

        /// <summary>
        /// Add a commit. Must be added in child->parent->g.parent order.
        /// </summary>
        void AddCommit(CommitPoint commit);

        /// <summary>
        /// Get all commit cells
        /// </summary>
        IEnumerable<GraphCell> Cells();

    }
}