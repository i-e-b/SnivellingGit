namespace SnivellingGit
{
    using LibGit2Sharp;

    /// <summary>
    /// Load Git repositories from rootless paths
    /// </summary>
    public interface IRepoLoader
    {
        /// <summary>
        /// Load a repository given a rootless path.
        /// <para>On *nix, all paths are rootless anyway. On Windows we need to guess something like C:\{requestedPath}</para>
        /// </summary>
        IRepository Load(string requestedPath);
    }
}