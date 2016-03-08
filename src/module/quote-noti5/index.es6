import BaseModule from "core/base-module"
var VozLiving = require("content/runtime");

export default class ModuleQuoteNoti5 extends BaseModule{
    constructor(){
        super();

        VozLiving.registerFunction("updateQuotes", this._updateQuotes.bind(this));
    }

    onDOMReady(){
        super.onDOMReady();
    }

    _updateQuotes(quotes){
        VozLiving.moduleAlias.topBar.vm.$refs.quotenoti5list.updateQuotes(quotes);
    }
}
