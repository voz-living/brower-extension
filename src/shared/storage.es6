import {sendFunctionCall} from "shared/communication";

class BackgroundStorage {

    set(param, cb){
        var args = arguments;
        sendFunctionCall({
            function: "backgroundStorageSet",
            params: param
        }, function(rt){
            cb(rt.response);
        })
    }
    get(param, cb){
        var args = arguments;
        sendFunctionCall({
            function: "backgroundStorageGet",
            params: param
        }, function(rt){
            cb(rt.response);
        })
    }
}

export default class Storage{
    constructor(type="local",{prefix=""}={}){
        this.prefix = prefix;
        if(type=="local"){
            this.storage = this._getLocalStorage();
        }else if(type="sync"){
            if(chrome.storage && chrome.storage.sync/* || window.VOZLIVING_BACKGROUND !== true*/){
                this.storage = chrome.storage.sync;
            }else{
                console.log("WARNING: DO NOT SUPPORT SYNC STORAGE, SWITCH TO LOCAL STORAGE")
                this.storage = this._getLocalStorage();
            }
        }else {
            throw new Error(`Doest not support storage type ${type}`)
        }

    }

    _getLocalStorage(){
        if( chrome.storage && chrome.storage.local/* && window.VOZLIVING_BACKGROUND === true*/){
            return chrome.storage.local;
        }else{
            console.log("BackgroundStorage");
            return new BackgroundStorage();
        }
    }

    set(obj, val=null){
        var setObj = obj;
        var prefix = this.prefix;
        if(val!=null){
            setObj = {};
            setObj[obj] = val;
        }

        var sObj = {}
        _.forEach(setObj, (value, key) => {
            sObj[prefix + key] = value;
        })

        return new Promise((resolve, reject) => {
            this.storage.set(sObj, () => resolve(true))
        })
    }

    get(first, second=null){
        var obj = first;
        var prefix = this.prefix;
        var singleQuery = false;
        if(second!=null){
            if(_.isString(first)){
                obj = {};
                obj[prefix + first] = second
                singleQuery = true;
            }else{
                throw new Error("storage.get: when you get item from storage with default value in the second parameter, first parameter must be a (String) key");
            }
        }else{
            if(_.isArray(first)){
                obj = [];
                first.forEach((key) => obj.push(prefix + key));
            }else if(_.isObject(first)){
                obj = {};
                _.forEach(first, (value, key) => obj[prefix+key] = value)
            }else if(_.isString(first)){
                obj = prefix+first;
                singleQuery = true;
            }else{
                throw new Error("storage.get: first parameter must be a object or array")
            }
        }

        return new Promise((resolve, reject) => {
            this.storage.get(obj, (ret) => {
                var val = ret;
                if(singleQuery){
                    val=ret[prefix+first]
                }else{
                    val = {};
                    _.forEach(ret, (item, key) => {
                        val[key.replace(prefix, "")] = item
                    });
                }
                resolve(val);
            })
        })
    }
}

var authStorage = new Storage("sync", {prefix: "auth_"});
var settingStorage = new Storage("sync", {prefix: "setting_"});
export { authStorage, settingStorage };
