function sendClickToParentDocument(evt) {
    var target = evt.target;
    if (target.correspondingUseElement) target = target.correspondingUseElement;
    if (window.parent.svgElementClicked) window.parent.svgElementClicked(target);
}
function inject() {
    document.getElementById('svgroot').addEventListener('click', sendClickToParentDocument, true);
}