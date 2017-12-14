using System.Collections;
using System.Collections.Generic;
using System.Linq;
using LibGit2Sharp;

namespace SnivellingGit.LayoutEngine
{
    /// <summary>
    /// Stores previously read commit history
    /// </summary>
    public static class HistoryCache {
        
        // TODO -- need to separate the cache by repo

        /// <summary>
        /// Return a cache-backed enumerator for all the parent commits under a child
        /// </summary>
        public static IEnumerable<Commit> StartFrom(Commit branchTip)
        {
            return new CommitWalker(branchTip);
        }

        private static readonly Dictionary<string, Commit> cache = new Dictionary<string, Commit>();
        private static readonly Dictionary<string, string[]> relations = new Dictionary<string, string[]>();
        private static readonly object Lock = new object();

        /// <summary>
        /// Check the cache for an entry
        /// </summary>
        public static bool TryLookup(string child, out string[] parents) {
            parents = null;
            lock (Lock)
            {
                if (!relations.ContainsKey(child)) return false;
                parents = relations[child];
                return true;
            }
        }

        /// <summary>
        /// Get an element from the cache
        /// </summary>
        public static Commit Get(string sha) {return cache[sha]; }

        /// <summary>
        /// Add a commit to the cache if it is not already present
        /// </summary>
        public static void Add(Commit c) {
            lock (Lock)
            {
                if (cache.ContainsKey(c.Sha)) return;
                cache.Add(c.Sha, c);
                var parents = c.Parents.Select(p => p.Sha).ToArray();
                relations.Add(c.Sha, parents);
            }
        }

        /// <summary>
        /// Returns true if the cache contains a commit for the given hash
        /// </summary>
        public static bool Has(string sha)
        {
            return cache.ContainsKey(sha);
        }
    }

    /// <summary>
    /// Enumerator for commits
    /// </summary>
    public class CommitWalker : IEnumerable<Commit>, IEnumerator<Commit>
    {
        private readonly HashSet<string> seen;
        private readonly Queue<Commit> queue;

        /// <summary>
        /// Create an enumerator that follows all parents of a commit
        /// </summary>
        /// <param name="branchTip"></param>
        public CommitWalker(Commit branchTip)
        {
            seen = new HashSet<string>();
            queue = new Queue<Commit>();
            queue.Enqueue(branchTip);
            seen.Add(branchTip.Sha);
            HistoryCache.Add(branchTip);
        }

        /// <summary>
        /// Current enumerated commit
        /// </summary>
        public Commit Current {get; private set; }

        object IEnumerator.Current => Current;

        /// <summary> Close enumerator </summary>
        public void Dispose() { }

        /// <summary>Get enumerator</summary>
        public IEnumerator<Commit> GetEnumerator() { return this; }

        /// <summary>
        /// Load next commit
        /// </summary>
        public bool MoveNext()
        {
            if (queue.Count < 1) return false;
            var next = queue.Dequeue();

            bool needToRead = !HistoryCache.TryLookup(next.Sha, out var list);

            foreach (var sha in list)
            {
                if (seen.Contains(sha)) continue;
                if ( ! HistoryCache.Has(sha)) {
                    needToRead = true;
                    break;
                }

                queue.Enqueue(HistoryCache.Get(sha));
                seen.Add(sha);
            }
            if (needToRead)
            {
                foreach (var commit in next.Parents)
                {
                    if (seen.Contains(commit.Sha)) continue;

                    queue.Enqueue(commit);
                    seen.Add(commit.Sha);
                    HistoryCache.Add(commit);
                }
            }
            Current = next;
            return true;
        }

        /// <summary>
        /// Reset enumeration. Does nothing at present.
        /// </summary>
        public void Reset() { }

        IEnumerator IEnumerable.GetEnumerator() { return GetEnumerator(); }
    }
}