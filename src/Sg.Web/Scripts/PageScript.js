function svgElementClicked(e) {
    if (e.id && e.id.length > 20) {
        window.location.href = '?show=' + e.id;
    }
}