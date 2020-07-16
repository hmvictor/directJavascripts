function isAbsolutUrl(url) {
    return startsWith(url, "http");
}

function startsWith(string, prefix) {
    return string.indexOf(prefix) === 0;
}

let baseUrl="";

var proxiedFetch = window.fetch ;
window.fetch = function(requestedUrl, init) {
    let effectiveUrl = requestedUrl;
    let appContext = baseUrl;
    if (!isAbsolutUrl(effectiveUrl) && !startsWith(effectiveUrl, appContext)) {
        effectiveUrl = appContext + effectiveUrl;
    }
    return proxiedFetch.apply(this, [effectiveUrl, init]);
};

const urlWriter={
    appUrl: function(value){
        baseUrl=value;
    }
};

export default urlWriter;