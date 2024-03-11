"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ProductSchema = new _mongoose.default.Schema({
  productName: {
    type: String,
    required: false
  },
  productClass: {
    type: String,
    required: false
  },imageUrls: {
    type: Array,
    required: false
  },
  mainImage:{
    type:String,
    required:true
  },
  supplierId:{
    type:String,
    required:true
  },
  productPrice:{
    type:Number,
    required:true
  },
  productTags:{
    type:String,
    required:true,
    default:""
  },
  productInfo: {
    type: String,
    required: false
  },
  showInStore:{
    type:Boolean,
    default:true
  }
});
const Product = _mongoose.default.model('Product', ProductSchema);

exports.default = Product;