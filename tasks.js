export {Task};

class Task {
    
    constructor(fn) {
        this.fn = fn;
        this.executing=false;
        this.result={
            value: null,
            error: null
        };
    }
    
    isExecuting() {
        return this.executing;
    }
    
    reset() {
        this.executing=false;
        this.result={
            value: null,
            error: null
        };
    }
    
    start(...args) {
        this.executing=true;
        this.result={
            value: null,
            error: null
        };
        this.fn.apply(null, args).then(r => {
            this.executing=false;
            this.result={
                value: r,
                error: null
            };
        }, jqXHR => {
            this.executing=false;
            try{
                this.result={
                    value: null, 
                    errorMessages: JSON.parse(jqXHR.responseText).messages
                };
            }catch (error){
                
            }
        });
    }
  
}