import BaseRuntime from "core/base-runtime"

export default class VozLiving extends BaseRuntime {
    constructor(){
        super();

        $( document ).ready(() => {
            this.emit("DOMReady", new Date());
        });
    }
}
