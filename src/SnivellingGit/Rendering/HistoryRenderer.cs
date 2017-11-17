using System;
using System.Linq;
using LibGit2Sharp;
using SnivellingGit.Interfaces;
using SnivellingGit.LayoutEngine;
using Tag;

namespace SnivellingGit.Rendering
{
    /// <summary>
    /// RenderRepositoryPage an SVG from a git repository
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
        /// Render a complete HTML page, containing status, controls and an SVG visualisation of the history.
        /// </summary>
        public TagContent RenderRepositoryPage(IRepository repo, string flags)
        {
            ICommitGraph table = new ColumnsCommitGraph();

            HistoryWalker.BuildCommitGraph(repo, table, OnlyLocal, AlwaysShowMasterFirst);


            var doc = WriteHtmlHeader(GitShortPath(repo.Info.Path), out var body);

            body.Add(T.g("p")["Currently checked out: ", T.g("span", "class","data")[repo.Head.CanonicalName]]);

            // Retrieving status on large repos is slow -- this should get rolled out to an async call?
            /*
            var status = repo.Index.RetrieveStatus();
            var fileStatus = T.g("div", "class", "floatBox")
                [
                    T.g("p")[
                        "Working copy: ", T.g("span", "class", "data")[status.Added.Count() + " added, " + status.Removed.Count() + " deleted, " + status.Modified.Count() + " modified; " + status.Staged.Count() + " staged for next commit."]
                    ],
                    T.g("p")["Current interactive operation '" + repo.Info.CurrentOperation + "'"],
                    T.g("p")["History contains " + HistoryWalker.SafeEnumerate(repo.Commits).Count() + " commits"]
                ];
            body.Add(fileStatus);
            // */

            var branches = T.g("div", "class", "floatBox")["Branches",  T.g("br/")];
            branches.Add(repo.Branches.Select(b=>ShaLink(flags, b.Tip.Sha, b.CanonicalName)));
            body.Add(branches);
            
            var tags = T.g("div", "class", "floatBox")["Tags", T.g("br/")];
            tags.Add(repo.Tags.OrderByDescending(t=>t.FriendlyName).Select(b=>ShaLink(flags, b.Target.Sha, b.CanonicalName)));
            body.Add(tags);

            var controls = T.g("div", "class","floatBox")["Actions", T.g("br/"), T.g("a", "href", "?" + flags)["Select None"], T.g("br/")];
            controls.Add(T.g("a", "href","?"+flags+"command=fetch-all")["Fetch all and prune", T.g("br/")]);
            if (HasSelectedNode()) {
                controls.Add(T.g("a","href","#")["Checkout selected (headless)", T.g("br/")]);
            }

            body.Add(controls);
            body.Add(T.g("div", "style","clear:both"));

            var svgRenderer = new SvgRenderer { HideComplexHistory = HideComplexHistory };
            body.Add(svgRenderer.RenderCommitGraphToSvg(table, CommitIdToHilight, rowLimit:500));

            return doc;
        }

        private TagContent ShaLink(string flags, string sha, string text)
        {
            return T.g("a", "href", "?"+flags+"&show="+sha)[text, T.g("br/")];
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


        // ReSharper disable once UnusedMember.Local
        static string Cleanup(string message, int width = 0)
        {
            var msg = message.Replace("\r", "").Replace("\n", " ").Replace("\t", " ");
            if (width <= 0) return msg;
            return msg.Substring(0, Math.Min(Console.BufferWidth - width - 10, msg.Length));
        }
    }
}