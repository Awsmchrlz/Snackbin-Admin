"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const UserSchema = new _mongoose.default.Schema({
  userName: {
    type: String,
    required: true
  },
  userNumber: {
    type: String,
    required: true
  },
  userPassword: {
    type: String,
    required: true
  },
  userAddress: {
    type: String,
    required: true
  },
  orders: {
    type: Array,
    required: false
  },
  notifications: {
    type: Array,
    required: false
  },
  accountStatus:{
    type: String,
    required: false,
    default:"active"
  }
});
const User = _mongoose.default.model('User', UserSchema);

exports.default = User;