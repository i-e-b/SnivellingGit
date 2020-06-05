using SnivellingGit.Interfaces;
using SnivellingGit.Rendering;

namespace SnivellingGit
{
    using StructureMap;
    using System.IO.Abstractions;

    /// <summary>
    /// Entry point for default configuration.
    /// </summary>
    public class Entry
    {
        /// <summary>
        /// Configure StructureMap for SnivellingGit defaults
        /// </summary>
        public static void Configure()
        {
            ObjectFactory.Configure(map =>
            {
                map.For<IPageRenderer>().Use<PageRenderer>();
                map.For<IFileSystem>().Use<FileSystem>();
                map.For<IRepoLoader>().Use<RepoLoader>();
            });
        }
    }
}
