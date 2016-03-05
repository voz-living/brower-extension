export function sendMessageClient(){
    chrome.tabs.query({currentWindow: true}, function(tabs) {
        for(var i=0;i<tabs.length;i++){
            chrome.tabs.sendMessage(tabs[i].id, message, callback);
        }
    });
}
