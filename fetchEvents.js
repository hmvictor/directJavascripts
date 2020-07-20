const proxiedFetch = window.fetch;
window.fetch = function(url, init) {
    window.dispatchEvent(
        new CustomEvent(
            "fetchStart", 
            {
                detail: {
                    url: url,
                    init: init
                }
            }
        )
    );
    const promise=proxiedFetch.apply(this, arguments);
    promise.then(response => {
        if(response.ok) {
            window.dispatchEvent(
                new CustomEvent("fetchResponseSuccess", {
                    detail: {
                        url: url,
                        init: init,
                        response: response
                    }
                }));
        } else if(response.status >= 400 && response.status < 600) {
            window.dispatchEvent(
                new CustomEvent("fetchResponseError", {
                    detail: {
                        url: url,
                        init: init,
                        response: response
                    }
                }));
        }
        window.dispatchEvent(
            new CustomEvent("fetchComplete", {
                detail: {
                    url: url,
                    init: init,
                    response: response
                }
            }));
    }, error => {
        window.dispatchEvent(
            new CustomEvent("fetchError", {
                detail: {
                    url: url,
                    init: init,
                    error: error
                }
            }));
        window.dispatchEvent(
            new CustomEvent("fetchComplete", {
                detail: {
                    url: url,
                    init: init,
                    error: error
                }
            }));
    });
    return promise;
};