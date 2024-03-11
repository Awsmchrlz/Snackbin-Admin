"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }



const deliveryPersonSchema = new _mongoose.default.Schema({
  userName: {
    type: String,
    required: true
  },
  userAddress: {
    type: String,
    required: false
  },
  emailAddress: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: false
  },
  workStatus:{
    type: String,
    default:"Working"
  }
  ,
  accountStatus:{
    type: String,
    required:true,
    default:"Pending"
  },
  deliveryCharge:{
    type: Number,
    default:5
  },
  password:{
    type: String,
    required: false
  },
  role:{
    type:String,
    default:'deliveryPerson'
  }
});


const deliveryPerson = _mongoose.default.model('deliveryPerson', deliveryPersonSchema);

exports.default = deliveryPerson;