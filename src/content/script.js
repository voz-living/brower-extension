__webpack_public_path__ = chrome.runtime.getURL("/build/");
require("babel-polyfill");
require('babel-runtime/core-js/promise').default = require('bluebird');

window.Vue = require("vue");
Vue.filter('datetime', function(value){
    var date = new Date(+value);
    var hour = date.getHours();
    var min = date.getMinutes();
    var day = date.getDate();
    var month = date.getMonth()+1;
    var year = date.getFullYear();
    return `${day}:${hour} ${day}-${month}-${year}`
})

require("content/runtime");
require('./main');
