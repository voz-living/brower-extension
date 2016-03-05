export default class Storage{
    constructor(type="local",{prefix=""}={}){
        this.prefix = prefix;
        if(type=="local"){
            this.storage = chrome.storage.local;
        }else if(type="sync"){
            this.storage = chrome.storage.sync;
        }else {
            throw new Error(`Doest not support storage type ${type}`)
        }
    }

    set(obj, val=null){
        var setObj = obj;
        var prefix = this.prefix;
        if(val!=null){
            setObj = {};
            setObj[prefix+obj] = val;
        }
        if(this.prefix != ""){
            _.forEach(obj, (value, key) => {
                setObj[prefix + key] = value;
            })
        }
        return new Promise((resolve, reject) => {
            this.storage.set(setObj, () => resolve(true))
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
                    _.forEach(obj, (item, key) => val[key.replace(prefix, "")] = item);
                }
                resolve(val);
            })
        })
    }
}
