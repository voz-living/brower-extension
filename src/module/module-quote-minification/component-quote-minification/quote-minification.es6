var QuoteMinification = Vue.extend({
    data: function(){
        return {
            element: null,
            isOpen: true,
        }
    },
    methods: {
        open: function(){
            if(this.element == null) return;
            this.isOpen = true;
            this.element.removeClass('voz_living_close');
        },
        close: function(){
            if(this.element == null) return;
            this.isOpen = false;
            this.element.addClass('voz_living_close');
        },
        toggle: function(){
            if(this.isOpen) this.close();
            if(!this.isOpen) this.open();
        },
        init: function(){
            if(this.element != null){
                this.element.addClass('voz_living_quote_minification');
                this.close();
            }
        }
    },
    attached: function(){
        require("./style.less");
    },
    created: function(){
        this.init();
    },
    template: require("./quote-minification.html"),
});

export default QuoteMinification