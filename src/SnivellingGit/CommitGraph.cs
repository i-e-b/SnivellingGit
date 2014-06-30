namespace SnivellingGit
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    /// <summary>
    /// table-based layout for commits
    /// </summary>
    public class CommitGraph
    {
        /// <summary>
        /// Ordered list of commit cells
        /// </summary>
        readonly public List<GraphCell> Cells = new List<GraphCell>();
        readonly Dictionary<string, int> _idColumns = new Dictionary<string, int>();

        /// <summary>
        /// Add a branch (all branches must be added before adding commits)
        /// </summary>
        public void AddBranch(string id, string tip, int column)
        {
            if (_idColumns.ContainsKey(tip)) // a shared tip.
            {
                return;
            }
            _idColumns.Add(tip, column);
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
            var flatMerge = (parents.Length > 1) && parents.All(p=>_idColumns.ContainsKey(p)) && parents.All(p=>_idColumns[p] == myCol);

            Cells.Add(new GraphCell {
                Message = message,
                Column = myCol,
                Id = id,
                IsMerge = parents.Length > 1,
                FlatMerge = flatMerge
            });
        }
    }
}