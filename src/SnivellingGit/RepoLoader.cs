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
        /// Load a repository given a path with or without a drive spec.
        /// <para>On *nix, there are no drive specs anyway. On Windows we need to guess something like C:\{requestedPath}</para>
        /// This method will try to guess a /x/my/path input to be a X:\my\path output.
        /// </summary>
        public Repository Load(string requestedPath)
        {
            requestedPath = requestedPath.Replace('/', '\\').TrimStart('\\');

            // check to see if a drive was specified
            if (requestedPath.Length > 1 && requestedPath[1] == '\\') {
                if (LoadRepositoryDirect(requestedPath.Substring(2), requestedPath[0]+":\\", out var repository)) return repository;
            }

            // no drive specified, loop through connected drives
            foreach (var drive in _fs.Directory.GetLogicalDrives())
            {
                if (LoadRepositoryDirect(requestedPath, drive, out var repository)) return repository;
            }

            // nothing found
            return null;
        }

        private bool LoadRepositoryDirect(string requestedPath, string drive, out Repository repo)
        {
            repo = null;
            var candidate = Path.Combine(drive, requestedPath);
            if (!_fs.Directory.Exists(candidate)) return false;
            if (!Repository.IsValid(candidate)) return false;

            try
            {
                repo = new Repository(candidate);
                return true;
            }
            catch (Exception ex)
            {
                // It looked like a good repo, but it failed.
                Console.WriteLine(ex);
            }
            return false;
        }
    }
}