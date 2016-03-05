export function sendMessageToClient(message, callback){
    chrome.tabs.query({currentWindow: true}, function(tabs) {
        for(var i=0;i<tabs.length;i++){
            chrome.tabs.sendMessage(tabs[i].id, message, callback);
        }
    });
}

export function sendMessageToBackground(message, callback){
    chrome.runtime.sendMessage(message, callback);
}

function getCommunicator(){
    if(window.VOZLIVING_BACKGROUND === true){
        return sendMessageToClient;
    }else{
        return sendMessageToBackground;
    }
}

export function sendInfo(message, callback){
    getCommunicator()({
        type: "info",
        message: message
    });
}

export function sendFunctionCall(message, callback){
    getCommunicator()({
        type: "function",
        message: message
    });
}

export
