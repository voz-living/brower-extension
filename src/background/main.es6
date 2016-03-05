import BackgroundRuntime from "background/runtime"
import BGModuleQuoteNoti5 from "module/quote-noti5/bg"

window.runtime = new BackgroundRuntime();
runtime.loadModule(BGModuleQuoteNoti5);

console.log("Background started");
runtime.start();
