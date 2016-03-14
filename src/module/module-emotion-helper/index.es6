import BaseModule from "core/base-module"
import EmotionPicker from "./component-emotion-picker"
var VozLiving = require("content/runtime");

export default class ModuleEmotionHelper extends BaseModule{
    constructor(){
        super();
        this.isQuickMode = true;
        this.editor = null;
        this.smileCont = null;
        this.smileBox = null;
        this.emotionPicker = null;
    }

    init(){
        this.editor = $("#vB_Editor_001_textarea");
        this.smileBox = $("<div class='smilebox'></div>");

        if(this.editor.length > 0){
            this.isQuickMode = false;
            this.smileCont = $("#vB_Editor_001_smiliebox");
        }else{
            this.editor = $("#vB_Editor_QR_textarea");
            if(this.editor.length == 0) return;
            this.smileCont = this.editor.parents("#vB_Editor_QR").eq(0);
            if(this.smileCont.length == 0) return;
        }

        this.smileCont.append(this.smileBox);
        this.smilebox = this.smileCont.find(".smilebox");
        this.emotionPicker = new EmotionPicker({ data: { editor: this.editor }});
        this.emotionPicker.$mount(this.smileBox[0]);
    }

    onDOMReady(){
        super.onDOMReady();

        if(VozLiving.isThreadPage){
            this.init();
        }
    }
}
