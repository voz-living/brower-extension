import BaseEvent from "core/base-event"

export default class BaseRuntime extends BaseEvent {
    constructor(){
        super();
        this.modules = [];
        this.functions = {};
        this.communicationHandler = {}

        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            var from = "content_script"
            if(_.isUndefined(sender.tab)){
                from = "extension"
            }
            console.info(from == "content_script" ? "from a content script:" + sender.tab.url : "from the extension");
            var type = request.type;
            if(_.isUndefined(type) || _.isUndefined(request.message)){
                sendResponse({
                    error: true,
                    message: `Missing message.type or message.message`
                })
            }else{
                if(_.isUndefined(this.communicationHandler[type])){
                    sendResponse({
                        error: true,
                        message: `Could not find communicationHandler for ${type}`
                    })
                }else{
                    this.communicationHandler[type](request.message, sendResponse, sender);
                }
            }
        });

        this.registerCommunicationHandler("info", this._communicationInfoHandler.bind(this));
        this.registerCommunicationHandler("function", this._communicationFunctionHandler.bind(this));
    }

    loadModule(Module){
        var module = new Module();
        this.modules.push(module);
    }

    registerCommunicationHandler(name, fn){
        this.communicationHandler[name] = fn;
    }

    registerFunction(name, fn){
        this.functions[name] = fn;
    }

    _communicationInfoHandler(message, sendResponse){
        console.info(message);
        sendResponse({ack: true, error: false});
    }

    async _communicationFunctionHandler(message, sendResponse){
        var func = message.function;
        var params = message.params;
        if(_.isUndefined(params)) params = {};

        if(_.isUndefined(this.functions[func])){
            sendResponse({
                error: true,
                message: `Function ${func} is not registered`
            })
        }else{
            try{
                var response = await this.functions[func](params);
                sendResponse({
                    error: false,
                    response: response
                });
            }catch(e){
                sendResponse({
                    error: true,
                    message: `Error while executing function ${func}`
                });
            }
        }
    }

    loadModules(){
        _.forEach(arguments, (module) => this.loadModule(module));
    }
}
