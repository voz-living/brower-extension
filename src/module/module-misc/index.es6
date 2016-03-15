import BaseModule from "core/base-module"
import {settingStorage} from "shared/storage"

import removeAds from "./remove-ads"
import wideScreen from "./wide-screen"

var html =`<div id="voz_living_splash_wrapper">
    <style>
    #voz_living_splash{
        position: fixed;
        z-index:999999;
        background: #506590;
        width: 100%;
        height: 100%;
        top:0;
        left:0;
        background-repeat: no-repeat;
        background-attachment: fixed;
        background-image: -webkit-radial-gradient(center, ellipse cover, #506590 0%, #323368 100%);
    }

    #voz_living_loader_container {
      width: 70px;
      height: 35px;
      overflow: hidden;
      position: absolute;
      top: calc(50% - 17px);
      left: calc(50% - 35px);
    }

    #voz_living_loader {
      width: 70px;
      height: 70px;
      border-style: solid;
      border-top-color: #FFF;
      border-right-color: #FFF;
      border-left-color: transparent;
      border-bottom-color: transparent;
      border-radius: 50%;
      box-sizing: border-box;
      animation: rotate 1s ease-in-out infinite;
      transform: rotate(-200deg)
    }
    @keyframes rotate {
      0% { border-width: 10px; }
      25% { border-width: 3px; }
      50% {
        transform: rotate(115deg);
        border-width: 10px;
      }
      75% { border-width: 3px;}
      100% { border-width: 10px;}
    }

    </style>
    <div id="voz_living_splash" style="">
        <div id="voz_living_loader_container">
            <div id="voz_living_loader"></div>
        </div>
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

        $("#voz_living_splash").fadeOut(300);
    }
}
