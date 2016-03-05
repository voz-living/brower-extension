import BaseRuntime from "core/base-runtime"

export default class BackgroundRuntime extends BaseRuntime {
    constructor(){
        super();
    }

    start(){
        this.modules.forEach((module) => {
            module.start();
        })
    }
}
