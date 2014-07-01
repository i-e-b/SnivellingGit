namespace Sg.Web
{
    using System;
    using System.IO.Abstractions;
    using System.Net;
    using SnivellingGit;
    using StructureMap;

    class Program
    {
        static void Main(string[] args)
        {
            const string listen = "http://localhost:8080/";
            Configure();

            using (new WebServer(SendResponse, listen))
            {
                Console.WriteLine("listening on " + listen + " to display git directories");
                Console.WriteLine("Press any key to exit");
                Console.ReadKey();
            }
        }

        public static string SendResponse(HttpListenerRequest request)
        {
            return ObjectFactory.GetInstance<IHistoryRenderer>().Render(@"C:\" + request.Url.AbsolutePath);
        }

        static void Configure()
        {
            ObjectFactory.Configure(map =>
            {
                map.For<IHistoryRenderer>().Use<HistoryRenderer>();
                map.For<IFileSystem>().Use<FileSystem>();
            });
        }
    }
}
