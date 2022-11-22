"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = require("mongoose");
var tarea = new _mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  precio: {
    type: Number,
    required: true
  },
  descripcion: String,
  url: {
    type: String,
    required: true,
    unique: true
  },
  stock: {
    type: Number,
    required: true
  }
}, {
  versionKey: false
});
var _default = (0, _mongoose.model)('rvd-shops', tarea);
exports["default"] = _default;