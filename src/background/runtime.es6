import BaseRuntime from "core/base-runtime"
import Storage from "shared/storage"

export default class BackgroundRuntime extends BaseRuntime {
    constructor(){
        super();
        this.authStorage = new Storage("sync", {prefix: "auth_"});

        this.registerFunction("setAuthenticationInfo", this._setAuthenticationInfo.bind(this));
        this.registerFunction("backgroundStorageSet", this._backgroundStorageSet.bind(this));
        this.registerFunction("backgroundStorageGet", this._backgroundStorageGet.bind(this));

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
        return Promise.resolve(true);
    }

    _backgroundStorageSet(params){
        return new Promise(function(resolve){
            chrome.storage.local.set.call(chrome.storage.local, params, function(){
                resolve(true)
            });
        });
    }

    _backgroundStorageGet(params){
        return new Promise(function(resolve){
            chrome.storage.local.get.call(chrome.storage.local, params, function(rt){
                resolve(rt)
            });
        });
    }
}
