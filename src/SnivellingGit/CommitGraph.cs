namespace SnivellingGit
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    /// <summary>
    /// table-based layout for commits
    /// </summary>
    public class ColumnsCommitGraph: ICommitGraph
    {
        /// <summary>
        /// Ordered list of commit cells
        /// </summary>
        readonly List<GraphCell> _cells = new List<GraphCell>();
        readonly Dictionary<string, int> _idColumns = new Dictionary<string, int>();
        readonly Dictionary<string, List<string>> _refs = new Dictionary<string, List<string>>();

        int columns = 1;

        /// <summary>
        /// Create a new empty column-per-branch commit graph
        /// </summary>
        public ColumnsCommitGraph()
        {
            SquashFlatMerges = true;
            ShowVirtualBranches = false;
        }

        /// <summary>
        /// Add a branch (all branches must be added before adding commits)
        /// </summary>
        public void AddBranch(string name, string tip, string tide)
        {
            SafeAdd(_refs, tip, name);

            if (_idColumns.ContainsKey(tip)) // a shared tip.
            {
                return;
            }
            _idColumns.Add(tip, columns++);
        }

        /// <summary>
        /// Add a commit. Must be added in child->parent->g.parent order.
        /// </summary>
        public void AddCommit(CommitPoint c)
        {
            if (!_idColumns.ContainsKey(c.Id)) // an orphan
            {
                throw new Exception("orphan - id = " + c.Id); // would later append to parents after the rest of the tree is built
            }

            var myCol = _idColumns[c.Id];

            foreach (var parent in c.Parents.Where(parent => !_idColumns.ContainsKey(parent)))
            {
                _idColumns.Add(parent, myCol); // inherit column from child (graph dangles from branch tips)
            }

            // Flat merges happen on the same branch. This is 'a bad thing' if you are doing feature branches.
            //   If you're doing a simple master-only flow, these are the ends of overlapping work.
            //   It might be good to show either side of these merges as virtual branches, or maybe to squish them entirely.
            var flatMerge = (c.Parents.Length == 2) && c.Parents.All(p => _idColumns.ContainsKey(p)) && c.Parents.All(p => _idColumns[p] == myCol);

            // This is virtual branch:
            if (flatMerge && ShowVirtualBranches)
            {
                // More refined would be to find the next common ancestor and set it's column to ours, split both the children.
                // For now, we just push one out and hope for the best.
                _idColumns[c.Parents[1]] += 1;
            }

            // this is 'squishing' the flat merges:
            if (!flatMerge || !SquashFlatMerges) 
            {
                _cells.Add(new GraphCell
                {
                    CommitPoint =  c,
                    Column = myCol,
                    IsMerge = c.Parents.Length > 1,
                    FlatMerge = flatMerge,
                    ParentCols = c.Parents.Select(p=>_idColumns[p]),
                    BranchNames = LookupOrEmpty(_refs, c.Id)
                });
            }
        }

        static void SafeAdd(IDictionary<string, List<string>> refs, string tip, string name)
        {
            if (!refs.ContainsKey(tip))
            {
                refs.Add(tip, new List<string>());
            }
            refs[tip].Add(name);
        }


        static IEnumerable<string> LookupOrEmpty(IReadOnlyDictionary<string, List<string>> refs, string key)
        {
            if (!refs.ContainsKey(key)) return new string[0];
            return refs[key];
        }

        /// <summary>
        /// Default false.
        /// If false, commits are always shown in one column per branch.
        /// If true, merges inside a single branch are split into two columns.
        /// </summary>
        public bool ShowVirtualBranches { get; set; }

        /// <summary>
        /// Default true. If false, merges inside a single branch are displayed.
        /// If true, merges inside a single branch are hidden.
        /// </summary>
        public bool SquashFlatMerges { get; set; }

        /// <summary>
        /// Get all commit cells
        /// </summary>
        public IEnumerable<GraphCell> Cells()
        {
            return _cells;
        }
    }
}