using System;
using System.Linq;
using LibGit2Sharp;
using SnivellingGit.Interfaces;
using SnivellingGit.LayoutEngine;
using Tag;

namespace SnivellingGit.Rendering
{
    /// <summary>
    /// HTML page renderer for the main graph, status and controls
    /// </summary>
    public class PageRenderer : IPageRenderer
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
        /// Render the SVG graph of the repo's history and current branches
        /// </summary>
        public TagContent RenderSvgGraph(IRepository repo)
        {
            ICommitGraph table = new ColumnsCommitGraph();
            HistoryWalker.BuildCommitGraph(repo, table, OnlyLocal, AlwaysShowMasterFirst);

            var svgRenderer = new SvgRenderer { HideComplexHistory = HideComplexHistory };
            return svgRenderer.RenderCommitGraphToSvg(table, CommitIdToHilight, rowLimit:500);
        }

        /// <summary>
        /// Render a set of repo-wide controls to sit above the history graph
        /// </summary>
        public TagContent RenderControls(IRepository repo, string flags) {
            var controls = T.g();

            var status = repo.RetrieveStatus();
            controls.Add(T.g("p")["Currently checked out: ", T.g("span", "class", "data")[repo.Head.CanonicalName], T.g("br/"),
                    "Working copy: ", T.g("span", "class", "data")[status.Added.Count() + " added, " + status.Removed.Count() + " deleted, " + status.Modified.Count() + " modified; " + status.Staged.Count() + " staged for next commit."], T.g("br/"),
                    "Current interactive operation '" + repo.Info.CurrentOperation + "'"]
                    );

            var branches = T.g("div", "class", "floatBox")["Branches",  T.g("br/")];
            branches.Add(repo.Branches.Select(b=>ShaLink(b.Tip.Sha, b.CanonicalName)));
            controls.Add(branches);
            
            var tags = T.g("div", "class", "floatBox")["Tags", T.g("br/")];
            tags.Add(repo.Tags.OrderByDescending(t=>t.FriendlyName).Select(b=>ShaLink(b.Target.Sha, b.CanonicalName)));
            controls.Add(tags);

            var actions = T.g("div", "class","floatBox")["Actions", T.g("br/")];
            actions.Add(GitActionLink("fetch-all", "Fetch all and prune"));
            if (HasSelectedNode()) {
                actions.Add(T.g("a", JsLink("void(0)"))["Checkout selected (headless)"], T.g("br/"));
                actions.Add(T.g("a", JsLink("svgElementClicked(null)"))["Select None"], T.g("br/"));
            }

            controls.Add(actions);


            controls.Add(T.g("div", "class", "floatBox")["Log output", T.g("br/"), T.g("div", "id", "log")]);
            return controls;
        }

        /// <summary>
        /// Render a complete HTML page, containing status, controls and an SVG visualisation of the history.
        /// The page scripts included allow interactive partial updates, and must be updated if tag IDs are changed here.
        /// </summary>
        public TagContent RenderRepositoryPage(IRepository repo, string flags)
        {
            var doc = WriteHtmlHeader(GitShortPath(repo.Info.Path), out var body);

            // Add controls into a container
            body.Add(T.g("div","id","controlHost")[RenderControls(repo, flags)]);

            // Add SVG to the page.
            // We must have an existing one on the page to activate the JavaScript click responder;
            // after that, we can update through AJAX calls.
            body.Add(T.g("div", "id", "spacer"));
            body.Add(T.g("div", "id", "svgHost")[RenderSvgGraph(repo)]);

            return doc;
        }

        
        private static string[] JsLink (string function){
            return new[] { "href", "javascript:" + function };
        }

        private static TagContent GitActionLink(string action, string text)
        {
            return T.g()[T.g("a", JsLink("gitAction('" + action + "')"))[text], T.g("br/")];
        }

        private TagContent ShaLink(string sha, string text)
        {
            return T.g("a", JsLink("selectCommit('"+sha+"')"))[text, T.g("br/")];
        }

        private bool HasSelectedNode()
        {
            return ! string.IsNullOrWhiteSpace(CommitIdToHilight);
        }

        /// <summary>
        /// Returns last two path elements, ignoring '.git' folder
        /// </summary>
        private string GitShortPath(string infoPath)
        {
            var bits = infoPath.Split('/', '\\');
            var lim = Math.Max(0, bits.Length - 4);
            return string.Join("/", bits.Skip(lim).Take(2));
        }

        static TagContent WriteHtmlHeader(string pathName, out TagContent body)
        {
            var html =
                T.g("html")[
                    T.g("head")[
                            T.g("title")[pathName + " Log"],
                            T.g("style").LoadFile("Styles/PageStyle.css")
                        ]
                    ];
            body = T.g("body")[T.g("script").LoadFile("Scripts/PageScript.js")];
            html.Add(body);

            return html;
        }
    }
}