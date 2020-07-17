(function(){
    const proxiedFetch = window.fetch;
    window.fetch = function(url, init) {
        document.dispatchEvent(
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
        promise.then((response) => {
            document.dispatchEvent(new CustomEvent("fetchComplete", {
                detail: {
                    url: url,
                    init: init,
                    response: response
                }
            }));
        }, (error) => {
            document.dispatchEvent(new CustomEvent("fetchFail", {
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