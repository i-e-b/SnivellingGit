using System.Text;

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
            SnivellingGit.Configure();

            using (new WebServer(SendResponse, listen))
            {
                Console.WriteLine("listening on " + listen + " to display git directories");
                Console.WriteLine("Press any key to exit");
                Console.ReadKey();
            }
        }

        public static string SendResponse(HttpListenerRequest request, HttpListenerResponse rawResponse)
        {
            var repoPath = request.Url.AbsolutePath;
            var settings = request.QueryString;

            if (repoPath == "/favicon.ico")
            {
                WriteIcon(rawResponse);
                return null;
            }

            return WriteMasterPage(rawResponse, repoPath, settings);
        }

        private static string WriteMasterPage(HttpListenerResponse response, string repoPath, NameValueCollection settings)
        {
            var flags= GetFlags(settings);
            response.AddHeader("Content-Type", "text/html");

            repoPath = repoPath.Replace('\\', '/'); // handle copy-and-paste from Windows paths
            using (var repo = ObjectFactory.GetInstance<IRepoLoader>().Load(repoPath))
            {
                if (repo == null)
                {
                    return NoSuchRepoPage(repoPath);
                }
                var renderer = ObjectFactory.GetInstance<IHistoryRenderer>();

                // set these with incoming query...
                renderer.AlwaysShowMasterFirst = flags.Contains("asm");
                renderer.HideComplexHistory = flags.Contains("simple");
                renderer.OnlyLocal = flags.Contains("local");

                renderer.CommitIdToHilight = settings["show"];

                var html = renderer.RenderRepositoryPage(repo, string.Join(",", flags));
                html.StreamTo(response.OutputStream, Encoding.UTF8);

                return null;
            }
        }

        private static string NoSuchRepoPage(string repoPath)
        {
            var sb = new StringBuilder();
            sb.Append("<html><head><title>Not Found</title></head><body>");
            sb.Append("<h1>Not found</h1>");
            sb.Append("<p>The path at '"+repoPath+"' either does not exist, or is not part of a git repository</p>");
            sb.Append("</body></html>");
            return sb.ToString();
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
