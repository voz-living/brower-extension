var EventEmitter = require("event-emitter");

export default class BaseEvent {
    constructor(){
        this.__ee = new EventEmitter({});
    }

    on(event, fn){
        var _fn = fn.bind(this);
        this.__ee.on(event, _fn);
        return _fn;
    }

    once(event, fn){
        var _fn = fn.bind(this);
        this.__ee.once(event, _fn);
        return _fn;
    }

    off(event, fn){
        this.__ee.off(event, fn);
    }

    emit(){
        this.__ee.emit(...arguments);
    }
}
