using LibGit2Sharp;
using Tag;

namespace SnivellingGit.Interfaces
{
    /// <summary>
    /// HTML page renderer for the main graph and status
    /// </summary>
    public interface IHistoryRenderer
    {
        /// <summary>
        /// Render a repository view from the given directory into a HTML document
        /// </summary>
        TagContent RenderRepositoryPage(IRepository repo, string flags);

        /// <summary>
        /// Default false. If true, try to show a branch named 'Master' before all others, including 'HEAD'.
        /// To do: generalise this to any named branch
        /// </summary>
        bool AlwaysShowMasterFirst { get; set; }

        /// <summary>
        /// Default false. If true, complex merge ancestry will be hidden
        /// </summary>
        bool HideComplexHistory { get; set; }

        /// <summary>
        /// Default false. If true, only show local branches
        /// </summary>
        bool OnlyLocal { get; set; }

        /// <summary>
        /// If set, the matching commit (by SHA hash) will blink
        /// </summary>
        string CommitIdToHilight { get; set; }
    }
}