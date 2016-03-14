export default class Storage{
    constructor(type="local",{prefix=""}={}){
        this.prefix = prefix;
        if(type=="local"){
            this.storage = chrome.storage.local;
        }else if(type="sync"){
            if(_.isUndefined(chrome.storage.sync)){
                console.log("WARNING: DO NOT SUPPORT SYNC STORAGE, SWITCH TO LOCAL STORAGE")
                this.storage = chrome.storage.local;
            }else{
                this.storage = chrome.storage.sync;
            }
        }else {
            throw new Error(`Doest not support storage type ${type}`)
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
