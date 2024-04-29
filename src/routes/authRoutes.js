"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;
var express = require("express");
var _user = _interopRequireDefault(require("../models/user.js"));
const DeliveryPerson = _interopRequireDefault(require("../models/deliveryPerson.js")).default;
const Administrator = _interopRequireDefault(require("../models/administrator.js")).default;
const app = express();
const session = require('express-session');

var _bcrypt = _interopRequireDefault(require("bcrypt"));
var passport = require("passport");
// Administrator.deleteMany({}).then((done)=>{
//   console.log(done)
// })


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


router.post('/adminRegister',async (req,res)=>{
  const {emailAddress, password, userName} = req.body;

  const salt = await _bcrypt.default.genSalt(10);
  const hashedPassword = await _bcrypt.default.hash(password, salt);


  if (!userName || !emailAddress|| !password) {
    console.log('err');

    res.json({
      err: "Kindly fill in required fields"
    });
    return;
  }
 else {
    _bcrypt.default.hash(emailAddress + userName, 4).then(uid => {
      Administrator.findOne({
        emailAddress: emailAddress
      }).then(user => {
        if (user) {
          console.log(user);
          res.json({
            err: "Email Already Taken."
          });
        } else {
          // let _id = uid.slice(1, 20);
          const newUser = new Administrator({
            userName,
            emailAddress,
            password:hashedPassword
          });
          // Hash password
          _bcrypt.default.genSalt(10, (err, salt) => _bcrypt.default.hash(newUser.userPassword, salt, (err, hash) => {
            console.log(hash);
            newUser.userPassword = hash;
            newUser.save((err, result) => {
              if (err) {
                // we need to send a 500 error here
                res.json({
                  err
                });
                return;
              } else {
                res.json({
                  result,
                  response: "Thank You For Signing Up"
                });
                return;
              }
            });
          }));
        }
      }).catch(err => {
        // we need to send a 500 error here
        res.json({
          response: err
        });
        console.log(err);
      });
       
    }).catch(err => {
      console.log(err);
      res.json({
        response: err
      });
    });
  }

})

router.get('/adminRegister',async (req,res)=>{

  res.render("adminRegister", {
    style: "styles.css",
    script: "main",
  });

})


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
