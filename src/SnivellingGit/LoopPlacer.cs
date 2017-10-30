using System;
using System.Collections.Generic;
using System.Linq;

namespace SnivellingGit
{
    /// <summary>
    /// A helper to place history loops so they don't overlap.
    /// </summary>
    public class LoopPlacer
    {
        readonly List<int[]> values; // colums, containing rows

        /// <summary>
        /// Clear values, and prepare positions for a completed commit graph
        /// </summary>
        public LoopPlacer(ICollection<GraphCell> cells)
        {
            values = new List<int[]>();
            var cols = cells.GroupBy(c => c.Column);
            foreach (var col in cols)
            {
                var rowMax = col.Max(c => c.Row);
                var leftList = new int[rowMax + 1];
                var rightList = new int[rowMax + 1];

                Extend(values, col.Key * 2, leftList);
                Extend(values, (col.Key * 2) + 1, rightList);
            }
        }

        private void Extend<T>(List<T> list, int newIndex, T toInsert)
        {
            for (int i = list.Count; i <= newIndex; i++)
            {
                list.Add(default(T));
            }
            list[newIndex] = toInsert;
        }

        /// <summary>
        /// Set a new depth for a side in a column
        /// </summary>
        public void SetDepth(int col, int rowStart, int rowEnd, bool isLeft, int newDepth)
        {
            var min = Math.Min(rowStart, rowEnd);
            var max = Math.Max(rowStart, rowEnd);
            var edge = (isLeft) ? (values[col * 2]) : (values[(col * 2) + 1]);
            for (int i = min; i <= max; i++)
            {
                edge[i] = newDepth;
            }
        }

        /// <summary>
        /// Find the next available side and depth in a column
        /// </summary>
        public void FindLeastDepth(int col, int rowStart, int rowEnd, out bool isLeft, out int depth)
        {
            var min = Math.Min(rowStart, rowEnd);
            var max = Math.Max(rowStart, rowEnd);

            var left = values[col * 2];
            var right = values[(col * 2) + 1];

            var leftEdge = 0;
            var rightEdge = 0;
            for (int i = min; i <= max; i++)
            {
                leftEdge = Math.Max(leftEdge, left[i]);
                rightEdge = Math.Max(rightEdge, right[i]);
            }

            if (leftEdge <= rightEdge)
            {
                isLeft = true;
                depth = leftEdge + 1;
            }
            else
            {
                isLeft = false;
                depth = rightEdge + 1;
            }
        }
    }
}