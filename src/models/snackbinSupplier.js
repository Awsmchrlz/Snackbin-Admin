"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const SnackbinSupplierSchema = new _mongoose.default.Schema({
  supplierName: {
    type: String,
    required: true
  },
  orders: {
    type: Array,
    required: false,
    default:[]
  },
  supplierLocation: {
    type: String,
    required: false
  },
  phoneNumber: {
    type: String,
    required: false
  },
accountState:{
type:String,
required:false,
default:'Pending'
},
promoText:{
  type:String,
  required:false
},
workStatus:{
  type: String,
  default:"Working"
},password:{
  type: String,
  required: false
},
emailAddress: {
  type: String,
  required: true
},
role:{
  type:String,
  default:'supplier'
}

});
const SnackbinSupplier = _mongoose.default.model('SnackbinSupplier', SnackbinSupplierSchema);

exports.default = SnackbinSupplier;