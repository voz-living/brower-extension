import BaseModule from "core/base-module"
import ComponentBarItem from "./component-bar-item"
import ComponentQuoteNoti5List from "module/quote-noti5/quote-noti5-list";

var VozLiving = require("content/runtime");

export default class ModuleTopBar extends BaseModule{
    constructor(){
        super();

        var self = this;

        this.vm = new Vue({
			template: require("./template.html"),
			data: {
				message: "",
                selected: null
			},
			methods: {

			},
            components: {
                "bar-item": ComponentBarItem,
                "quote-noti5-list": ComponentQuoteNoti5List
            },
            attached: () => {

                $(".voz_living_top_bar").on("click", ".voz_living_top_bar_item .item_icon_wrapper", function(){
                    var $this = $(this).parent();
                    var id = $this.attr("id");
                    if($this.hasClass("selected")){
                        $this.removeClass("selected")
                        $("#voz_living_backdrop").hide();
                    }else{
                        $(".voz_living_top_bar_item").removeClass("selected");
                        $this.addClass("selected");
                        self.vm.$refs[id].$emit("selected");
                        $("#voz_living_backdrop").show();
                    }
                })
                $("#voz_living_backdrop").on("click", function(){
                    $(".voz_living_top_bar_item").removeClass("selected");
                    $("#voz_living_backdrop").hide();
                })
            }
		});
    }

    get name(){
        return "topBar";
    }

    _mountVM(){
        this.vm.$mount($("#voz_living_top_bar_placeholder")[0])
    }

    onDOMReady(){
        super.onDOMReady();
        require("./style.less");
        $(document.body).prepend("<div id='voz_living_top_bar_placeholder'></div>");
        this._mountVM();
    }
}
