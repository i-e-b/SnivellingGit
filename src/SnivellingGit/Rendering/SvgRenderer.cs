using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using SnivellingGit.Interfaces;
using SnivellingGit.LayoutEngine;
using Tag;

namespace SnivellingGit.Rendering
{
    /// <summary>
    /// Renders Commit Graphs into SVG tree images
    /// </summary>
    public class SvgRenderer
    {
        // layout parameters:
        private const int cellw = 20;               // width of a cell
        private const int cellh = 14;               // height of a cell
        private const int cellMargin = 4;           // vertical gap between cells in a column
        private const int cellmarginw = cellw + 10;  // margin between columns
        private const int loopSpacing = 3;          // minimum horizontal gap between loop lines

        /// <summary>
        /// If true, all node connections will be draw directly.
        /// This gives a simpler visual, but hides information.
        /// </summary>
        public bool HideComplexHistory { get; set; }

        /// <summary>
        /// Render the commit graph, returning the SVG as a tag content tree
        /// </summary>
        /// <param name="table">Commit graph to render</param>
        /// <param name="hiliteSha">A SHA hash of a commit to higlight. If null or empty, no node will be highlighted</param>
        /// <param name="rowStart">Skip this many commits before rendering starts</param>
        /// <param name="rowLimit">Stop rendering history after this many commits</param>
        public TagContent RenderCommitGraphToSvg(ICommitGraph table, string hiliteSha, int rowStart, int rowLimit)
        {
            var rowStartCount = rowStart;
            var content = T.g();
            table.DoLayout("Head", rowStart);
            var cells = table.Cells().ToArray();

            var widestLabel = cells.Select(c => GuessStringWidth(10, c.BranchNames.ToArray())).Max();
            int tagLabelMargin = widestLabel + 40;

            var finalPlacement = new LoopPlacer(cells);
            var loops = new LoopPlacer(cells);
            Func<int, int> cellX = col => finalPlacement.CumulativeWidth(col, cellmarginw, loopSpacing) + tagLabelMargin;
            Func<int, int> cellY = row => (row * (cellh + cellMargin));
            Func<int, int> labelX = col => finalPlacement.CumulativeWidth(col, cellmarginw, loopSpacing);

            // Draw branch lines (overdrawn by nodes)
            DrawAncestryLines(rowStart, rowLimit, finalPlacement, table, cellX, cellY); // dummy run to get final positions. Maybe: separate line decisions from writing?
            content.Add(DrawAncestryLines(rowStart, rowLimit, loops, table, cellX, cellY));

            
            var rightMostColumnX = cellX(cells.Select(c => c.Column).Max() + 1);
            var rightMostNodeEdge = rightMostColumnX + 10;
            var rightMostEdgeOfSvg = rightMostNodeEdge;
            var bottomEdge = 0;

            if (rowStart > 0) {
                // draw an indication that history continues
                content.Add(PagingControl(rightMostNodeEdge, cellY(0), "PageUp", false));
                content.Add(CommitMessage(rightMostNodeEdge, cellY(0), "fade", "History continued from row "+rowStart));
            }
            var rowEnd = rowStart + rowLimit;


            foreach (var cell in cells)
            {
                if (rowStartCount-- > 0) continue; // skip until offset found

                if (rowLimit-- == 0) { // draw an indication that history continues
                    content.Add(PagingControl(rightMostNodeEdge, cellY(cell.Row), "PageDown", true));
                    content.Add(CommitMessage(rightMostNodeEdge, cellY(cell.Row), "fade", "History continues (row "+rowEnd+")"));
                    bottomEdge = cellY(cell.Row + 1);
                    break;
                }

                var styleClass = "";
                if (cell.CommitPoint.Id == hiliteSha) styleClass += "blink ";

                var title = cell.CommitPoint.Author + "\r\n" + cell.CommitPoint.Id;
                // Draw node
                if (cell.IsMerge)
                {
                    content.Add(MergeNode(cellX(cell.Column), cellY(cell.Row), cell.CommitPoint.Id, styleClass, title).ToString());
                }
                else
                {
                    content.Add(CommitNode(!cell.LocalOnly, cellX(cell.Column), cellY(cell.Row), cell.CommitPoint.Id, styleClass, cell.CommitPoint.Colour, title).ToString());
                }

                // Draw commit message
                content.Add(CommitMessage(rightMostNodeEdge, cellY(cell.Row), styleClass, cell.CommitPoint.Message));
                rightMostEdgeOfSvg = Math.Max(rightMostEdgeOfSvg, rightMostNodeEdge + GuessStringWidth(10, cell.CommitPoint.Message));
                bottomEdge = cellY(cell.Row + 1);

                // Draw tags and branch names
                if (cell.BranchNames.Any())
                {
                    if (cell.IsPrunable) styleClass += "prune ";
                    if (cell.BranchNames.Contains("HEAD")) styleClass += "headCell ";
                    content.Add(BranchTagAnnotation(tagLabelMargin, cellY(cell.Row), labelX(cell.Column), styleClass, string.Join(", ", cell.BranchNames)));
                }
            }

            var svgDoc = SvgHeader(rightMostEdgeOfSvg + 25, bottomEdge + 25, out var svgRoot);
            svgRoot.Add(content);
            return svgDoc;
        }

        private TagContent SvgHeader(int width, int height, out TagContent rootElement){
            rootElement = T.g("g", "transform","translate(20,20)")[
                T.g("defs")[
                    T.g("marker", "id","dot", "viewbox","-10 -10 20 20", "refX","0", "refY","0", "markerUnits","strokeWidth", "markerWidth","10", "markerHeight","10", "orient","auto", "style","fill:#333")[
                        T.g("circle", "cx","0", "cy","0", "r","3")
                    ],
                    T.g("script")[LoadFile("Scripts/SvgEmbeddedScript.js")]
                ]
            ];

            return T.g("svg", "id", "svgroot", "width", width + "px", "height", height + "px", "onload","inject()")[rootElement];
        }

        private string LoadFile(string path)
        {
            return File.ReadAllText(path);
        }

        private TagContent CommitNode(bool isTracked, int x, int y, string id, string styleClass, string color, string title)
        {
            var style = (isTracked) ? ("fill:#") : ("stroke:#");
            var annot = (isTracked) ? ("") : ("(untracked) ");
            return T.g("g", "class", "node " + styleClass, "transform", "translate(" + x + "," + y + ")")[
                T.g("rect", "id", id, "rx", "5", "ry", "5", "x", "-10", "y", "-8", "width", "20", "height", "14", "style", style + color)[
                    T.g("title")[annot + title]
                ]
            ];
        }

        private TagContent MergeNode(int x, int y, string id, string styleClass, string title)
        {
            return T.g("g", "class", "merge " + styleClass, "transform", "translate(" + x + "," + y + ")")[
                T.g("circle", "id", id, "cx", "0", "cy", "0", "r", "7")[
                    T.g("title")[title]
                ]
            ];
        }

        private TagContent PagingControl(int x, int y, string id, bool down)
        {
            string transform;
            if (down) transform = "translate(" + (x - 6) + "," + (y + 6) + ") scale(1,-1)";
            else transform = "translate(" + (x - 6) + "," + (y - 6) + ")";

            return T.g("g", "class", "paging", "transform", transform)[
                T.g("circle", "id", id,
                    "style","fill:#fff;fill-opacity:1;stroke:none;",
                    "cx", "6", "cy", "6", "r", "7")[
                    T.g("title")["Page Up (more recent)"]
                ],
                T.g("path/", 
                    "id", id,
                    "style", "fill:#000;fill-opacity:1;stroke:none;",
                    "d", "M 6,0 A 6,6 0 0 0 0,6 6,6 0 0 0 6,12 6,6 0 0 0 12,6 6,6 0 0 0 6,0 Z M 6,1.25 11,5 H 8 V 11 H 4 V 5 H 1.25 Z")
            ];
        }

        private TagContent BranchTagAnnotation(int xLeft, int y, int xRight, string textClass, string text)
        {
            return T.g("g", "class", "tag", "transform", "translate(" + xLeft + "," + y + ")")[
                T.g("text", "x", "-40", "y", "3", "text-anchor", "end", "class", textClass)[text],
                T.g("path", "marker-end", "url(#dot)", "d", "M-35,0L" + xRight + ",0", "style", "opacity:1;")
            ];
        }

        private TagContent CommitMessage(int x, int y, string styleClass, string text)
        {
            return T.g("g", "class", "tag " + styleClass, "transform", "translate(" + x + "," + y + ")")[
                T.g("text", "x", "20", "y", "3", "text-anchor", "start")[text]
            ];
        }

        private TagContent SimpleLine(int x1, int y1, int x2, int y2) {
            return T.g("g", "class","link")[
                T.g("path", "d",
                    "M"+x1+","+y1+
                    "L"+x2+","+y2)
            ];
        }

        private TagContent CrookLine(int x1, int y1, int x2, int y2, int x3, int y3) {
            return T.g("g", "class","link")[
                T.g("path", "d",
                    "M"+x1+","+y1+
                    "L"+x2+","+y2+
                    "L"+x3+","+y3)
            ];
        }

        private List<TagContent> DrawAncestryLines(int rowStart, int rowLimit, LoopPlacer loops, ICommitGraph graph, Func<int, int> cellX, Func<int, int> cellY)
        {
            var outp = new List<TagContent>();
            var cells = graph.Cells();
            var occupancy = graph.CellOccupancy();
            var rowStartCount = rowStart;
            foreach (var cell in cells) // increasing row number
            {
                if (rowStartCount-- > 0) { continue; }

                foreach (var child in cell.ChildCells) // increasing row number
                {
                    var complex = !HideComplexHistory && AreCellsBetween(occupancy, cell.Column, cell.Row, child.Row);

                    outp.Add(ConnectCells(loops, graph, child, cell, cellX, cellY, complex));
                }

                if (rowLimit-- == 0) { break; } // do this at the end so we have a continuation line
            }
            return outp;
        }

        /// <summary>
        /// Draw lines between two cells. Only to be used by DrawAncestryLines
        /// </summary>
        private TagContent ConnectCells(LoopPlacer loops, ICommitGraph graph, GraphCell child, GraphCell parent, Func<int, int> cellX, Func<int, int> cellY, bool complex)
        {
            if (child.Column != parent.Column) // an unmerged branch
            {
                return DrawDirectBranchingLine(graph, child, parent, cellX, cellY);
            }
            if (!complex || HideComplexHistory) // simple inheritance
            {
                return SimpleLine(cellX(parent.Column), cellY(child.Row), cellX(child.Column), cellY(parent.Row));
            }
            else // complex inheritance, show a loop
            {
                loops.FindLeastDepth(parent.Column, parent.Row, child.Row, out var isLeft, out var loopDepth);
                loops.SetDepth(parent.Column, parent.Row, child.Row, isLeft, loopDepth);
                return DrawLoop(left: isLeft, depth: loopDepth, x: cellX(parent.Column), y1: cellY(parent.Row), y2: cellY(child.Row));
            }
        }

        private TagContent DrawDirectBranchingLine(ICommitGraph graph, GraphCell child, GraphCell parent, Func<int, int> cellX, Func<int, int> cellY)
        {
            // Try and stop weird merges from making unreadable paths:
            // 1) if steps across > steps up, do a straight line
            // 2) if there are no cells in the child column further down that this one, use a bottom crook line (goes across before up)
            // 3) if there are no cells in the parent column between parent and child, use a top crook line (goes up before across)
            // 4) else use a straight line

            var occupancy = graph.CellOccupancy();
            var stepsAcross = Math.Abs(parent.Column - child.Column);
            var stepsUp = Math.Abs(parent.Row - child.Row);
            var childColObscured = AreCellsBetween(occupancy, child.Column, parent.Row, child.Row);
            var parentColObscured = AreCellsBetween(occupancy, parent.Column, child.Row, parent.Row);

            // bottom crook:
            var bcx = cellX(child.Column);
            var bcy = Math.Max(cellY(child.Row), cellY(parent.Row - Math.Abs(parent.Column - child.Column)));

            // straight:
            var slx = cellX(parent.Column);
            var sly = cellY(parent.Row);

            // top crook:
            var tcx = cellX(parent.Column);
            var tcy = Math.Max(cellY(child.Row), cellY(child.Row + Math.Abs(parent.Column - child.Column)));

            int mid_x = slx, mid_y = sly;

            if (stepsAcross >= stepsUp)
            {
                mid_x = slx;
                mid_y = sly;
            }
            else if (!childColObscured)
            {
                mid_x = bcx;
                mid_y = bcy;
            }
            else if (!parentColObscured)
            {
                mid_x = tcx;
                mid_y = tcy;
            }


            return CrookLine(
                cellX(parent.Column), cellY(parent.Row),
                mid_x, mid_y,
                cellX(child.Column), cellY(child.Row));
        }

        private bool AreCellsBetween(IDictionary<int, BitArray> occupancy, int column, int rowA, int rowB)
        {
            var min = Math.Min(rowA, rowB);
            var max = Math.Max(rowA, rowB);

            var field = occupancy[column];
            for (int i = min+1; i < max; i++)
            {
                if (field[i]) return true;
            }
            return false;
        }

        private static readonly StringBuilder loopSb = new StringBuilder(100);
        private static TagContent DrawLoop(bool left, int depth, int x, int y1, int y2)
        {
            var offs = (left) ? (-(cellw / 2)) : (cellw / 2);
            var limit = Math.Abs(y2 - y1) / 2; // prevent curves crossing over
            var stepping = Math.Min(limit, (loopSpacing * depth) + loopSpacing);
            if (left) {stepping = -stepping; }
            var upPixDepth = -Math.Abs(stepping);
            var pixDepth = stepping;

            var x_inner = x + offs;
            var x_outer = x + offs + stepping;

            var yLower = Math.Max(y1,y2);
            var yUpper = Math.Min(y1,y2);

            var yL1 = yLower + upPixDepth;
            var yU1 = yUpper - upPixDepth;

            loopSb.Clear();
            loopSb.Append('M');
            loopSb.Append(x_inner);
            loopSb.Append(',');
            loopSb.Append(yLower);
            loopSb.Append('q');
            loopSb.Append(pixDepth);
            loopSb.Append(" 0 ");
            loopSb.Append(pixDepth);
            loopSb.Append(' ');
            loopSb.Append(upPixDepth);
            loopSb.Append('L');
            loopSb.Append(x_outer);
            loopSb.Append(',');
            loopSb.Append(yL1);
            loopSb.Append(' ');
            loopSb.Append(x_outer);
            loopSb.Append(',');
            loopSb.Append(yU1);
            loopSb.Append("q0 ");
            loopSb.Append(upPixDepth);
            loopSb.Append(' ');
            loopSb.Append(-pixDepth);
            loopSb.Append(' ');
            loopSb.Append(upPixDepth);

            return T.g("g", "class","cmplx")[ T.g("path", "d", loopSb.ToString()) ];
        }

        /// <summary>
        /// Guess the width for a proportional font.
        /// NOT ACCURATE.
        /// It would be good to have a client side library adjust the guesses with measurements
        /// </summary>
        private static int GuessStringWidth(int fontSizePx, params string[] parts)
        {
            int l = 0;
            int narrow = fontSizePx / 8;
            int med = (2* fontSizePx) / 3;
            int wide = fontSizePx;

            foreach (var part in parts)
            {
                var chars = part.ToCharArray();
                foreach (var c in chars)
                {
                    switch (c)
                    {
                        case 'i':
                        case 'I':
                        case 'l':
                        case '1':
                        case '[':
                        case ']':
                        case '!':
                        case '|':
                        case '.':
                        case ',':
                            l += narrow;
                            break;
                        case '_':
                            l += wide;
                            break;
                        default:
                            l += char.IsUpper(c) ? wide : med;
                            break;
                    }
                }
            }
            return l;
        }
    }
}