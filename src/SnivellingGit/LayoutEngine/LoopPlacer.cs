using System;
using System.Collections.Generic;
using System.Linq;

namespace SnivellingGit.LayoutEngine
{
    /// <summary>
    /// A helper to place history loops so they don't overlap.
    /// </summary>
    public class LoopPlacer
    {
        // list of columns (left then right of commits), containing row array.
        // each individual uint is a bit-list, where `1` is occupied, and `0` is free.
        readonly List<uint[]> values;
        readonly List<int> columnMaxes; // cache of calculated column widths

        /// <summary>
        /// Clear values, and prepare positions for a completed commit graph
        /// </summary>
        public LoopPlacer(ICollection<GraphCell> cells)
        {
            values = new List<uint[]>();
            columnMaxes = new List<int>();
            var cols = cells.GroupBy(c => c.Column);
            foreach (var col in cols)
            {
                var rowMax = col.Max(c => c.Row);
                var leftList = new uint[rowMax + 1];
                var rightList = new uint[rowMax + 1];

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
        /// Mark a column occupied at a given depth in the row range
        /// </summary>
        public void SetDepth(int col, int rowStart, int rowEnd, bool isLeft, int occupiedDepth)
        {
            columnMaxes.Clear();
            var min = Math.Min(rowStart, rowEnd);
            var max = Math.Max(rowStart, rowEnd);
            var edge = (isLeft) ? (values[col * 2]) : (values[(col * 2) + 1]);
            var flag = 1u << (occupiedDepth - 1);
            for (int i = min; i < max; i++)
            {
                edge[i] |= flag;
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

            // flatten all rows together
            var leftOccupancy = 0u;
            var rightOccupancy = 0u;
            for (int i = min; i < max; i++)
            {
                leftOccupancy |= left[i];
                rightOccupancy |= right[i];
            }

            // scan for first free space, slightly preferring left side
            for (int i = 0; i < 31; i++)
            {
                var flag = 1 << i;
                if ((leftOccupancy & flag) == 0u) {
                    isLeft = true;
                    depth = i + 1;
                    return;
                }
                if ((rightOccupancy & flag) == 0u) {
                    isLeft = false;
                    depth = i + 1;
                    return;
                }
            }
            
            // So, you have more than 64 parallel history lines? At this point we give up.
            isLeft = true;
            depth = 1;
        }

        private int ColumnMax(int col)
        {
            if (values.Count < (col*2)+1) return 0;
            if (columnMaxes.Count <= col) { // need to re-calculate
                Extend(columnMaxes, values.Count / 2, 0);

                // for each column pair
                for (int i = 0; i < values.Count / 2; i++)
                {
                    var left = values[i*2];
                    var right = values[(i*2)+1];
                    var leftOccupation = 0u;
                    var rightOccupation = 0u;
                    for (int j = 0; j < left.Length; j++) // for each row
                    {
                        // pack occupancy together
                        leftOccupation |= left[i];
                        rightOccupation |= right[i];
                    }
                    // add the left and right maximums together
                    columnMaxes[i] = MaxOccupied(leftOccupation) + MaxOccupied(rightOccupation);
                }
            }
            return columnMaxes[col];
        }

        /// <summary>
        /// Return the width of columns from left up to this one.
        /// This is the sum of maximum occupied slot for each included column
        /// </summary>
        public int CumulativeWidth(int col, int defaultCellWidth, int loopSize)
        {
            int cuml = 0;
            for (int i = 0; i < col; i++)
            {
                cuml += ColumnMax(i) * loopSize + defaultCellWidth;
            }
            return cuml;
        }

        /// <summary>
        /// Return the most-significant position occupied in a bit set
        /// </summary>
        public static int MaxOccupied(uint data)
        {
            uint v = data;
            int r = 0;

            while ((v >>= 1) > 0) {
                r++;
            }
            return r;
        }
    }
}