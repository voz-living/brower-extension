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
            this._setupInitialInformation();
        });

        sendInfo("Client is connected");

        this._isThreadListPage = /forumdisplay/.test(window.location.pathname);
        this._isThreadPage = /showthread/.test(window.location.pathname);
    }

    get isThreadListPage(){
        return this._isThreadListPage;
    }

    get isThreadPage(){
        return this._isThreadPage;
    }

    _setupInitialInformation(){
        this._isThreadListPage = $("#threadslist").length > 0;
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
