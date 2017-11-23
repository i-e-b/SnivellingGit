using LibGit2Sharp;
using Tag;

namespace SnivellingGit.Interfaces
{
    /// <summary>
    /// HTML page renderer for the main graph, status and controls
    /// </summary>
    public interface IPageRenderer
    {
        /// <summary>
        /// Render a repository view from the given git repository
        /// </summary>
        TagContent RenderRepositoryPage(IRepository repo, string flags);

        /// <summary>
        /// Render the SVG graph of the repo's history and current branches
        /// </summary>
        TagContent RenderSvgGraph(IRepository repo);

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

        /// <summary>
        /// Render a set of repo-wide controls to sit above the history graph
        /// </summary>
        TagContent RenderControls(IRepository repo, string flags);
    }
}