const proxiedFetch = window.fetch ;
window.fetch = function(requestedUrl, init) {
    let methodParam;
    const metaElement=document.querySelector('meta[name="hiddenMethodParam"]');
    if(metaElement) {
        methodParam=metaElement.content;
    }else{
        methodParam="_method";
    }
    let requestedHttpMethod=init && init.method ? init.method : "GET";
    let effective={
        httpMethod: requestedHttpMethod,
        url: requestedUrl
    };
    if(requestedHttpMethod === "DELETE" || requestedHttpMethod === "PUT") {
        let queryParamSeparator;
        if(requestedUrl.indexOf("?") === -1){
            queryParamSeparator="?";
        }else{
            queryParamSeparator="&";
        }
        effective.url=requestedUrl+queryParamSeparator+methodParam+"="+requestedHttpMethod;
        effective.httpMethod="POST";
    }
    if(!init && effective.httpMethod !== "GET") {
        init={};
    }
    if(init) {
        init.method=effective.httpMethod;
    }
    return proxiedFetch.apply(this, [effective.url, init]);
};
