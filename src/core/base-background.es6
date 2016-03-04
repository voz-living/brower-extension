import BaseEvent from "core/base-event";

export default class BaseBackground extends BaseEvent {
    constructor(){
        super();

        // VozLiving.once("readyToStart", this.start.bind(this));
    }

    start(){
        var className = this.constructor.name;
        console.log(`Module ${className}: start()`);
    }
}
