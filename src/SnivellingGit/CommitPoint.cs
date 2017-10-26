namespace SnivellingGit
{
    using System;
    using System.Linq;
    using LibGit2Sharp;

    /// <summary>
    /// Represents a point in the commit DAG.
    /// Used as the layout model for a commit point.
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
                commit.Author.When,
                commit.Parents.Select(p => p.Sha).ToArray())
                {
                    Author = commit.Author.Name,
                    Colour = MakeCssColour(commit.Author.Name)
                };
        }

        /// <summary>
        /// Make a semi-unique, non-white colour that is constant for any given string
        /// </summary>
        static string MakeCssColour(string name)
        {
            var proposed = name.GetHashCode().ToString("X").Substring(0, 3);
            if (proposed == "FFF") proposed = "CA9";
            return proposed;
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
        public CommitPoint(string id, string message, DateTimeOffset when, string[] parents)
        {
            Id = id;
            Message = message;
            Parents = parents;
            Date = when;
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

        /// <summary>
        /// Time of commit (in original repo, not related to push time)
        /// </summary>
        public DateTimeOffset Date { get; set; }
    }
}