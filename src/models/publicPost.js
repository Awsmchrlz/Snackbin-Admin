"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const PostSchema = new _mongoose.default.Schema({
  sellerId: {
    type: String,
    required: false
  },
  itemName: {
    type: String,
    required: false
  },
  itemPrice: {
    type: String,
    required: false
  },
  imageUrls: {
    type: Array,
    required: false
  },
  itemInfo: {
    type: String,
    required: false
  },
  tags: {
    type: String,
    required: false
  },
  itemId: {
    type: String,
    required: false
  }
});
const Post = _mongoose.default.model('Post', PostSchema);

exports.default = Post;