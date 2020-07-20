function isAbsolutUrl(url) {
    return startsWith(url, "http");
}

function startsWith(string, prefix) {
    return string.indexOf(prefix) === 0;
}

const urlRewriter={
    prefix: null,
    rewrite: function(requestedUrl) {
        let effectiveUrl = requestedUrl;
        let effectivePrefix;
        const metaElement=document.querySelector('meta[name="fetchUrlPrefix"]');
        if(metaElement) {
            effectivePrefix=metaElement.content;
        }
        if(this.prefix) {
            effectivePrefix=this.prefix;
        }
        if(effectivePrefix) {
            if (!isAbsolutUrl(effectiveUrl) && !startsWith(effectiveUrl, effectivePrefix)) {
                effectiveUrl = effectivePrefix + "/" + effectiveUrl;
            }
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