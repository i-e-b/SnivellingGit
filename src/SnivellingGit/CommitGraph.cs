namespace SnivellingGit
{
    using System.Collections.Generic;
    using System.Linq;

    /// <summary>
    /// table-based layout for commits
    /// </summary>
    public class ColumnsCommitGraph: ICommitGraph
    {
        readonly List<GraphCell> _cells = new List<GraphCell>();
        /// <summary> node -> parents </summary>
        readonly Dictionary<string, HashSet<string>> _edges = new Dictionary<string, HashSet<string>>();

        /// <summary> source ref -> column </summary>
        readonly Dictionary<string, int> _refColumns = new Dictionary<string, int>();
        /// <summary> source ref -> tide seen </summary>
        readonly Dictionary<string, bool> _refTides = new Dictionary<string, bool>();
        readonly Dictionary<string, List<string>> _refs = new Dictionary<string, List<string>>();
        readonly HashSet<string> _seenNodes = new HashSet<string>();

        /// <summary>
        /// Add a commit. Must be added in child->parent->g.parent order.
        /// You should always trace from HEAD first, then other unmerged branches in reverse
        /// chronological order (youngest first).
        /// </summary>
        /// <param name="commit">Commit point to add, from repository</param>
        /// <param name="sourceRefName">The name of the reference we are tracing from</param>
        /// <param name="remoteTide">The most recent commit on the remote for this ref. Used for display.</param>
        public void AddCommit(CommitPoint commit, string sourceRefName, string remoteTide)
        {
            // 1. add parent/child relationships
            foreach (var parentId in commit.Parents)
            {
                AddEdge(commit.Id, parentId);
            }
            
            // 2. if commit has been seen, exit. Otherwise note it seen.
            if (_seenNodes.Contains(commit.Id)) return;
            _seenNodes.Add(commit.Id);

            // 3. Check tide (crossed means this commit is on a tracked remote)
            var tideCrossed = SeenTide(sourceRefName, remoteTide, commit.Id);

            // 4. add commit point under sourceRefName group
            AddNode(commit, sourceRefName, tideCrossed);
        }

        void AddNode(CommitPoint commit, string sourceRefName, bool tideCrossed)
        {
            if (!_refColumns.ContainsKey(sourceRefName)) _refColumns.Add(sourceRefName, _refColumns.Count);

            _cells.Add(new GraphCell
            {
                BranchNames = LookupOrEmpty(_refs, commit.Id),
                Column = _refColumns[sourceRefName],
                CommitPoint = commit,
                IsMerge = commit.Parents.Length > 1,
                LocalOnly = !tideCrossed
            });
        }

        static IEnumerable<string> LookupOrEmpty(IReadOnlyDictionary<string, List<string>> refs, string id)
        {
            if (!refs.ContainsKey(id)) return new string[0];
            return refs[id];
        }

        bool SeenTide(string sourceRefName, string remoteTide, string id)
        {
            if (!_refTides.ContainsKey(sourceRefName)) _refTides.Add(sourceRefName, false);
            if (id == remoteTide) _refTides[sourceRefName] = true;
            return _refTides[sourceRefName];
        }

        void AddEdge(string childId, string parentId)
        {
            if (!_edges.ContainsKey(childId)) _edges.Add(childId, new HashSet<string>());
            _edges[childId].Add(parentId);
        }

        /// <summary>
        /// Add a remote reference. These are branches that shouldn't get their own column.
        /// All references should be added before adding commits.
        /// </summary>
        public void AddReference(string name, string commitId)
        {
            SafeAdd(_refs, commitId, name);
        }

        static void SafeAdd(IDictionary<string, List<string>> refs, string tip, string name)
        {
            if (!refs.ContainsKey(tip))
            {
                refs.Add(tip, new List<string>());
            }
            refs[tip].Add(name);
        }
        
        /// <summary>
        /// Get all commit cells
        /// </summary>
        public IEnumerable<GraphCell> Cells()
        {
            // TODO: reimplement the "SquashFlatMerges" logic here.

            // sort by date, youngest first
            return _cells.OrderByDescending(c => c.CommitPoint.Date);
        }
    }
}