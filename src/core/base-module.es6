import BaseEvent from "core/base-event";
var VozLiving = require("content/runtime");

export default class BaseModule extends BaseEvent {
    constructor(){
        super();
        VozLiving.once("DOMReady", this.onDOMReady.bind(this));
    }

    get name(){
        return null
    }

    onDOMReady(){
        var className = this.constructor.name;
        console.log(`Module ${className}: onDOMReady()`);
    }
}
