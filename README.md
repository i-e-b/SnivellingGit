SnivellingGit
=============

[![Build status](https://ci.appveyor.com/api/projects/status/6k8rb18w3e3gagqs)](https://ci.appveyor.com/project/i-e-b/snivellinggit) An experimental GUI for the Git SCM.

### Todo

* angle limit of branching line
* only show complex ancestry lines on hover / select?
* filter dead branches and redundant tags (like remote heads and when remotes match local)
* Move head (checkout)
* Add files ; commit ; push
* fetch ; merge (probably best as separate?)
* stashes -- both loose on a shelf, and as 'fake commits' to allow moving head without losing work (stage and index as needed, with coded stash names?)
* show / hide unmerged remote branches (plus fetch all)
* Change visualisation settings
* flattened history by default (only unmerged branches spread out); Ancestry trace for indiviual commits (like gitk does); Per contributor display (column per person).

### Implementation details

* Make a reactive SVG generator, to do the rendering and add JS to re-align things post-measurement.
* select nodes with shift-click
* cherry-pick with ctrl-click
* rebase with ctrl-shift-click
* merge with context after selecting
* squash with context after selecting

Comparison of Sg with `gitk --all`
----------------------------------
Only unmerged branches are show out-of-line:
<img src="https://raw.githubusercontent.com/i-e-b/SnivellingGit/master/info/Simple%20comparison.png"/>

Commits are shown in strict time order, rather than ancestry order:
<img src="https://raw.githubusercontent.com/i-e-b/SnivellingGit/master/info/Time%20order%20vs%20ancestry%20order.png"/>

### References

* http://tonsky.me/blog/reinventing-git-interface/
* http://marklodato.github.io/visual-git-guide/index-en.html
* https://github.com/libgit2/libgit2sharp/wiki/LibGit2Sharp-Hitchhiker%27s-Guide-to-Git
