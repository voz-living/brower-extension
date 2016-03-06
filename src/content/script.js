require("babel-polyfill");
require('babel-runtime/core-js/promise').default = require('bluebird');

window.Vue = require("vue");

require("content/runtime");
require('./main');
