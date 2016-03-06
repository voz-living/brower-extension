import BaseRuntime from "core/base-runtime"
import Storage from "shared/storage"

export default class BackgroundRuntime extends BaseRuntime {
    constructor(){
        super();
        this.authStorage = new Storage("sync", {prefix: "auth_"});

        this.registerFunction("setAuthenticationInfo", this._setAuthenticationInfo.bind(this));
        
    }

    start(){
        this.modules.forEach((module) => {
            module.start();
        })
    }

    _setAuthenticationInfo(obj){
        // securitytoken
        // username
        // isLogin
        this.authStorage.set(obj);
        console.log("Authentication updated", obj);
    }
}
