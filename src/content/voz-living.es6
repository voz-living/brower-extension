import BaseRuntime from "core/base-runtime"
import {sendInfo} from "shared/communication"

export default class VozLiving extends BaseRuntime {
    constructor(){
        super();

        $( document ).ready(() => {
            this.emit("DOMReady", new Date());
        });

        sendInfo("Client is connected");
    }
}
