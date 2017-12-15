using System.Collections;
using System.Collections.Generic;
using System.Linq;
using LibGit2Sharp;

namespace SnivellingGit.LayoutEngine
{
    /// <summary>
    /// Tool for exploring the history of a repo backed with a cache
    /// </summary>
    public static class HistoryCache {
        
        private static readonly Dictionary<string, CacheContainer> containers = new Dictionary<string, CacheContainer>();
        
        /// <summary>
        /// Return a cache container for a repo
        /// </summary>
        public static CacheContainer For(IRepository repo) {
            var key = repo.Info.Path;
            if (!containers.ContainsKey(key)) {
                containers.Add(key, new CacheContainer());
            }
            return containers[key];
        }
    }

    /// <summary>
    /// Stores previously read commit history
    /// </summary>
    public class CacheContainer
    {
        /// <summary>
        /// Return a cache-backed enumerator for all the parent commits under a child
        /// </summary>
        public IEnumerable<Commit> StartFrom(Commit branchTip)
        {
            return new CommitWalker(branchTip, this);
        }

        private readonly Dictionary<string, Commit> cache = new Dictionary<string, Commit>();
        private readonly Dictionary<string, string[]> relations = new Dictionary<string, string[]>();
        private readonly object Lock = new object();

        /// <summary>
        /// Check the cache for an entry
        /// </summary>
        public bool TryLookup(string child, out string[] parents) {
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
        public Commit Get(string sha) {return cache[sha]; }

        /// <summary>
        /// Add a commit to the cache if it is not already present
        /// </summary>
        public void Add(Commit c) {
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
        public bool Has(string sha)
        {
            return cache.ContainsKey(sha);
        }
    }

    /// <summary>
    /// Enumerator for commits
    /// </summary>
    public class CommitWalker : IEnumerable<Commit>, IEnumerator<Commit>
    {
        private readonly CacheContainer cache;
        private readonly HashSet<string> seen;
        private readonly Queue<Commit> queue;

        /// <summary>
        /// Create an enumerator that follows all parents of a commit
        /// </summary>
        /// <param name="branchTip"></param>
        /// <param name="cacheContainer"></param>
        public CommitWalker(Commit branchTip, CacheContainer cacheContainer)
        {
            cache = cacheContainer;
            seen = new HashSet<string>();
            queue = new Queue<Commit>();
            queue.Enqueue(branchTip);
            seen.Add(branchTip.Sha);
            cache.Add(branchTip);
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

            bool needToRead = !cache.TryLookup(next.Sha, out var list);

            foreach (var sha in list)
            {
                if (seen.Contains(sha)) continue;
                if ( ! cache.Has(sha)) {
                    needToRead = true;
                    break;
                }

                queue.Enqueue(cache.Get(sha));
                seen.Add(sha);
            }
            if (needToRead)
            {
                foreach (var commit in next.Parents)
                {
                    if (seen.Contains(commit.Sha)) continue;

                    queue.Enqueue(commit);
                    seen.Add(commit.Sha);
                    cache.Add(commit);
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