namespace SnivellingGit
{
    /// <summary>
    /// Entry point to the sg command line
    /// </summary>
    public interface IHistoryRenderer
    {
        /// <summary>
        /// Render a repository view from the given directory (should be a git root path or .git directory)
        /// </summary>
        string Render(string path);
    }
}