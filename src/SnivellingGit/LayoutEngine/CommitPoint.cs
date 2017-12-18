using System;
using System.Collections.Generic;
using System.Linq;
using LibGit2Sharp;

namespace SnivellingGit.LayoutEngine
{
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
                //commit.Author.When,  // if you use this, rebases stay in their original commit time
                commit.Committer.When, // using this, cherry-picks and rebases get the time the new commit was written.
                commit.Parents.Select(p => p.Sha).ToArray())
                {
                    Author = commit.Author.Name,
                    Colour = MakeCssColour(commit.Author.Name)
                };
        }

        private static readonly Dictionary<string, string> colourCache = new Dictionary<string, string>();

        /// <summary>
        /// Make a semi-unique, non-white colour that is constant for any given string
        /// </summary>
        static string MakeCssColour(string name)
        {
            if (colourCache.ContainsKey(name)) return colourCache[name];

            var proposed = ColorHash(name).ToString("X3");
            if (proposed == "FFF") proposed = "CA9";
            if (proposed == "000") proposed = "9CA";
            
            colourCache.Add(name, proposed);
            return proposed;
        }

        private static uint ColorHash(string str)
        {
            const int mod = 65521;
            uint a = 341, b = 682;
            foreach (char c in str) {
                if (!char.IsLetterOrDigit(c)) continue;
                a = (a + char.ToLowerInvariant(c)) % mod;
                b = (b ^ a) % mod;
            }
            return (a*b) % 0x1000;
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