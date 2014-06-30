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

        int columns = 1;

        /// <summary>
        /// Add a branch (all branches must be added before adding commits)
        /// </summary>
        public void AddBranch(string id, string tip, string tide)
        {
            if (_idColumns.ContainsKey(tip)) // a shared tip.
            {
                return;
            }
            _idColumns.Add(tip, columns++);
        }

        /// <summary>
        /// Add a commit. Must be added in child->parent->g.parent order.
        /// </summary>
        public void AddCommit(string id, string message, params string[] parents)
        {
            if (!_idColumns.ContainsKey(id)) // an orphan
            {
                throw new Exception("orphan - id = " + id); // would later append to parents after the rest of the tree is built
            }

            var myCol = _idColumns[id];

            foreach (var parent in parents.Where(parent => !_idColumns.ContainsKey(parent)))
            {
                _idColumns.Add(parent, myCol); // inherit column from child (graph dangles from branch tips)
            }

            // Flat merges happen on the same branch. This is 'a bad thing' if you are doing feature branches.
            //   If you're doing a simple master-only flow, these are the ends of overlapping work.
            //   It might be good to show either side of these merges as virtual branches, or maybe to squish them entirely.
            var flatMerge = (parents.Length == 2) && parents.All(p=>_idColumns.ContainsKey(p)) && parents.All(p=>_idColumns[p] == myCol);

            // This is virtual branch:
            if (flatMerge)
            {
                // More refined would be to find the next common ancestor and set it's column to ours, split both the children.
                // For now, we just push one out and hope for the best.
                _idColumns[parents[1]] += 1;
            }

            // this is 'squishing' the flat merges:
            //if (!flatMerge) 
            {
                _cells.Add(new GraphCell
                {
                    Message = message,
                    Column = myCol,
                    Id = id,
                    IsMerge = parents.Length > 1,
                    FlatMerge = flatMerge,
                    ParentCols = parents.Select(p=>_idColumns[p])
                });
            }
        }

        /// <summary>
        /// Get all commit cells
        /// </summary>
        public IEnumerable<GraphCell> Cells()
        {
            return _cells;
        }
    }
}