"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;
var express = require("express");
var _user = _interopRequireDefault(require("../models/user.js"));
const DeliveryPerson = _interopRequireDefault(require("../models/deliveryPerson.js")).default;
const SnackbinSupplier = _interopRequireDefault(require("../models/snackbinSupplier.js")).default;
const app = express();
const session = require('express-session');

var _bcrypt = _interopRequireDefault(require("bcrypt"));
var passport = require("passport");


function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = (0, express)();


router.get('/',async (req,res)=>{

  res.render("adminLogin", {
    style: "styles.css",
    script: "main",
  });

})


app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
})); 

// const passport = require('passport');
app.use(passport.initialize());

// Configure Passport strategies


router.post("/adminLogin", (req, res, next) => {
  passport.authenticate("adminstrator", (err, user, info) => {
    // console.log(info)
     if (err) {
      res.render("adminLogin",{
        style: "styles.css",
    script: "main",
        message:err,
        email:req.body.emailAddress
      });
      return
    }
    if (!user) {
      res.render("adminLogin",{
        style: "styles.css",
    script: "main",
        message:info.message,
        email:req.body.emailAddress
      });
      return
    }
    else{

      req.logIn(user, (err) => {
        console.log('from admin'+user)
        if (err) {
          res.render("adminLogin",{
            style: "admin.css",
            script: "admin",
            message:err,
            email:req.body.emailAddress,
            
          });
        }else{
          res.redirect('/admin')
        }
        
      });
    }
  })(req, res, next);
});





router.get('/adminLogin',async (req,res)=>{

  res.render("adminLogin", {
    style: "styles.css",
    script: "main",
  });

})


router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/auth/login');
});

var _default = router;
exports.default = _default;
