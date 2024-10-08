

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const alertSchema = new _mongoose.default.Schema({
  title: String,
    
  message: String,
  createdAt: { type: Date, default: Date.now }
});

;
const alert = _mongoose.default.model('Alert', alertSchema);

exports.default = alert;