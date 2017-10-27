namespace SnivellingGit
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Text;
    using LibGit2Sharp;

    /// <summary>
    /// Render an SVG from a git repository
    /// </summary>
    public class HistoryRenderer : IHistoryRenderer
    {
        /// <summary>
        /// Default false. If true, try to show a branch named 'Master' before all others, including 'HEAD'.
        /// To do: generalise this to any named branch
        /// </summary>
        public bool AlwaysShowMasterFirst { get; set; }

        /// <summary>
        /// Default false. If true, complex merge ancestry will be hidden
        /// </summary>
        public bool HideComplexHistory { get; set; }

        /// <summary>
        /// Default false. If true, only show local branches
        /// </summary>
        public bool OnlyLocal { get; set; }

        /// <summary>
        /// If set, the matching commit (by SHA hash) will blink
        /// </summary>
        public string CommitIdToHilight { get; set; }

        /// <summary>
        /// Start a host from the current directory
        /// </summary>
        public string Render(IRepository repo)
        {
            ICommitGraph table = new ColumnsCommitGraph();

            HistoryWalker.BuildCommitGraph(repo, table, OnlyLocal, AlwaysShowMasterFirst);


            var outp = new StringWriter();
            WriteHtmlHeader(outp);

            var status = repo.Index.RetrieveStatus();

            outp.WriteLine("<p>Currently checked out: <span class=\"data\">" + repo.Head.CanonicalName + "</span></p>");

            outp.WriteLine("<div class=\"floatBox\">");
                outp.WriteLine("<p>Working copy:<span class=\"data\"> " + status.Added.Count() + " added, " + status.Removed.Count() + " deleted, " + status.Modified.Count() + " modified; ");
                outp.WriteLine(status.Staged.Count() + " staged for next commit.</span></p>");

                outp.WriteLine("<p>Current interactive operation '" + repo.Info.CurrentOperation + "'</p>");
                outp.WriteLine("<p>History contains " + HistoryWalker.SafeEnumerate(repo.Commits).Count() + " commits</p>");
            outp.WriteLine("</div>");

            outp.WriteLine("<div class=\"floatBox\">Branches <a href=\"?\">Select None</a><br/>" 
                + string.Join("<br/>", repo.Branches.Select(b => "<a href=\"?show="+b.Tip.Sha+"\">"+b.CanonicalName+"</a>"))
                + "</div>");

            outp.WriteLine("<div class=\"floatBox\">Tags <a href=\"?\">Select None</a><br/>" 
                           + string.Join("<br/>", repo.Tags.OrderByDescending(t=>t.Name).Select(b => "<a href=\"?show="+b.Target.Sha+"\">"+b.Name+"</a>"))
                           + "</div>");

            outp.WriteLine("<div style=\"clear:both\"></div>");

            RenderCommitGraphToHtml(outp, table, CommitIdToHilight, rowLimit:100);
            WriteHtmlFooter(outp);

            return outp.ToString();
        }

        static void WriteHtmlFooter(TextWriter f)
        {
            f.Write("</body></html>");
        }

        static void WriteHtmlHeader(TextWriter f)
        {
            f.WriteLine("<html><head><title>Log</title><style>" + Styles + "</style></head><body>");
        }

        const string Styles = @"
.flat {margin-left:10px;width:4px;height:4px;background:#aaa;}
.fullMerge {margin-left:8px;width:10px;height:10px;background:#ccc;border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;}
.commit {width:24px;height:16px;border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;}
.line {border-left: 2px solid #aaa;height: 16px;margin-left: 11px;margin-right: 11px;}

.prune { fill:#f00; }
.headCell { fill:#5b5; }
.tag path { stroke: #333; stroke-width: 1px; fill: none; opacity: 0.5; }
.cmplx path { stroke: #000; stroke-width: 1px; fill: none;  opacity: 0.2;}
.link path { stroke: #aaa; stroke-width: 1px; fill: none;  opacity: 1;}
path:hover { stroke: #000; stroke-width: 2px; fill: none;  opacity: 1;}
path { stroke: #aaa; stroke-width: 1px; fill: none; }
#arrow path { stroke: #000; stroke-width: 1px; fill: #000; }
svg{border:none;overflow:visible}
text { font-weight: 300; font-family: Helvetica, Arial, sans-serf; font-size: 10px; }
.node rect { stroke-width: 2px; stroke: #333; fill: #fff; opacity: 1;}
.merge circle { stroke-width: 2px; stroke: #bbb; fill: #fff; opacity: 1;}

.data {font-family: monospace; font-size:10px;}
p {font-size:12px;}
a, a:link, a:visited, a:hover, a:active {color: #000; text-decoration: underline; font-family: monospace; font-size:11px;}
@keyframes blink {
  0%  { opacity:1.0 }
  50% { opacity:0.4 }
}
.blink { animation-name: blink; animation-duration: 1s; animation-iteration-count: infinite; }

.floatBox { float: left; height: 100px; overflow-y: scroll; margin: 10px; padding: 10px; }
";
        const string SvgHeader = @"
<svg width='{0}px' height='{1}px'>
<g transform='translate(20,20)'>
<defs>
    <marker id='arrow' viewBox='0 0 10 10' refX='8' refY='5' markerUnits='strokeWidth' markerWidth='8' markerHeight='5' orient='auto' style='fill: #000'>
        <path d='M 0 0 L 10 5 L 0 10 z'></path>
    </marker>
    <marker id='dot' viewBox='-10 -10 20 20' refX='0' refY='0' markerUnits='strokeWidth' markerWidth='10' markerHeight='10' orient='auto' style='fill: #333'>
        <circle cx='0' cy='0' r='3'></circle>
    </marker>
</defs>";
        const string trackedNode =
@"<g class='node {4}' transform='translate({0},{1})'>
    <rect rx='5' ry='5' x='-10' y='-8' width='20' height='14' style='fill:#{3}'><title>{2}</title></rect>
</g>";
        const string localNode =
@"<g class='node {4}' transform='translate({0},{1})'>
    <rect rx='5' ry='5' x='-10' y='-8' width='20' height='14' style='stroke:#{3}'><title>(untracked) {2}</title></rect>
</g>";
        const string mergeNode =
@"<g class='merge {3}' transform='translate({0},{1})'>
    <circle cx='0' cy='0' r='7'><title>{2}</title></circle>
</g>";
        const string branchTagAnnotation =
@"<g class='tag' transform='translate({0},{1})'>
    <text x='-40' y='3' text-anchor='end' class='{4}'>{2}</text>
    <path marker-end='url(#dot)' d='M-35,0L{3},0' style='opacity: 1;'></path>
</g>";
        const string commitMessage =
@"<g class='tag {3}' transform='translate({0},{1})'>
    <text x='20' y='3' text-anchor='start'>{2}</text>
</g>";

        const int cellMargin = 4;
        const int cellw = 20;
        const int cellmarginw = cellw + 10;
        const int cellh = 14;

        void RenderCommitGraphToHtml(TextWriter f, ICommitGraph table, string hiliteSha, int rowLimit)
        {
            var cells = table.Cells().ToArray();

            var widestLabel = cells.Select(c => GuessStringWidth(10, c.BranchNames.ToArray())).Max();
            int tagLabelMargin = widestLabel + 40;

            Func<int, int> cellX = col => (col * cellmarginw) + tagLabelMargin;
            Func<int, int> cellY = row => (row * (cellh + cellMargin));
            Func<int, int> labelX = col => col * cellmarginw;

            var rightMostColumnX = cellX(cells.Select(c => c.Column).Max() + 1);
            var rightMostNodeEdge = rightMostColumnX + 10;
            var rightMostEdgeOfSvg = rightMostNodeEdge;
            var sb = new StringBuilder();

            // Draw branch lines (overdrawn by nodes)
            DrawAncestryLines(rowLimit, cells, sb, cellX, cellY);

            foreach (var cell in cells)
            {
                if (rowLimit-- == 0) break;

                var styleClass = "";
                if (cell.CommitPoint.Id == hiliteSha) styleClass += "blink ";

                var title = cell.CommitPoint.Author+"\r\n"+cell.CommitPoint.Id;
                // Draw node
                if (cell.IsMerge)
                {
                    sb.AppendFormat(mergeNode, cellX(cell.Column), cellY(cell.Row), title, styleClass);
                }
                else
                {
                    sb.AppendFormat(cell.LocalOnly ? localNode : trackedNode, cellX(cell.Column), cellY(cell.Row), title, cell.CommitPoint.Colour, styleClass);
                }

                // Draw commit message
                sb.AppendFormat(commitMessage, rightMostNodeEdge, cellY(cell.Row), cell.CommitPoint.Message, styleClass);
                rightMostEdgeOfSvg = Math.Max(rightMostEdgeOfSvg, rightMostNodeEdge + GuessStringWidth(10, cell.CommitPoint.Message));

                // Draw tags and branch names
                if (cell.BranchNames.Any())
                {
                    if (cell.IsPrunable) styleClass += "prune ";
                    if (cell.BranchNames.Contains("HEAD")) styleClass += "headCell ";
                    sb.AppendFormat(branchTagAnnotation, tagLabelMargin, cellY(cell.Row), string.Join(", ", cell.BranchNames), labelX(cell.Column) - 5, styleClass);
                }
            }

            f.WriteLine(SvgHeader, rightMostEdgeOfSvg + 25, cellY(cells.Length) + 25);
            f.Write(sb.ToString());
            f.Write("</g></svg>");
        }

        void DrawAncestryLines(int rowLimit, ICollection<GraphCell> cells, StringBuilder sb, Func<int, int> cellX, Func<int, int> cellY)
        {
            var odd = true;
            foreach (var cell in cells) // increasing row number
            {
                if (rowLimit-- == 0) { break; }

                var depth = 1;
                foreach (var child in cell.ChildCells) // increasing row number
                {
                    var complex = !HideComplexHistory && AreCellsBetween(cells, cell.Column, cell.Row, child.Row);

                    if (complex)
                    {
                        odd = !odd;
                    }
                    var distance = Math.Abs(child.Row - cell.Row);

                    depth = ConnectCells(sb, cells, child, cell, cellX, cellY, odd, complex, distance, depth);
                }
            }
        }

        
        const string simpleLine = @"<g class='link'><path d='M{0},{1}L{2},{3}' ></path></g>";
        const string crookLine = @"<g class='link'><path d='M{0},{1}L{2},{3}L{4},{5}'></path></g>";
        /// <summary>
        /// Draw lines between two cells. Only to be used by DrawAncestryLines
        /// </summary>
        private int ConnectCells(StringBuilder sb, ICollection<GraphCell>  allCells, GraphCell child, GraphCell parent, Func<int, int> cellX, Func<int, int> cellY, bool odd, bool complex, int distance, int depth)
        {
            if (child.Column != parent.Column) // an unmerged branch
            {
                DrawDirectBranchingLine(sb, allCells, child, parent, cellX, cellY);
            }
            else if (!complex || HideComplexHistory) // simple inheritance
            {
                if (child.IsMerge && distance > 1 && ! HideComplexHistory) // actually complex. Show on left.
                {
                    var jitter = child.Row % 4;
                    sb.Append(DrawLoop(left: true, depth: distance, x: cellX(parent.Column) - jitter, y1: cellY(parent.Row), y2: cellY(child.Row)));
                }
                else // really simple, draw a straight line between the two
                {
                    sb.AppendFormat(simpleLine, cellX(parent.Column), cellY(child.Row), cellX(child.Column), cellY(parent.Row));
                }
            }
            else // complex inheritance, show on right
            {
                sb.Append(DrawLoop(left: odd, depth: depth, x: cellX(parent.Column), y1: cellY(parent.Row), y2: cellY(child.Row)));
                depth++;
            }
            return depth;
        }

        private void DrawDirectBranchingLine(StringBuilder sb, ICollection<GraphCell> allCells, GraphCell child, GraphCell parent, Func<int, int> cellX, Func<int, int> cellY)
        {
            // Try and stop weird merges from making unreadable paths:
            // 1) if steps across > steps up, do a straight line
            // 2) if there are no cells in the child column further down that this one, use a bottom crook line (goes across before up)
            // 3) if there are no cells in the parent column between parent and child, use a top crook line (goes up before across)
            // 4) else use a straight line

            var stepsAcross = Math.Abs(parent.Column - child.Column);
            var stepsUp = Math.Abs(parent.Row - child.Row);
            var childColObscured = AreCellsBetween(allCells, child.Column, parent.Row, child.Row);
            var parentColObscured = AreCellsBetween(allCells, parent.Column, child.Row, parent.Row);

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


            sb.AppendFormat(crookLine,
                cellX(parent.Column), cellY(parent.Row),
                mid_x, mid_y,
                cellX(child.Column), cellY(child.Row));
        }

        private bool AreCellsBetween(ICollection<GraphCell> allCells, int column, int rowA, int rowB)
        {
            var min = Math.Min(rowA, rowB);
            var max = Math.Max(rowA, rowB);

            // this is getting called quite a lot. Probably good to look at a more optimal storage
            return allCells.Any(c => c.Column == column && c.Row >= min && c.Row <= max && c.Row != rowB && c.Row != rowA);
        }

        const string complexLine = @"<g class='cmplx'><path d='M{0},{1} q{2} 0 {2} {3} L{4},{5} {4},{6} q0 {3} {7} {3}'></path></g>";
        static string DrawLoop(bool left, int depth, int x, int y1, int y2)
        {
            var offs = (left) ? (-(cellw / 2)) : (cellw / 2);
            var stepping = (left) ? ((-3 * depth) - 3) : ((3 * depth) + 3);
            var upPixDepth = -Math.Abs(stepping);
            var pixDepth = stepping;

            var x_inner = x + offs;
            var x_outer = x + offs + stepping;

            var yLower = Math.Max(y1,y2);
            var yUpper = Math.Min(y1,y2);

            var yL1 = yLower + upPixDepth;
            var yU1 = yUpper - upPixDepth;

            return string.Format(complexLine, x_inner, yLower, pixDepth, upPixDepth, x_outer, yL1, yU1, -pixDepth);
        }

        /// <summary>
        /// Guess the width for a proportional font.
        /// NOT ACCURATE.
        /// It would be good to have a client side library adjust the guesses with measurements
        /// </summary>
        static int GuessStringWidth(int fontSizePx, params string[] parts)
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

        // ReSharper disable once UnusedMember.Local
        static string Cleanup(string message, int width = 0)
        {
            var msg = message.Replace("\r", "").Replace("\n", " ").Replace("\t", " ");
            if (width <= 0) return msg;
            return msg.Substring(0, Math.Min(Console.BufferWidth - width - 10, msg.Length));
        }
    }
}