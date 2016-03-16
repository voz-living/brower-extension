import BaseModule from "core/base-module"
import VozLiving from "content/runtime"
import AddQuote from "./component-add-quote"

export default class ModuleQuoteHelper extends BaseModule{
    constructor(){
    	super();
    	this.editor = null;
    	this.editorCont = null;
    	this.quoteHelper = null;
	}

	init(){
		this.editor = $("#vB_Editor_QR_textarea");
        if(this.editor.length == 0) return;
        this.editorCont = this.editor.parents("#vB_Editor_QR").eq(0);
        if(this.editorCont.length == 0) return;
        this.toolbar = $("<div class='voz_living_quote_helper_toolbar'></div>")
        this.editorCont.append(this.toolbar);

        var href = $("a:has(>img[src*='images/buttons/reply.gif'])")[0].href;

        this.quoteHelper = new AddQuote({ data: { editor: this.editor, href: href }});
        this.quoteHelper.$mount(this.toolbar[0]);
	}

	onDOMReady(){
        super.onDOMReady();

        if(VozLiving.isThreadPage){
            this.init();
        }
    }
}