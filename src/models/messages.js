"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const messageSchema = new _mongoose.default.Schema({
  senderName: {
    type: String,
    required: false
  },
  senderNumber: {
    type: String,
    required: false
  },
  userId: {
    type: String,
    required: false
  },
  text: {
    type: String,
    required: false
  },
  date: {
    type: String,
    required: false
  }
});
const Message = _mongoose.default.model('Message', messageSchema);

exports.default = Message;