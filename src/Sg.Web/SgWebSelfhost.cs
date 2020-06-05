using System.Text;
using LibGit2Sharp;
using SnivellingGit.GitCommands;
using SnivellingGit.Interfaces;
using Tag;

namespace Sg.Web
{
    using System;
    using System.Collections.Generic;
    using System.Collections.Specialized;
    using System.IO;
    using System.Net;
    using SnivellingGit;
    using StructureMap;

    class SgWebSelfhost
    {
        static void Main()
        {
            const string listen = "http://localhost:8080/";
            Entry.Configure();

            using (new WebServer(SendResponse, listen))
            {
                Console.WriteLine("listening on " + listen + " to display git directories");
                Console.WriteLine("Press any key to exit");
                Console.ReadKey();
            }
        }

        public static string SendResponse(HttpListenerRequest request, HttpListenerResponse response)
        {
            var repoPath = request.Url.AbsolutePath;
            var settings = request.QueryString;
            var command = settings["command"];
            var target = settings["target"];

            if (repoPath == "/favicon.ico")
            {
                WriteIcon(response);
                return null;
            }

            switch (command) {
                case "fetch-all":
                    return HandleAction(GitAction.FetchAllPrune, repoPath, response);

                case "pull-ff-only":
                    return HandleAction(GitAction.PullFastForward, repoPath, response);

                case "checkout":
                    return HandleAction(GitAction.Checkout, target, repoPath, response);

                case "render-svg":
                    return WriteSvgGraph(response, repoPath, settings);

                case "repo-controls":
                    return WriteControlHeaders(response, repoPath, settings);

                default:
                    return WriteMasterPage(response, repoPath, settings);
            }
        }

        private static string HandleAction(GitAction.GeneralAction action, string repoPath, HttpListenerResponse response)
        {
            var ok = action(repoPath, out var logs);
            if (!ok) response.StatusCode = 500;
            return logs.Replace("\n", "<br/>");
        }

        private static string HandleAction(GitAction.TargetAction action, string target, string repoPath, HttpListenerResponse response)
        {
            var ok = action(repoPath, target, out var logs);
            if (!ok) response.StatusCode = 500;
            return logs.Replace("\n", "<br/>");
        }

        private static string WriteSvgGraph(HttpListenerResponse response, string repoPath, NameValueCollection settings)
        {
            return RenderFromRepo(response,
                (repo,flags,renderer, start, limit)=>renderer.RenderSvgGraph(repo, start, limit),
                (resp) => {resp.StatusCode = 500; return null; },
                "image/svg+xml", repoPath, settings);
        }

        private static string WriteMasterPage(HttpListenerResponse response, string repoPath, NameValueCollection settings)
        {
            return RenderFromRepo(response,
                (repo,flags,renderer, start, limit)=>renderer.RenderRepositoryPage(repo,string.Join(",", flags), start, limit),
                (resp) => {resp.StatusCode = 404; return NoSuchRepoPage(repoPath);  },
                "text/html", repoPath, settings);
        }

        private static string WriteControlHeaders(HttpListenerResponse response, string repoPath, NameValueCollection settings)
        {
            return RenderFromRepo(response,
                (repo,flags,renderer,start,limit)=>renderer.RenderControls(repo,string.Join(",", flags)),
                (resp) => {resp.StatusCode = 500; return null; },
                "text/html", repoPath, settings);
        }

        private static string RenderFromRepo(HttpListenerResponse response, 
            Func<IRepository,ISet<string>, IPageRenderer, int, int,  TagContent> renderCall,
            Func<HttpListenerResponse, string> noRepoAction,
            string contentType, string repoPath, NameValueCollection settings)
        {
            var flags = GetFlags(settings);
            response.AddHeader("Content-Type", contentType);

            using (var repo = ObjectFactory.GetInstance<IRepoLoader>().Load(repoPath))
            {
                if (repo == null)
                {
                    return noRepoAction(response);
                }
                var renderer = ObjectFactory.GetInstance<IPageRenderer>();

                // set these with incoming query...
                renderer.AlwaysShowMasterFirst = flags.Contains("asm");
                renderer.HideComplexHistory = flags.Contains("simple");
                renderer.OnlyLocal = flags.Contains("local");

                renderer.CommitIdToHilight = settings["show"];

                var startRow = ParseOrDefault(settings["start"], 0);
                var rowLimit = ParseOrDefault(settings["limit"], 500);

                var html = renderCall(repo, flags, renderer, startRow, rowLimit);
                html.StreamTo(response.OutputStream, Encoding.UTF8);

                return null;
            }
        }

        private static int ParseOrDefault(string value, int defaultValue)
        {
            if (value == null) return defaultValue;
            if (int.TryParse(value, out var parsed)) return parsed;
            return defaultValue;
        }

        private static string NoSuchRepoPage(string repoPath)
        {
            var body = T.g("body");

            if (Directory.Exists(repoPath)) { // navigation controls
                var list = T.g("ul");
                var up = Path.GetDirectoryName(repoPath);
                if (up != null) list.Add (T.g("ol")["↩", T.g("a", "href",up)["Up"], T.g("br/")]);

                foreach (var dir in Directory.GetDirectories(repoPath)) {
                    var downName = Path.GetFileName(dir);
                    list.Add(T.g("ol")[T.g("a", "href",dir)[downName]]);
                }

                body.Add(
                    T.g("h1")["Navigation"],
                    T.g("p")[repoPath],
                    list
                );
            } else { // Not found message
                body.Add(
                    T.g("h1")["Not found"],
                    T.g("p")["The path at '"+repoPath+"' either does not exist, or you don't have permission to view it"]
                );
            }

            var page = T.g("html")[
                T.g("head")[T.g("title")["No git repo found"]],
                body
            ];
            return page.ToString();
        }

        static void WriteIcon(HttpListenerResponse rawResponse)
        {
            if (!File.Exists("favicon.ico"))
            {
                rawResponse.StatusCode = 404;
                return;
            }

            rawResponse.AddHeader("Content-Type", "image/png");
            rawResponse.AddHeader("Cache-Control", "max-age=604800, public"); // check once a week

            using (var fs = File.OpenRead("favicon.ico")) {
                fs.CopyTo(rawResponse.OutputStream);
            }
        }

        /// <summary>
        /// Read all query parameters where there is NO `key=value` pair.
        /// These are treated as 'flags'
        /// </summary>
        /// <param name="settings">Request URL's query params</param>
        static ISet<string> GetFlags(NameValueCollection settings)
        {
            var result = new HashSet<string>();
            for (int i = 0; i < settings.Count; i++)
            {
                if (settings.GetKey(i) == null)
                {
                    foreach (var flag in settings[i].Split(new[]{','}, StringSplitOptions.RemoveEmptyEntries))
                    {
                        result.Add(flag);
                    }
                }
            }
            return result;
        }
    }
}
