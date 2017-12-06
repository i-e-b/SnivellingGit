using System.Linq;
using LibGit2Sharp;
using Tag;

namespace SnivellingGit.Rendering
{
    /// <summary>
    /// Class to render the status and control headers on the repo page
    /// </summary>
    public class ControlRenderer
    {
        /// <summary>
        /// Return tag content for repo page header
        /// </summary>
        public TagContent RenderControlBoxes(IRepository repo, string selectedNodeSha, string flags)
        {
            var controls = T.g();

            AddRepoStatusLines(repo, controls);
            AddBranchesBox(repo, controls);
            AddTagsBox(repo, controls);
            AddActionsBox(repo, selectedNodeSha, controls);
            AddLogOutputBox(controls);

            return controls;
        }

        private static void AddLogOutputBox(TagContent controls)
        {
            controls.Add(T.g("div", "class", "floatBox")["Log output", T.g("br/"), T.g("div", "id", "log")]);
        }

        private static void AddActionsBox(IRepository repo, string selectedNodeSha, TagContent controls)
        {
            var actions = T.g("div", "class", "floatBox")["Actions", T.g("br/")];
            actions.Add(GitActionLink("fetch-all", "Fetch all and prune"));
            if (!string.IsNullOrWhiteSpace(selectedNodeSha))
            {
                actions.Add(JsLink("gitAction('checkout', '" + selectedNodeSha + "')", "Checkout selected (headless)"), T.g("br/"));
                actions.Add(JsLink("svgElementClicked(null)", "Select None"), T.g("br/"));
            }

            if (repo.Head.IsTracking && repo.Head.Tip.Sha != repo.Head.TrackedBranch.Tip.Sha)
            {
                actions.Add(GitActionLink("pull-ff-only", "Update to tracking"), T.g("br/"));
            }

            controls.Add(actions);
        }

        private void AddTagsBox(IRepository repo, TagContent controls)
        {
            var tags = T.g("div", "class", "floatBox")["Tags", T.g("br/")];
            tags.Add(repo.Tags.OrderByDescending(t => t.FriendlyName).Select(b => ShaLink(b.Target.Sha, b.FriendlyName, b.FriendlyName)));
            controls.Add(tags);
        }

        private void AddBranchesBox(IRepository repo, TagContent controls)
        {
            var branches = T.g("div", "class", "floatBox")["Branches", T.g("br/")];
            branches.Add(repo.Branches.Select(b => ShaLink(b.Tip.Sha, b.FriendlyName, GetLocalName(b))));
            controls.Add(branches);
        }

        private static void AddRepoStatusLines(IRepository repo, TagContent controls)
        {
            var status = repo.RetrieveStatus();
            controls.Add(T.g("p")["Currently checked out: ", T.g("span", "class", "data")[repo.Head.CanonicalName], T.g("br/"),
                "Working copy: ", T.g("span", "class", "data")[status.Added.Count() + " added, " + status.Removed.Count() + " deleted, " + status.Modified.Count() + " modified; " + status.Staged.Count() + " staged for next commit."], T.g("br/"),
                "Current interactive operation '" + repo.Info.CurrentOperation + "'"]
            );
        }

        private string GetLocalName(Branch branch)
        {
            return branch.IsRemote ? branch.FriendlyName.Replace(branch.RemoteName+"/", "") : branch.FriendlyName;
        }

        private static TagContent JsLink (string function, string text, string alt = ""){
            return T.g("a", "href", "javascript:" + function, "title", alt)[text];
        }

        private static TagContent GitActionLink(string action, string text)
        {
            return T.g()[JsLink("gitAction('" + action + "')",text), T.g("br/")];
        }

        private TagContent ShaLink(string sha, string text, string checkoutName)
        {
            return T.g()[
                JsLink("gitAction('checkout', '" + checkoutName + "')", "➔", "Checkout " + checkoutName),
                T.g()["&nbsp;"],
                JsLink("selectCommit('" + sha + "')", text),
                T.g("br/")
            ];
        }

    }
}