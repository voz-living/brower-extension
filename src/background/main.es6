import BackgroundRuntime from "background/runtime";

window.runtime = new BackgroundRuntime();
console.log("Background started");
runtime.start();
