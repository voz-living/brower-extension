import BaseModule from "core/base-module"
import ComponentBarItem from "./component-bar-item"
var VozLiving = require("content/runtime");

export default class ModuleTopBar extends BaseModule{
    constructor(){
        super();

        this.vm = new Vue({
			template: require("./template.html"),
			data: {
				message: ""
			},
			methods: {

			},
            components: {
                "bar-item": ComponentBarItem
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
