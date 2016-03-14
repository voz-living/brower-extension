import BaseEvent from "core/base-event"

export default class BaseRuntime extends BaseEvent {
    constructor(){
        super();
        this.modules = [];
        this.moduleAlias = {};
        this.functions = {};
        this.communicationHandler = {}

        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            var from = "content_script"
            if(_.isUndefined(sender.tab)){
                from = "extension"
            }
            console.info(`Receive ${request.type}`, request.message);
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
            return true;
        });

        this.registerCommunicationHandler("info", this._communicationInfoHandler.bind(this));
        this.registerCommunicationHandler("function", this._communicationFunctionHandler.bind(this));
    }

    loadModule(Module){
        var module = new Module();
        var name = module.name;
        if(name == null) name = module.constructor.name;
        this.modules.push(module);
        this.moduleAlias[name] = module;
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

    _communicationFunctionHandler(message, sendResponse){
        var func = message.function;
        var params = message.params;
        if(_.isUndefined(params)) params = {};

        if(_.isUndefined(this.functions[func])){
            sendResponse({
                error: true,
                message: `Function ${func} is not registered`
            })
        }else{
            this.functions[func](params).then((response) => {
                console.log("Sending response of func ", func, response)
                sendResponse({
                    error: false,
                    response: response
                });
            }).catch((e) => {
                console.error(e);
                sendResponse({
                    error: true,
                    message: `Error while executing function ${func}`
                });
            })
        }
    }

    loadModules(){
        _.forEach(arguments, (module) => this.loadModule(module));
    }
}
