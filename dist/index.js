"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
require("./config");
var _app = _interopRequireDefault(require("./app"));
require("./database");
_app["default"].listen(3000);
console.log('servidor ARRIBA', 3000);