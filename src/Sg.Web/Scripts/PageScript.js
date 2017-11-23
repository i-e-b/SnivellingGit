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
function svgElementClicked(e) {
    if (e.id && e.id.length > 20) {
        QueryString["show"] = e.id;
        loadGraph();
        loadHeaders();
    }
}

// Read and replace the control headers
function loadHeaders() {
    loadSelfReference("controlHost", "repo-controls");
}

// Read and replace the SVG graph
function loadGraph() {
    loadSelfReference("svgroot", "render-svg");
}

// Request a git command, populate the log and refresh the graph and headers
function gitAction(actionCommand) {
    var logBox = document.getElementById('log');
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4) {
            logBox.className = (this.status === 200) ? ("logSuccess") : ("logFailure");
            logBox.innerHTML = this.responseText;

            loadGraph();
        }
    };
    logBox.className = "";
    logBox.innerHTML = "Processing";
    xhttp.open("GET", "?command=" + actionCommand, true);
    xhttp.send();
}

function loadSelfReference(targetElementId, request) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4) {// && this.status === 200) {
            document.getElementById(targetElementId).innerHTML = this.responseText;
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