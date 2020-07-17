export {Task};

class Task {
    
    constructor(description, promiseFn) {
        this.description=description;
        this.promiseFn = promiseFn;
        this.listeners={
            "start": [],
            "complete": [],
            "fail": []
        };
        this.status=Task.Status.NOT_RUNNING;
    }
    
    addEventListener(eventName, fn){
        this.listeners[eventName].push(fn);
    }
    
    removeEventListener(eventName, fn){
        this.listeners[eventName].remove(fn);
    }
    
    dispatchEvent(event) {
        for(let listener of this.listeners[event.type]) {
            listener(event);
        }
    }
    
    start(...args) {
        this.status=Task.Status.RUNNING;
        this.dispatchEvent(new CustomEvent("start"));
        return new Promise((resolve, reject)=> {
            this.promiseFn.apply(null, args)
                .then(result => {
                    this.status=Task.Status.NOT_RUNNING;
                    this.dispatchEvent(new CustomEvent("complete"));
                    resolve(result);
                }, error => {
                    this.status=Task.Status.NOT_RUNNING;
                    this.dispatchEvent(new CustomEvent("fail"));
                    reject(error);
                });
        });
    }
  
}

let RUNNING=Symbol("RUNNING");
let NOT_RUNNING=Symbol("NOT RUNNING");

Task.Status={
    RUNNING: RUNNING,
    NOT_RUNNING: NOT_RUNNING
};
