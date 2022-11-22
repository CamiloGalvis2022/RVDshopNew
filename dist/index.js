"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
require("./config");
var _app = _interopRequireDefault(require("./app"));
require("./database");
var PORT = process.env.PORT || 3000;
_app["default"].listen(PORT, function () {
  console.log('servidor ARRIBA', PORT);
});