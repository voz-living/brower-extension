var EventEmitter = require("event-emitter");

export default class VozLiving extends EventEmitter {
    constructor(){
        super({});
        // when dom ready
        $( document ).ready(() => {
            this.emit("DOMReady", new Date());
        });
    }

    test(){
        console.log("Hello")
    }
}
