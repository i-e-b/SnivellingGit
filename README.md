SnivellingGit
=============

An experimental GUI for the Git SCM.
To use, run the Sg.Web self-host exe, and then load the stated Url in your browser.
Remember to include a path to your target git directory (i.e. `C:\Work\MyProj` would need a url of `http://localhost:8080/Work/MyProj`)


### Immediate To Do

* extend log limit a bit further if branches don't line up?
  - url flag to set log limit?
* only show complex ancestry lines on hover / select?
* split HTML and SVG rendering?

* show common ancestor between two commits (on click, fade everything not directly connected?)
  - maybe do an 'exploded' view on select -- treat the selected node like it's own branch?

### Goals

* Move head (checkout)
* Add files ; commit ; push
* fetch ; merge (probably best as separate?)
* stashes -- both loose on a shelf, and as 'fake commits' to allow moving head without losing work (stage and index as needed, with coded stash names?)
* show / hide unmerged remote branches (plus fetch all)
* Change visualisation settings
* flattened history by default (only unmerged branches spread out); Ancestry trace for indiviual commits (like gitk does); Per contributor display (column per person).
* option to attribute-tag the last commit before a merge to show branch history?

### Implementation details

* Make a reactive SVG generator, to do the rendering and add JS to re-align things post-measurement.
* select nodes with shift-click
* cherry-pick with ctrl-click
* rebase with ctrl-shift-click
* merge with context after selecting
* squash with context after selecting

Comparison of Sg with `gitk --all`
----------------------------------
Only unmerged branches are shown out-of-line. Non simple ancestry shown with arcs to the side.
<img src="https://raw.githubusercontent.com/i-e-b/SnivellingGit/master/info/Simple%20comparison.png"/>

Commits are shown in strict time order, rather than ancestry order. Node colours are based on author's name.
<img src="https://raw.githubusercontent.com/i-e-b/SnivellingGit/master/info/Time%20order%20vs%20ancestry%20order.png"/>

### References

* http://tonsky.me/blog/reinventing-git-interface/
* http://marklodato.github.io/visual-git-guide/index-en.html
* https://github.com/libgit2/libgit2sharp/wiki/LibGit2Sharp-Hitchhiker%27s-Guide-to-Git
