import BaseModule from "core/base-module"
import VozLiving from "content/runtime"

export default class ModuleQuoteHelper extends BaseModule{
    constructor(){
    	super();
	}

	init(){
		var editorQuick = $("#vB_Editor_QR_textarea");
        var editorWrap = editorQuick.parents("#vB_Editor_QR").eq(0);
        var $Toolbar = $("<div class='controlbar cmnw'></div>");
        editorWrap.append($Toolbar);
        var $btnLoadQ = $("<a href='javascript:;' class='btn' title='Chèn các trích dẫn đã đánh dấu'>Load Quotes</a>")
        var $btnClearQ = $("<a href='javascript:;' class='btn' title='Xóa các trích dẫn đã đánh dấu'>Del Qs</a>")
        $Toolbar.append($btnLoadQ)
        $Toolbar.append($btnClearQ)
	}

	onDOMReady(){
        super.onDOMReady();

        if(VozLiving.isThreadPage){
            this.init();
        }
    }
}