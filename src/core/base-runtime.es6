import BaseEvent from "core/base-event"

export default class BaseRuntime extends BaseEvent {
    constructor(){
        super();
        this.modules = [];
    }

    loadModule(Module){
        var module = new Module();
        this.modules.push(module);
    }

    loadModules(){
        _.forEach(arguments, (module) => this.loadModule(module));
    }
}
