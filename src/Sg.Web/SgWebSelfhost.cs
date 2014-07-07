namespace Sg.Web
{
    using System;
    using System.Collections.Generic;
    using System.Collections.Specialized;
    using System.Net;
    using SnivellingGit;
    using StructureMap;

    class SgWebSelfhost
    {
        static void Main(string[] args)
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
            rawResponse.AddHeader("Content-Type", "text/html");

            var repoPath = request.Url.AbsolutePath;
            var settings = request.QueryString;
            var flags= GetFlags(settings);

            var repo = ObjectFactory.GetInstance<IRepoLoader>().Load(repoPath);
            var renderer = ObjectFactory.GetInstance<IHistoryRenderer>();

            // set these with incoming query...
            renderer.AlwaysShowMasterFirst = flags.Contains("asm");
            renderer.ShowSimpleHistory = flags.Contains("simple");
            renderer.OnlyLocal = flags.Contains("local");

            return renderer.Render(repo);
        }

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
