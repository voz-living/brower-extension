import BaseModule from "core/base-module"
import {settingStorage} from "shared/storage"

import removeAds from "./remove-ads"
import wideScreen from "./wide-screen"

var html =`<div id="voz_living_splash_wrapper">
    <style>
    #voz_living_splash{
        position: fixed;
        z-index:999999;
        background: black;
        width: 100%;
        height: 100%;
        top:0;
        left:0;
        background-repeat: no-repeat;
        background-attachment: fixed;
    }
    </style>
    <div id="voz_living_splash" style="">
    </div>
</div>
`

export default class ModuleMisc extends BaseModule{
    constructor(){
        super();
        $("html").append(html)
        console.log("#1");
    }

    onDOMReady(){
        super.onDOMReady();

        removeAds();
        wideScreen(settingStorage);
        requestAnimationFrame(() => {
            setTimeout(() => {
                $("#voz_living_splash").hide();
            }, 100)
        })
    }
}
