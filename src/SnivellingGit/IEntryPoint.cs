namespace SnivellingGit
{
    /// <summary>
    /// Entry point to the sg command line
    /// </summary>
    public interface IEntryPoint
    {
        /// <summary>
        /// Start a host from the current directory
        /// </summary>
        void Run();
    }
}