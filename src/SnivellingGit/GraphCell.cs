namespace SnivellingGit
{
    using System.Collections.Generic;

    /// <summary>
    /// Visual layout of a commit.
    /// </summary>
    public class GraphCell
    {
        /// <summary>
        /// The commit point for this cell
        /// </summary>
        public CommitPoint CommitPoint { get; set; }

        /// <summary>
        /// Display column. Inherited from branch.
        /// </summary>
        public int Column { get; set; }

        /// <summary>
        /// Display row. From sort order, zero based.
        /// </summary>
        public int Row { get; set; }

        /// <summary>
        /// True if commit has more than one parent
        /// </summary>
        public bool IsMerge { get; set; }

        /// <summary>
        /// Names of all branches and tags pointing to this commit cell.
        /// </summary>
        public IEnumerable<string> BranchNames { get; set; }

        /// <summary>
        /// Visual cell of child nodes
        /// </summary>
        /// <remarks>Parent->Child order makes drawing the edges a lot easier</remarks>
        public IEnumerable<GraphCell> ChildCells { get; set; }

        /// <summary>
        /// True if this commit is only in the local repo. False if it is on a tracked remote.
        /// </summary>
        public bool LocalOnly { get; set; }

        /// <summary>
        /// True if the local branch tracks a remote that has been deleted.
        /// (would be removed by a `git fetch --prune`)
        /// </summary>
        public bool IsPrunable { get; set; }
    }
}