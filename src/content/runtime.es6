import VozLiving from "content/voz-living"

var _ = require("lodash");
var Vue = require("vue");
window.Vue = Vue;

if(_.isUndefined(window.__VOZLIVING)){
    window.__VOZLIVING = new VozLiving();
}
module.exports = window.__VOZLIVING;