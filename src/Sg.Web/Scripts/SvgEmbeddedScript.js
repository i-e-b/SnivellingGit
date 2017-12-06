function sendClickToParentDocument(evt) {
    var target = evt.target;
    if (target.correspondingUseElement) target = target.correspondingUseElement;
    if (window.parent.svgElementClicked) window.parent.svgElementClicked(target, 'left', { x: evt.pageX, y: evt.pageY });
}
function ctxMenuClick(evt) {
    evt.preventDefault();
    var target = evt.target;
    if (target.correspondingUseElement) target = target.correspondingUseElement;
    if (window.parent.svgElementClicked) window.parent.svgElementClicked(target, 'right', { x: evt.pageX, y: evt.pageY });
}
function inject() {
    document.getElementById('svgroot').addEventListener('click', sendClickToParentDocument, true);
    document.getElementById('svgroot').addEventListener('contextmenu', ctxMenuClick, true);
}