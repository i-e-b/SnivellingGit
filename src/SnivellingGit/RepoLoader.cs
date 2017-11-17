using SnivellingGit.Interfaces;

namespace SnivellingGit
{
    using System;
    using System.IO;
    using System.IO.Abstractions;
    using LibGit2Sharp;

    /// <summary>
    /// Default repo loader
    /// </summary>
    public class RepoLoader:IRepoLoader
    {
        readonly IFileSystem _fs;

        /// <summary>
        /// New repo loader with file system
        /// </summary>
        public RepoLoader(IFileSystem fs)
        {
            _fs = fs;
        }

        /// <summary>
        /// Load a repository given a rootless path.
        /// <para>On *nix, all paths are rootless anyway. On Windows we need to guess something like C:\{requestedPath}</para>
        /// </summary>
        public IRepository Load(string requestedPath)
        {
            foreach (var drive in _fs.Directory.GetLogicalDrives())
            {
                var candidate = Path.Combine(drive, requestedPath);
                if (!_fs.Directory.Exists(candidate)) continue;

                try
                {
                    return new Repository(candidate);
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex);
                }
            }
            return null;
        }
    }
}