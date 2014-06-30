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
    }
}