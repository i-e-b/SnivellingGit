namespace Sg.Web
{
    using System;
    using System.Net;
    using SnivellingGit;
    using StructureMap;

    class Program
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

        public static string SendResponse(HttpListenerRequest request)
        {
            var repo = ObjectFactory.GetInstance<IRepoLoader>().Load(request.Url.AbsolutePath);
            return ObjectFactory.GetInstance<IHistoryRenderer>().Render(repo);
        }
    }
}
