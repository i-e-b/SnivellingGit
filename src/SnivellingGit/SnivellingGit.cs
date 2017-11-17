using System;
using SnivellingGit.Interfaces;
using SnivellingGit.Rendering;

namespace SnivellingGit
{
    using StructureMap;
    using System.IO.Abstractions;

    /// <summary>
    /// Program entry point and default configuration.
    /// </summary>
    public class SnivellingGit
    {
        static void Main()
        {
            Configure();
            Run();
        }

        static void Run()
        {
            using (var repo = ObjectFactory.GetInstance<IRepoLoader>().Load("."))
            {
                var html = ObjectFactory.GetInstance<IHistoryRenderer>().RenderRepositoryPage(repo, "");
                Console.WriteLine(html);
            }
        }

        /// <summary>
        /// Configure Structuremap for SnivellingGit defaults
        /// </summary>
        public static void Configure()
        {
            ObjectFactory.Configure(map =>
            {
                map.For<IHistoryRenderer>().Use<HistoryRenderer>();
                map.For<IFileSystem>().Use<FileSystem>();
                map.For<IRepoLoader>().Use<RepoLoader>();
            });
        }
    }
}
