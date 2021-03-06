import BaseBackground from "core/base-background"
import Storage, {authStorage, settingStorage} from "shared/storage"
import {sendInfo, sendFunctionCall} from "shared/communication"

export default class BGModuleQuoteNoti5 extends BaseBackground{
    constructor(){
        super();
        this.storage = new Storage("local", {prefix: "noti5_"});

        this.timeoutId = null;
        this.timeout = 10000;

        runtime.registerFunction("emitQuoteListToClient", this._emitQuoteListToClient.bind(this));
        runtime.registerFunction("emitUnseenQuotesCount", this._emitUnseenQuotesCount.bind(this));
        runtime.registerFunction("updateSeenQuotes", this._updateSeenQuotes.bind(this));
    }

    async start(){
        super.start();

        // test storage
        var _t = await this.storage.set({a: 5, b: 6});
        var mytest = await this.storage.get({a: 1, b: 2, c: 3});

        console.log(mytest);

        this._run();
    }

    _saveQuotes(data){
        this.storage.set("quotes", data);
    }

    async _getQuotes(){
        var quotes = await this.storage.get("quotes")

        if (quotes == null) quotes = [];
        quotes = quotes;

        return Promise.resolve(quotes);
    }

    async _updateSeenQuotes(quotes) {
        var stQuotes = await this.storage.get("quotes");
        for (var i = 0; i < quotes.length; i++) {
            for (var j = 0; j < stQuotes.length; j++) {
                if (stQuotes[j].post.id == quotes[i].post.id) {
                    // stQuotes[j] = _.assign(stQuotes[j], quotes[i]);
                    stQuotes[j].hasSeen = true;
                    break;
                }
            }
        }

        this._saveQuotes(stQuotes);
        this._pushUnseenCount();
        return Promise.resolve(stQuotes.length);
    }

    async _emitUnseenQuotesCount(){
        this._pushUnseenCount();
        return Promise.resolve(true)
    }

    async _pushUnseenCount(){
        var quotes = await this.storage.get("quotes");
        var count = quotes.filter((q) => q.hasSeen == false).length;
        sendFunctionCall({
            function: "updateUnseenQuotesCount",
            params: count
        });
        return Promise.resolve(true);
    }

    async _emitQuoteListToClient(){
        var quotes = await this._getQuotes();
        sendFunctionCall({
            function: "updateQuotes",
            params: quotes
        });

        return Promise.resolve(true)
    }

    async _checksave(data) {
        var hasChanged = false;
        var oldQuotes = await this.storage.get("quotes");

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
                // if there is new quote, flag hasChange
                if (j == oldQuotes.length) {
                    hasChanged = true;
                    // TODO: notification here
                }
            }
        } else {
            hasChanged = true;
        }

        if (hasChanged) { // Only save to storage if there is changes.
            console.log("Quotes have changed", data)
            this._saveQuotes(data);
            sendFunctionCall({
                function: "updateQuotes",
                params: data
            });
        }
        return Promise.resolve(true);
    }

    _process(html){
        var $html, $threads_link, data;
        html = html.replace(/[\w_/]+\.gif/g, "javascript:void(0)");
        $html = $(html);
        data = [];

        $threads_link = $html.find("td > div > a[href^='showthread']");

        if ($threads_link.length === 0) {
            return data;
        }

        $threads_link.each(function () {
            var $pexcerpt, $post_link, $this, $user_a, datemod, dateoffset, datestr, datetime, now, pDateTime, pPost, pUser, pWhere, pexcerpt, pid, ptitle, sDatetime, sDatetime_es, tid, ttitle, uid, username;
            try {
                $this = $(this);
                tid = $this.attr("href").match(/t=(\d+)/)[1];
                ttitle = $this.text();
                $post_link = $this.parents("td:eq(0)").find(" > div > div  a[href^='showthread'][href*='p=']");
                pid = $post_link.attr("href").match(/p=(\d+)/)[1];
                ptitle = $post_link.text();
                $pexcerpt = $post_link.parent();
                $post_link.remove();
                pexcerpt = $pexcerpt.text().trim();
                $user_a = $this.parents("td:eq(0)").find(" > div > a[href^='member'] ");
                username = $user_a.text();
                uid = $user_a.attr("href").match(/u=(\d+)/)[1];
                sDatetime = $this.parents("tbody:eq(0)").find(" > tr:eq(0) td").contents().last().text().trim();
                sDatetime_es = sDatetime.split(/[-,:]/);
                if (sDatetime_es.length === 3) {
                    datestr = ['today', 'yesterday'];
                    dateoffset = datestr.indexOf(sDatetime_es[0].toLowerCase());
                    if (dateoffset > -1) {
                        now = new Date();
                        datemod = now.getDate() - dateoffset;
                        datetime = new Date(parseInt(now.getFullYear()), now.getMonth(), datemod, parseInt(sDatetime_es[1]), parseInt(sDatetime_es[2]), 0);
                    }
                } else {
                    datetime = new Date(parseInt(sDatetime_es[2]), parseInt(sDatetime_es[1] - 1), parseInt(sDatetime_es[0]), parseInt(sDatetime_es[3]), parseInt(sDatetime_es[4]), 0);
                }
                data.push({
                    author: {
                        username: username,
                        userid: uid
                    },
                    thread: {
                        title: ttitle,
                        id: tid
                    },
                    post: {
                        title: ptitle,
                        id: pid,
                        content: pexcerpt,
                        datetime: datetime.getTime()
                    },
                    hasRead: false,
                    hasSeen: false
                })
            } catch (e) {
                debugger;
            }
        });
        return data;
    }

    async _rerun(){
        var quoteNoti5Interval = await settingStorage.get("quoteNoti5Interval", 30);
        this.timeoutId = setTimeout(this._run.bind(this), quoteNoti5Interval*1000);
        return Promise.resolve(true);
    }

    async _run(){
        var isActive = await settingStorage.get("quoteNoti5Active", true);
        if(!isActive) return this._rerun();

        var {username, securitytoken} = await authStorage.get({
            username: null,
            securitytoken: null
        });

        var formData = {
            do: "process",
            quicksearch: 1,
            childforums: 1,
            exactname: 1,
            securitytoken: null,
            query: null,
            showposts: 1
        }

        var url = "https://vozforums.com/search.php";

        if (username != null && securitytoken != null) {
            var cpFD = $.extend({}, formData);
            cpFD.securitytoken = securitytoken;
            cpFD.query = username;
            $.ajax({
                url: url,
                type: "POST",
                data: cpFD,
                success: (html) => {
                    var data = this._process(html);
                    this._checksave(data);
                    return this._rerun();
                },
                error: () => {
                    console.log("request quotes failed");
                    return this._rerun();
                }
            })
        } else {
            console.log(`Either username or securitytoken is empty`, username, securitytoken)
            return this._rerun();
        }

        return Promise.resolve(true);
    }
}
