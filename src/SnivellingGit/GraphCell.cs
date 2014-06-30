namespace SnivellingGit
{
    /// <summary>
    /// Visual layout of a commit.
    /// </summary>
    public class GraphCell
    {
        /// <summary>
        /// Display column. Inherited from branch.
        /// </summary>
        public int Column { get; set; }

        /// <summary>
        /// Identifier of commit
        /// </summary>
        public string Id { get; set; }

        /// <summary>
        /// True if commit has more than one parent
        /// </summary>
        public bool IsMerge { get; set; }

        /// <summary>
        /// Commit message
        /// </summary>
        public string Message { get; set; }

        /// <summary>
        /// True if a merge of two commits in the same branch
        /// </summary>
        public bool FlatMerge { get; set; }
    }
}