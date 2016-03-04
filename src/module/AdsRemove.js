// var VozLiving = require("content/runtime");
var VozLiving = window.__VOZLIVING

console.log("Test AdsRemove")

VozLiving.on("DOMReady", (time) => {
    console.log("AdsRemove: DOMReady at ", time);
})
