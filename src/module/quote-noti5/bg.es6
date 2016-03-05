import BaseBackground from "core/base-background"
import Storage from "shared/storage"

export default class BGModuleQuoteNoti5 extends BaseBackground{
    constructor(){
        super();
        this.storage = new Storage("local", {prefix: "noti5_"});
        this.authStorage = new Storage("sync", {prefix: "auth_"});
    }

    async start(){
        super.start();

        // test storage
        var _t = await this.storage.set({a: 5, b: 6});
        var mytest = await this.storage.get({a: 1, b: 2, c: 3});

        console.log(mytest);

        var timeoutId = null;
        var timeout = 10000;
        var url = "https://vozforums.com/search.php";
        var formData = {
            do: "process",
            quicksearch: 1,
            childforums: 1,
            exactname: 1,
            securitytoken: null,
            query: null,
            showposts: 1
        }
    }

    _setToken(token){
        this.authStorage.set("securitytoken", token)
    }

    _setUsernameAndToken(username, token){
        this.authStorage.set("username", username);
        this.authStorage.set("isLogin", "true");
        this.authStorage.set("securitytoken", token);
    }

    _saveQuotes(data){
        this.storage.set("quotes", JSON.stringify(data));
    }

    _getQuotes(){
        var quotes = this.storage.get("quotes")

        if (quotes == null) quotes = "[]";
        quotes = JSON.parse(quotes);

        var data = {
            quotes: quotes,
            length: quotes.length
        }

        return data;
    }

    _updateQuotes(quotes) {
        var stQuotes = JSON.parse(this.storage.get("quotes"));
        for (var i = 0; i < quotes.length; i++) {
            for (var j = 0; j < stQuotes.length; j++) {
                if (stQuotes[j].post.id == quotes[i].post.id) {
                    stQuotes[j] = $.extend(true, {}, stQuotes[j], quotes[i]);
                    break;
                }
            }
        }
        this._saveQuotes(stQuotes);
        return stQuotes.length;
    }

    _checksave(data) {
        var hasChanged = false;
        var oldQuotes = JSON.parse(this.storage.get("quotes"));

        if (oldQuotes != null) {
            for (var i = 0; i < data.length; i++) {
                var quote = data[i];
                for (var j = 0; j < oldQuotes.length; j++) { // compare to all old storage quote
                    var oldQuote = oldQuotes[j]; // reference one
                    if (quote.post.id == oldQuote.post.id) { // if same post id.
                        data[i] = $.extend({}, oldQuote); //copy old to new
                        break; // break the loop
                    }
                }
//            if there is new quote, flag hasChange
                if (j == oldQuotes.length) {
                    hasChanged = true;
//                    TODO: notification here
                }
            }
        } else {
            hasChanged = true;
        }

        if (hasChanged) { // Only save to localstorage if there is changes.
            console.log("Quotes have changed", data)
            this._saveQuotes(data);
            msgHelper.callFunction("updateQuotes", this._getQuotes());
        }
    }
}
