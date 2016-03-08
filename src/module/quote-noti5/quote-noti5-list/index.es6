var ComponentQuoteNoti5List = Vue.extend({
    template: require("./template.html"),
    data: function(){
        return {
            quotes: []
        }
    },
    attached: function(){
        require("./style.less");
    },
    methods:{
        updateQuotes: function(quotes){
            this.quotes = quotes;
        }
    }
});

class Quote{
    constructor(){

    }
}

export default ComponentQuoteNoti5List
