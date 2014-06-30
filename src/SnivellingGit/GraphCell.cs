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
        /// True if commit has more than one parent
        /// </summary>
        public bool IsMerge { get; set; }

        /// <summary>
        /// True if a merge of two commits in the same branch
        /// </summary>
        public bool FlatMerge { get; set; }

        /// <summary>
        /// Columns of all parents (for showing merge origins)
        /// </summary>
        public IEnumerable<int> ParentCols { get; set; }

        /// <summary>
        /// Names of all branches and tags pointing to this commit cell.
        /// </summary>
        public IEnumerable<string> BranchNames { get; set; }
    }
}