function isAbsolutUrl(url) {
    return startsWith(url, "http");
}

function startsWith(string, prefix) {
    return string.indexOf(prefix) === 0;
}

const urlRewriter={
    appContext: "",
    rewrite: function(requestedUrl) {
        let effectiveUrl = requestedUrl;
        if (!isAbsolutUrl(effectiveUrl) && !startsWith(effectiveUrl, this.appContext)) {
            effectiveUrl = this.appContext + "/" + effectiveUrl;
        }
        return effectiveUrl;
    }
};

var proxiedFetch = window.fetch ;
window.fetch = function(requestedUrl, init) {
    let effectiveUrl = urlRewriter.rewrite(requestedUrl);
    return proxiedFetch.apply(this, [effectiveUrl, init]);
};

export {urlRewriter};