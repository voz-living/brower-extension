import BaseModule from "core/base-module"
var VozLiving = require("content/runtime");

export default class ModuleQuoteNoti5 extends BaseModule{
    constructor(){
        super();

        VozLiving.registerFunction("updateQuotes", this._updateQuotes.bind(this));
        VozLiving.registerFunction("updateUnseenQuotesCount", this._updateUnseenQuotesCount.bind(this));
    }

    onDOMReady(){
        super.onDOMReady();
    }

    _updateQuotes(quotes){
        var nav = VozLiving.moduleAlias.topBar;

        var unSeenCount = quotes.filter((q) => q.hasSeen == false).length;
        nav.vm.$refs.quote_noti5.badgeNum = unSeenCount;
        nav.vm.$refs.quotenoti5list.updateQuotes(quotes);
        return Promise.resolve(true);
    }

    _updateUnseenQuotesCount(count){
        var nav = VozLiving.moduleAlias.topBar;
        nav.vm.$refs.quote_noti5.badgeNum = count;
        return Promise.resolve(true);
    }
}
