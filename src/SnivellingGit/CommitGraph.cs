namespace SnivellingGit
{
    using System;
    using System.Collections.Generic;

    /// <summary>
    /// table-based layout for commits
    /// </summary>
    public class CommitGraph
    {
        /// <summary>
        /// Ordered list of commit cells
        /// </summary>
        readonly public List<GraphCell> Cells = new List<GraphCell>();
        readonly Dictionary<string, int> IdColumns = new Dictionary<string, int>();

        /// <summary>
        /// Add a branch (all branches must be added before adding commits)
        /// </summary>
        public void AddBranch(string id, string tip, int column)
        {
            if (IdColumns.ContainsKey(tip))// a shared tip.
            {
                return;
            }
            IdColumns.Add(tip, column);
        }

        /// <summary>
        /// Add a commit. Must be added in child->parent->g.parent order.
        /// </summary>
        public void AddCommit(string id, params string[] parents)
        {
            if (!IdColumns.ContainsKey(id)) // an orphan
            {
                throw new Exception("orphan - id = " + id); // would later append to parents after the rest of the tree is built
            }
            var myCol = IdColumns[id];
            Cells.Add(new GraphCell { Column = myCol, Id = id });
            foreach (var parent in parents)
            {
                if (IdColumns.ContainsKey(parent)) continue; // already assigned
                IdColumns.Add(parent, myCol); // inherit column from child (graph dangles from branch tips)
            }
        }
    }
}