namespace SnivellingGit
{
    using System.Linq;
    using LibGit2Sharp;

    /// <summary>
    /// Represents a point in the commit DAG
    /// </summary>
    public class CommitPoint
    {
        /// <summary>
        /// Create from a Git commit
        /// </summary>
        public static CommitPoint FromGitCommit(Commit commit)
        {
            return new CommitPoint(
                commit.Sha,
                commit.MessageShort,
                commit.Parents.Select(p => p.Sha).ToArray())
                {
                    Author = commit.Author.Name,
                    Colour = MakeCssColour(commit.Author.Name)
                };
        }

        static string MakeCssColour(string name)
        {
            return name.GetHashCode().ToString("X").Substring(0,3);
        }

        /// <summary>
        /// A generated colour for the author's name
        /// </summary>
        public string Colour { get; set; }

        /// <summary>
        /// Name of author
        /// </summary>
        public string Author { get; set; }

        /// <summary>
        /// Create from data
        /// </summary>
        public CommitPoint(string id, string message, string[] parents)
        {
            Id = id;
            Message = message;
            Parents = parents;
        }

        /// <summary>
        /// Parents of this commit
        /// </summary>
        public string[] Parents { get; set; }

        /// <summary>
        /// Commit message
        /// </summary>
        public string Message { get; set; }

        /// <summary>
        /// SHA1 identity for the commit
        /// </summary>
        public string Id { get; set; }
    }
}