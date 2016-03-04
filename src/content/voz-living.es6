import BaseEvent from "core/base-event"

export default class VozLiving extends BaseEvent {
    constructor(){
        super();
        // when dom ready
        $( document ).ready(() => {
            this.emit("DOMReady", new Date());
        });

        this.modules = [];
    }

    test(){
        console.log("Test");
    }

    loadModule(Module){
        var module = new Module();
        this.modules.push(module);
    }
}
