namespace SnivellingGit
{
    using LibGit2Sharp;

    /// <summary>
    /// Entry point to the sg command line
    /// </summary>
    public interface IHistoryRenderer
    {
        /// <summary>
        /// Render a repository view from the given directory (should be a git root path or .git directory)
        /// </summary>
        string Render(IRepository repo);

        /// <summary>
        /// Default false. If true, try to show a branch named 'Master' before all others, including 'HEAD'.
        /// To do: generalise this to any named branch
        /// </summary>
        bool AlwaysShowMasterFirst { get; set; }

        /// <summary>
        /// Default false. If true, complex merge ancestry will be hidden
        /// </summary>
        bool ShowSimpleHistory { get; set; }

        /// <summary>
        /// Default false. If true, only show local branches
        /// </summary>
        bool OnlyLocal { get; set; }
    }
}