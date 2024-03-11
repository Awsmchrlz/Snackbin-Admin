"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const SellerSchema = new _mongoose.default.Schema({
  sellerName: {
    type: String,
    required: true
  },
  sellerId: {
    type: String,
    required: false
  },
  orders: {
    type: Array,
    required: false
  },
  posts: {
    type: Array,
    required: false
  },
  messages: {
    type: String,
    required: false
  },
  sellerLocation: {
    type: String,
    required: false
  },
  sellerNumber: {
    type: String,
    required: false
  }
});
const Seller = _mongoose.default.model('Seller', SellerSchema);

exports.default = Seller;