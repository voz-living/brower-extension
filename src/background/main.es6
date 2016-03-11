import BackgroundRuntime from "background/runtime"
import BGModuleQuoteNoti5 from "module/quote-noti5/bg"

window.runtime = new BackgroundRuntime();
runtime.loadModule(BGModuleQuoteNoti5);
window.__storage = {
    showAll: chrome.storage.local.get.bind(chrome.storage.local, null, (x) => console.log(x)),
    removeAll: chrome.storage.local.clear.bind(chrome.storage.local, () => true)
}

console.log("Background started");
runtime.start();
