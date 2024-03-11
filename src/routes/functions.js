"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateUsername = exports.validatePhoneNumber = void 0;
const validatePhoneNumber = number => {
  if (number.match(/^[0-9]{10}$/)) {
    return true;
  } else {
    return false;
  }
};
exports.validatePhoneNumber = validatePhoneNumber;
const validateUsername = name => {
  if (name.match(/^[0-9A-Za-z]+$/)) {
    return true;
  } else {
    return false;
  }
};
exports.validateUsername = validateUsername;