import BaseModule from "core/base-module"
import VozLiving from "content/runtime"
import QuoteMinification from "./component-quote-minification"

export default class ModuleQuoteMinification extends BaseModule{
    constructor(){
        super();

        this.quotes = [];
        this.vm = [];
        this.maxHeight = 200;
    }

    init(){
    	this.quotes = $('table.voz-bbcode-quote');

        this.vm = _.map(this.quotes, (quote) => {
            let parent = $(quote).parent();

            if(parent.height() > this.maxHeight){
                let quoteMinificationControl = $('<div class="vozl_quote_control"></div>');
                let mount = new QuoteMinification({data: { element: parent }});
            
                parent.append(quoteMinificationControl);
                mount.$mount(quoteMinificationControl[0]);
            }
        });
    }

    onDOMReady(){
        super.onDOMReady();
        
        if(VozLiving.isThreadPage)
            this.init();
    }
}