﻿namespace Sg.Web
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

        private static string WriteMasterPage(HttpListenerResponse rawResponse, string repoPath, NameValueCollection settings)
        {
            var flags= GetFlags(settings);
            rawResponse.AddHeader("Content-Type", "text/html");

            var repo = ObjectFactory.GetInstance<IRepoLoader>().Load(repoPath);
            var renderer = ObjectFactory.GetInstance<IHistoryRenderer>();

            // set these with incoming query...
            renderer.AlwaysShowMasterFirst = flags.Contains("asm");
            renderer.ShowSimpleHistory = flags.Contains("simple");
            renderer.OnlyLocal = flags.Contains("local");

            renderer.CommitIdToHilight = settings["show"];

            return renderer.Render(repo);
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
