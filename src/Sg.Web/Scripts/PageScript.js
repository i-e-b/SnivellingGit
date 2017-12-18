'use strict';

// Read query string into object
var QueryString = function () {
    if (!window.location.search || !window.location.search.substr(1)) return {};

    var a = window.location.search.substr(1).split('&');
    if (!a || a.length < 1) return {};
    var b = {};
    for (var i = 0; i < a.length; ++i) {
        var p = a[i].split('=', 2);
        b[p[0]] = p.length === 1 ? "" : decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
}();

// This function is triggered by the SVG script in "SvgEmbeddedScript.js"
// e -> element clicked; btn -> mouse button pressed: 'left' or 'right'; loc -> {x,y} on page where the click happened
function svgElementClicked(e, btn, loc) {
    if (e && e.id && e.id.length > 20) {
        selectCommit(e.id);
    } else if (e == null) {
        delete QueryString.show; // de-select
        loadGraph();
        loadHeaders();
    } else if (e.id === "PageUp" || e.id === "PageDown") {
        UpdatePaging(e.id);
    } else {
        return; // a real click, but not on anything interesting
    }
}

function UpdatePaging(dir) {
    var offs = (QueryString["limit"] || 500) | 0;
    offs = Math.max(1, offs / 2);
    if (dir === "PageUp") offs = -offs;


    QueryString["start"] = Math.max(0, (QueryString["start"]|0) + offs);
    loadGraph();
}

function selectCommit(shaId) {
    QueryString["show"] = shaId;
    loadGraph();
    loadHeaders();
}

// Read and replace the control headers
function loadHeaders() {
    var logBox = document.getElementById('log');
    var logContent = logBox.innerHTML; // preserve existing log
    var logClass = logBox.className;
    loadSelfReference("controlHost", "repo-controls", function () {
        var newLog = document.getElementById('log');
        newLog.innerHTML = logContent;
        newLog.className = logClass;
    });
}

// Read and replace the SVG graph
function loadGraph() {
    loadSelfReference("svgroot", "render-svg", function () {
        // resize the outer SVG to match the inner
        var outer = document.getElementById('svgroot');
        var inner = outer.getElementById('svgroot');
        outer.setAttribute('width', inner.getAttribute('width'));
        outer.setAttribute('height', inner.getAttribute('height'));
    });
}

// Request a git command, populate the log and refresh the graph and headers
function gitAction(actionCommand, target) {
    var logBox = document.getElementById('log');
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4) {
            logBox.className = (this.status === 200) ? ("logSuccess") : ("logFailure");
            logBox.innerHTML = this.responseText;

            loadGraph();
            loadHeaders();
        }
    };
    logBox.className = "";
    logBox.innerHTML = "Processing";
    if (target) {
        xhttp.open("GET", "?command=" + actionCommand + "&target=" + target, true);
    } else {
        xhttp.open("GET", "?command=" + actionCommand, true);
    }
    xhttp.send();
}

function loadSelfReference(targetElementId, request, actionOnDone) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status !== 200) { console.dir(this); return; }
            document.getElementById(targetElementId).innerHTML = this.responseText;
            if (actionOnDone) actionOnDone();
        }
    };
    xhttp.open("GET", queryString({command:request}), true);
    xhttp.send();
}

// Prepare a new query string from the current settings
// These are a mix of the incoming query overwritten with any interactive changes.
function queryString(additional) {
    var qry = QueryString;
    var keys = Object.keys(qry);

    var comb = "?";
    var output = "";
    var i;
    for (i = 0; i < keys.length; i++) {
        output += comb + keys[i] + "=" + qry[keys[i]];
        comb = "&";
    }

    if (additional) {
        keys = Object.keys(additional);
        for (i = 0; i < keys.length; i++) {
            output += comb + keys[i] + "=" + additional[keys[i]];
            comb = "&";
        }
    }

    return output;
}