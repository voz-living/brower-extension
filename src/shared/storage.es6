export default class Storage{
    constructor(type="local",{prefix=""}={}){
        if(type=="local"){
            this._get = (item, defaultValue=null) => {
                item = prefix + item;
                var value = localStorage.getItem(item);
                if(value == null && defaultValue != null){
                    value = defaultValue;
                    this._set(item, value);
                }
                return value;
            };

            this._set = (item, value) => localStorage.setItem(prefix + item, value)
        }
    }

    set(){
        return this._set.apply(this, arguments);
    }

    get(){
        return this._get.apply(this, arguments);
    }
}
