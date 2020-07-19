class HashLocationTracker {
        
    constructor() {
        this.registerByPattern={};
        window.addEventListener("hashchange", () => {
            this.matchNow();
        });
    }
    
    given(pattern){
        let registered={
            then: function(fn) {
                this.functionObject=fn;
            },
            invoke: function(matchResult) {
                if(this.functionObject) {
                    this.functionObject(matchResult);
                }
            }
        };
        this.registerByPattern["^"+pattern+"$"]=registered;
        return registered;
    }

    matchNow() {
        let hash=window.location.hash;
        console.log("hash: "+window.location.hash);
        for(let pattern in this.registerByPattern) {
            let matchResult=new RegExp(pattern).exec(hash);
            if(matchResult){
                this.registerByPattern[pattern].invoke(matchResult);
            }
        }
    }

}

const hashLocationTracker=new HashLocationTracker();

export {hashLocationTracker};
