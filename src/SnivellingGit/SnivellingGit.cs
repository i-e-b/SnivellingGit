namespace SnivellingGit
{
    using System;
    using StructureMap;
    using System.IO.Abstractions;

    /// <summary>
    /// Program entry point and default configuration.
    /// </summary>
    public class SnivellingGit
    {
        static void Main(string[] args)
        {
            Configure();
            Run();
        }

        static void Run()
        {
            var repo = ObjectFactory.GetInstance<IRepoLoader>().Load("/Work/MyGoCompare");
            //Console.WriteLine(
            ObjectFactory.GetInstance<IHistoryRenderer>().Render(repo);
            //);
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
