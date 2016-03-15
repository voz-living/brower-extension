export function sendMessageToClient(message, callback){
    console.log("sendMessageToClient:", message)
    chrome.tabs.query({}, function(tabs) {
        tabs.filter(({url}) => /vozforums\.com/.test(url)).forEach(({id}) =>{
            chrome.tabs.sendMessage(id, message, callback);
        });
    });
}

export function sendMessageToBackground(message, callback){
    chrome.runtime.sendMessage(message, function(response){
        console.log("Response from background", response)
        if(callback) callback.call(null, response );
    });
}

function getCommunicator(){
    if(window.VOZLIVING_BACKGROUND === true){
        return sendMessageToClient;
    }else{
        return sendMessageToBackground;
    }
}

export function sendInfo(message, callback){
    console.log("Send Info:", message);
    getCommunicator()({
        type: "info",
        message: message
    }, callback);
}

export function sendFunctionCall(message, callback){
    console.log("Send Function:", message);
    getCommunicator()({
        type: "function",
        message: message
    }, callback);
}
