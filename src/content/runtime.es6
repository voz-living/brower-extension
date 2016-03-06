import VozLiving from "content/voz-living"

var _ = require("lodash");

if(_.isUndefined(window.__VOZLIVING)){
    window.__VOZLIVING = new VozLiving();
}
module.exports = window.__VOZLIVING;
