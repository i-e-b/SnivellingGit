﻿using System;

namespace SnivellingGit
{
    using System.Collections.Generic;
    using System.Linq;

    /// <summary>
    /// table-based layout for commits
    /// </summary>
    public class ColumnsCommitGraph: ICommitGraph
    {
        /// <summary> commit id -> cell details </summary>
        readonly Dictionary<string, GraphCell> _cells = new Dictionary<string, GraphCell>();

        /// <summary> parent -> children </summary>
        readonly Dictionary<string, HashSet<string>> parentToChildren = new Dictionary<string, HashSet<string>>();

        /// <summary> child -> parents </summary>
        readonly Dictionary<string, HashSet<string>> childToParents = new Dictionary<string, HashSet<string>>();

        readonly HashSet<string> _prunableRefs = new HashSet<string>();

        /// <summary> source ref -> column </summary>
        readonly Dictionary<string, int> _refColumns = new Dictionary<string, int>();
        /// <summary> source ref -> tide seen </summary>
        readonly Dictionary<string, bool> _refTides = new Dictionary<string, bool>();

        /// <summary> tip SHA -> reference names </summary>
        readonly Dictionary<string, List<string>> _refs = new Dictionary<string, List<string>>();
        readonly HashSet<string> _seenNodes = new HashSet<string>();

        GraphCell[] cellLayoutSet;

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

            _cells.Add(commit.Id, new GraphCell
            {
                BranchNames = LookupOrEmpty(_refs, commit.Id),
                RefLine = sourceRefName,
                CommitPoint = commit,
                IsMerge = commit.Parents.Length > 1,
                LocalOnly = !tideCrossed,
                IsPrunable = _prunableRefs.Contains(commit.Id)
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
            if (!parentToChildren.ContainsKey(parentId)) parentToChildren.Add(parentId, new HashSet<string>());
            if (!childToParents.ContainsKey(childId)) childToParents.Add(childId, new HashSet<string>());
            parentToChildren[parentId].Add(childId);
            childToParents[childId].Add(parentId);
        }

        /// <summary>
        /// Add a remote reference. These are branches that shouldn't get their own column.
        /// All references should be added before adding commits.
        /// </summary>
        public void AddReference(string name, string commitId)
        {
            SafeAdd(_refs, commitId, name);
        }

        /// <summary>
        /// Mark a commit as 'prunable' (tracked remote has been deleted)
        /// </summary>
        public void MarkPrunable(string commitId)
        {
            if (string.IsNullOrWhiteSpace(commitId)) return;
            _prunableRefs.Add(commitId);
        }

        static void SafeAdd(IDictionary<string, List<string>> refs, string tip, string name)
        {
            if (!refs.ContainsKey(tip))
            {
                refs.Add(tip, new List<string>());
            }
            if (!refs[tip].Contains(name)) refs[tip].Add(name);
        }
        
        /// <summary>
        /// Layout the rows and columns for the current set of commit cells.
        /// </summary>
        public void DoLayout(string primaryReference) {
            var cellSet = _cells.Values.OrderByDescending(c => c.CommitPoint.Date).ToArray();
            var cellLookup = _cells.Values.ToDictionary(c => c.CommitPoint.Id);
            
            // Order by most recent common ancestor to column 0.
            // 1) If there were 3 columns, Master, A, B; B forked from A and A from Master, then B should be to the right of A
            // 2) If there were 3 cols Master, X, Y; X forked from Master 3 commits back, and Y 6 commits back, then Y should be to the right of X
            //      Maybe do this as a post-process, going from the bottom of the graph up, mapping to right most columns first

            // set the row for each cell (purely by date order, no cells share a row)
            for (int index = 0; index < cellSet.Length; index++)
            {
                var cell = cellSet[index];
                cell.Row = index;

                var children = FindAny(parentToChildren, cell.CommitPoint.Id);
                // because of the way we build the edges list, it's in descending order of distance from parent to child.
                // we reverse this so we can show a nicely nested set of lines -- longer lines tend to be further out
                cell.ChildCells = LookupAll(cellLookup, children).Reverse();
            }

            // figure out the maximum depth of cells and their parents
            var maxBranch = new Dictionary<string, int>(); // ref line => max index
            foreach (var cell in cellSet) { UpdateMaxBranch(maxBranch, cell); }

            // make the primary ref left-most:
            if (maxBranch.ContainsKey(primaryReference)) { maxBranch[primaryReference] = 0; }

            // assign columns to cells
            var orderedRefs = maxBranch.OrderBy(kv => kv.Value).Select(kv=>kv.Key).ToArray();
            for (int i = 0; i < orderedRefs.Length; i++)
            {
                _refColumns[orderedRefs[i]] = i;
            }

            foreach (var cell in cellSet)
            {
                cell.Column = _refColumns[cell.RefLine]; // look up the column for the reference
            }

            cellLayoutSet = cellSet;
        }

        /// <summary>
        /// Get all commit cells
        /// </summary>
        public IEnumerable<GraphCell> Cells()
        {
            if (cellLayoutSet == null)
            {
                DoLayout("");
            }

            return cellLayoutSet;
        }

        // set the ref-line's max to the greatest of: cell row, existing value, parent's row
        private void UpdateMaxBranch(Dictionary<string, int> maxBranch, GraphCell cell)
        {
            if ( ! maxBranch.ContainsKey(cell.RefLine)) maxBranch.Add(cell.RefLine, cell.Row);

            var parents = FindAny(childToParents, cell.CommitPoint.Id);
            var parentMax = MaxOrDefault(0, parents.Select(id => _cells[id].Row));
            var existing = maxBranch[cell.RefLine];
            
            maxBranch[cell.RefLine] = Math.Max(Math.Max(parentMax, existing), cell.Row);
        }

        private int MaxOrDefault(int defaultValue, IEnumerable<int> list)
        {
            if (list == null) return defaultValue;
            return list.Concat(new[] {defaultValue}).Max();
        }

        static IEnumerable<TV> FindAny<TK, TV>(IReadOnlyDictionary<TK, HashSet<TV>> lookupSet, TK id)
        {
            if (lookupSet.ContainsKey(id)) return lookupSet[id];
            return new TV[0];
        }

        static IEnumerable<TV> LookupAll<TK, TV>(IDictionary<TK, TV> source, IEnumerable<TK> targets)
        {
            return from target in targets where source.ContainsKey(target) select source[target];
        }
    }
}