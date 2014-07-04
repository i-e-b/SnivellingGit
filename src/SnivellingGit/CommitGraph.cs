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
        /// <summary> parent -> children </summary>
        readonly Dictionary<string, HashSet<string>> _reverseEdges = new Dictionary<string, HashSet<string>>();

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
        public bool AddCommit(CommitPoint commit, string sourceRefName, string remoteTide)
        {
            // 1. add parent/child relationships
            foreach (var parentId in commit.Parents)
            {
                AddEdge(commit.Id, parentId);
            }
            
            // 2. if commit has been seen, exit. Otherwise note it seen.
            if (_seenNodes.Contains(commit.Id)) return true;
            _seenNodes.Add(commit.Id);

            // 3. Check tide (crossed means this commit is on a tracked remote)
            var tideCrossed = SeenTide(sourceRefName, remoteTide, commit.Id);

            // 4. add commit point under sourceRefName group
            AddNode(commit, sourceRefName, tideCrossed);
            return false;
        }

        void AddNode(CommitPoint commit, string sourceRefName, bool tideCrossed)
        {
            if (!_refColumns.ContainsKey(sourceRefName)) _refColumns.Add(sourceRefName, _refColumns.Count);

            _cells.Add(new GraphCell
            {
                BranchNames = LookupOrEmpty(_refs, commit.Id),
                Column = _refColumns[sourceRefName],
                CommitPoint = commit,
                IsMerge = commit.Parents.Count() > 1,
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
            if (!_reverseEdges.ContainsKey(parentId)) _reverseEdges.Add(parentId, new HashSet<string>());
            _reverseEdges[parentId].Add(childId);
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
            // TODO: reimplement the "SquashFlatMerges" logic here?

            var cellSet = _cells.OrderByDescending(c => c.CommitPoint.Date).ToArray();
            var cellLookup = _cells.ToDictionary(c => c.CommitPoint.Id);

            for (int index = 0; index < cellSet.Length; index++)
            {
                var cell = cellSet[index];
                cell.Row = index;

                var children = FindAny(_reverseEdges, cell.CommitPoint.Id);
                cell.ChildCells = LookupAll(cellLookup, children).Reverse();
                // because of the way we build the edges list, it's in descending order of distance from parent to child.
                // we reverse this so we can show a nicely nested set of lines
            }

            // sort by date, youngest first
            return cellSet;
        }

        static IEnumerable<TV> FindAny<TK, TV>(IReadOnlyDictionary<TK, HashSet<TV>> reverseEdges, TK id)
        {
            if (reverseEdges.ContainsKey(id)) return reverseEdges[id];
            return new TV[0];
        }

        static IEnumerable<TV> LookupAll<TK, TV>(IDictionary<TK, TV> source, IEnumerable<TK> targets)
        {
            return from target in targets where source.ContainsKey(target) select source[target];
        }
    }
}