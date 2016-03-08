import BaseRuntime from "core/base-runtime"
import {sendInfo, sendFunctionCall} from "shared/communication"

export default class VozLiving extends BaseRuntime {
    constructor(){
        super();

        $( document ).ready(() => {
            require("font-awesome/css/font-awesome.min.css");
            require("./style.less")
            this.emit("DOMReady", new Date());
            this._getAuthenticationInformation();
        });

        sendInfo("Client is connected");
    }

    _getAuthenticationInformation(){
        var username = $("*:contains('You last') > *:contains('Welcome') > a[href*='member.php?u']").eq(0).text();
        if(username == "") return {isLogin: false};
        new Function($("script:not([src]):contains('SECURITYTOKEN')").text().replace('SECURITYTOKEN', 'SECURITYTOKEN=window.SECURITYTOKEN')).call(window);
        var token = SECURITYTOKEN;
        sendFunctionCall({
            function: "setAuthenticationInfo",
            params: {
                isLogin: true,
                username: username,
                securitytoken: token
            }
        })

        return {isLogin: true}
    }
}
