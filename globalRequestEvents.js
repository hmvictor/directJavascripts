(function(){
    const proxiedFetch = window.fetch;
    window.fetch = function(url, init) {
        document.dispatchEvent(
            new CustomEvent(
                "fetchStarted", 
                {
                    detail: {
                        url: url,
                        init: init
                    }
                }
            )
        );
        const promise=proxiedFetch.apply(this, arguments);
        promise.then((response) => {
            document.dispatchEvent(new CustomEvent("fetchCompleted", {
                detail: {
                    url: url,
                    init: init,
                    response: response
                }
            }));
        }, (error) => {
            document.dispatchEvent(new CustomEvent("fetchFailed", {
                detail: {
                    url: url,
                    init: init,
                    error: error
                }
            }));
        });
        return promise;
    };
})();