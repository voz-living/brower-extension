import {sendFunctionCall} from "shared/communication";

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
    },
    methods:{
        updateQuotes: function(quotes){
            this.quotes = quotes;
        },
        getQuoteList: function(){
            sendFunctionCall({function: "emitQuoteListToClient"})
        }
    }
});

class Quote{
    constructor(){

    }
}

export default ComponentQuoteNoti5List
