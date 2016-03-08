__webpack_public_path__ = chrome.runtime.getURL("/build/");
require("babel-polyfill");
require('babel-runtime/core-js/promise').default = require('bluebird');

window.Vue = require("vue");

require("content/runtime");
require('./main');
