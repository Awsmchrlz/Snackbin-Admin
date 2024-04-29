"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const administratorSchema = new _mongoose.default.Schema({
  userName: {
    type: String,
    required: true
  },
accountState:{
type:String,
required:false,
default:'Active'
},
password:{
  type: String,
  required: false
},
emailAddress: {
  type: String,
  required: true
}

});
const administrator = _mongoose.default.model('Administrator', administratorSchema);

exports.default = administrator;