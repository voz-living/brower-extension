import {sendFunctionCall} from "shared/communication";

var __waitForRequest = false;
var ComponentQuoteNoti5List = Vue.extend({
    template: require("./template.html"),
    data: function(){
        return {
            quotes: []
        }
    },
    attached: function(){
        require("./style.less");
        this.$on("selected", () => {
            this.getQuoteList();
        })
        sendFunctionCall({function: "emitUnseenQuotesCount"});
    },
    methods:{
        updateQuotes: function(quotes){
            this.quotes = quotes;
            if(__waitForRequest == true){
                __waitForRequest = false;
                this.sendSeenQuotes(quotes);
            }
        },

        getQuoteList: function(){
            __waitForRequest = true;
            sendFunctionCall({function: "emitQuoteListToClient"});
        },

        sendSeenQuotes: function(quotes){
            sendFunctionCall({function: "updateSeenQuotes", params: quotes});
        }
    }
});

class Quote{
    constructor(){

    }
}

export default ComponentQuoteNoti5List
