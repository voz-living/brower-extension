export function sendMessageToClient(message, callback){
    console.log("sendMessageToClient:", message)
    chrome.tabs.query({}, function(tabs) {
        tabs.filter(({url}) => /vozforums\.com/.test(url)).forEach(({id}) =>{
            chrome.tabs.sendMessage(id, message, callback);
        });
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
    }, callback);
}
