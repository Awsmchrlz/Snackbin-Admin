"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var User = _interopRequireDefault(require("../models/user.js")).default;
var Product = _interopRequireDefault(require("../models/product.js")).default;
var Order = _interopRequireDefault(require("../models/order.js")).default;

var Messages = _interopRequireDefault(require("../models/messages.js")).default;
var _multer = _interopRequireDefault(require("multer"));
var _fs = _interopRequireDefault(require("fs"));
var _uuid = require("uuid");
var DeliveryPerson = _interopRequireDefault(require("../models/deliveryPerson.js")).default;
const SnackbinSupplier = _interopRequireDefault(require("../models/snackbinSupplier.js")).default;

const bcrypt = require('bcrypt');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// import ensureAuthenticated from '../../config/auth';
// import passport from 'passport';
// Product.deleteMany({}).then((done)=>{
//   console.log(done);
// })
// ensureAuthenticated,


require('dotenv').config();

// Require the cloudinary library
const cloudinary = require('cloudinary').v2;

// Return "https" URLs by setting secure: true
cloudinary.config({
  secure: true
});
console.log(cloudinary.config().cloud_name);
// var storage = multer.memoryStorage()

var storage = _multer.default.diskStorage({
  limits: {
    fieldSize: 10 * 1024 * 1024
  },
  destination: function (req, file, cb) {
    cb(null, `./uploads`);
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + '-' + file.originalname);
  }
});

//uploadImage('./uploads/image.jpg')

var upload = (0, _multer.default)({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
});

const router = (0, _express.default)();


router.get('/', async(req, res) => {
  console.log(req.user)
  const suppliers = await SnackbinSupplier.find({}).lean()
  const users = await User.find({}).lean()
  const messages = await Messages.find({}).lean()
  const deliveryPeople = await DeliveryPerson.find({}).lean()

    
    const products = await Product.find({}).lean();

    const deletedOrders = await Order.find({
      $and: [
          { orderStatus: "Deleted" },
          { deleted: false } // Check if the 'deleted' attribute exists
      ]
  }).lean();

    const canceledOrders =await Order.find({
      $and: [
          { orderStatus: "Cancelled" },
          { deleted: false } // Check if the 'deleted' attribute exists
      ]
  }).lean();

    const processedOrders = await Order.find({
      $and: [
          { orderStatus: "Processed" },
          { deleted: false } // Check if the 'deleted' attribute exists
      ]
  }).lean();

  const pendingOrders = await Order.find({
    $and: [
        { orderStatus: "Pending" },
        { deleted: false } // Check if the 'deleted' attribute exists
    ]
}).lean();

  
  console.log(pendingOrders)

        res.render('admin', {
          style: "admin.css",
          script: "admin",
          pendingOrders,
          deletedOrders,
          canceledOrders,
          messages,
          users,
          products,
          processedOrders,
          suppliers,
          deliveryPeople
        });
      });
    



router.post('/uploadItem', upload.array('photos', 3), async (req, res) => {
  console.log("koo")
  try {
    const files = req.files;
    const imageUrls = [];
    for (let i = 0; i < files.length; i++) {
      //Uploading the files to cloudinary and getting the URLs
      const result = await cloudinary.uploader.upload(files[i].path);
      imageUrls.push(result.url);
    }

    const {
      productClass,
      productPrice,
      productName,
      productTags,
      productInfo,
      supplierId
    } = req.body;

    const newProduct = new Product({
      productClass,
      productPrice,
      productName,
      productTags,
      productInfo,
      imageUrls,
      mainImage:imageUrls[0],
      supplierId,
    })
    newProduct.save();
res.redirect('/')
  }catch{
    res.redirect('/') 
  }
});


router.post('/deleteItem/:itemId',(req, res)=>{

  const itemId =  req.params.itemId;
  console.log(itemId)
  softDeleteItem(itemId)
  res.json({response:"Order Delete"})
  return;
})

router.post('/deleteProduct/:itemId',(req, res)=>{

  const itemId =  req.params.itemId;
  console.log(itemId)
  
Product.deleteOne({
_id:itemId
}).then(result => {
    console.log(result);
    // res.json({response:"product Erased"})
res.redirect('/admin')
    // res.redirect('/admin');
  }).catch(err => {
    console.log(err);
  });
})



router.post('/sendPublicMessage', (req, res) => {
  const {
    messageTitle,
    from,
    messageBody
  } = req.body;
  let date = new Date().toLocaleString();
  let newNotification = {
    messageType: messageTitle,
    messageBody,
    from,
    messageDate: date
  };
  User.updateMany({}, {
    $push: {
      notifications: newNotification
    }
  }).then(result => {
    console.log(result);
    res.redirect('/admin');
  }).catch(err => {
    console.log(err);
  });
});

router.post('/replyUser', (req, res) => {
  const {
    replyText,
    userId
  } = req.body;
  let date = new Date().toLocaleString();
  let newNotification = {
    messageType: "Reply",
    messageBody: replyText,
    from: 'Snackbin Team',
    messageDate: date
  };
  User.updateOne({
    _id: userId
  }, {
    $push: {
      notifications: newNotification
    }
  }).then(result => {
    console.log(result);
    res.redirect('/admin');
  }).catch(err => {
    console.log(err);
  });
});


router.post('/setSupplierState', (req, res) => {
  const {
    storeId,
    accountState
  } = req.body;
  console.log(storeId)
  SnackbinSupplier.updateOne({
    _id: storeId
  }, {
    $set: {
      accountState:accountState
    }
  }).then(ress => {
    console.log(ress)
    if (ress.matchedCount > 0) {
      res.json({
        response: `Selected Supplier updated to ${accountState}`
      });
    } else {
      res.json({
        response: `Select A Supplier to update`
      });
    }
  }).catch(err => {
    res.json(err);
  });
});

router.post('/setSupplierMessage', (req, res) => {
  const {
    storeId,
    promoText
  } = req.body;
  console.log(storeId);

 SnackbinSupplier.updateOne({
    _id: storeId
  }, {
    $set: {
      promoText: promoText
    }
  }).then(ress => {
    if (ress.matchedCount > 0) {
      res.json({
        response: `Supplier Message Updated`
      });
    } else {
      res.json({
        response: `Supplier Id Does Not Match`
      });
    }
  }).catch(err => {
    res.json(err);
  });
});

router.post('/createSupplier', async (req, res) => {
  const {
    supplierName,
    supplierLocation,
    promoText,
    phoneNumber,
    password,
    emailAddress
  } = req.body;

  try {
    // Generate salt
    const salt = await bcrypt.genSalt(10);
    // Hash the password with the salt
    const hashedPassword = await bcrypt.hash(password, salt);

    const newSupplier = new SnackbinSupplier({
      supplierName,
      supplierLocation,
      promoText,
      phoneNumber,
      supplierState: 'Pending',
      password: hashedPassword,
      emailAddress
    });

    newSupplier.save((err, result) => {
      if (err) {
        console.log(err);
        res.json(err);
      } else {
        console.log('store saved');
        res.redirect('/admin');
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

function deleteFiles(filePaths) {
  filePaths.forEach(file => {
    _fs.default.unlink(file.path, err => {
      if (err) throw err;
      console.log('path/file.txt was deleted');
    });
  });
}

router.post('/createDeliveryPerson', async (req, res) => {
  const {
    userName,
    phoneNumber,
    userAddress,
    password,
    emailAddress
  } = req.body;

  try {
    // Generate salt
    const salt = await bcrypt.genSalt(10);
    // Hash the password with the salt
    const hashedPassword = await bcrypt.hash(password, salt);

    const deliveryPerson = new DeliveryPerson({
      userName,
      phoneNumber,
      userAddress,
      workState: 'Not Working',
      accountState: 'Pending',
      password: hashedPassword,
      emailAddress
    });

    deliveryPerson.save((err, result) => {
      if (err) {
        console.log(err);
        res.json(err);
      } else {
        console.log('delivery person saved');
        res.redirect('/admin');
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.post('/deleteDeliveryPerson/:userId',async (req,res)=>{
  const userId = req.params.userId;
console.log(userId)
  try {
    // Find the delivery person by userId and delete them
    const deletedDeliveryPerson = await DeliveryPerson.findByIdAndDelete(userId);

    if (deletedDeliveryPerson) {
      console.log('Delivery person deleted successfully:', deletedDeliveryPerson);
      res.json({ message: 'Delivery person deleted successfully' });
    } else {
      console.log('Delivery person not found');
      res.status(404).json({ error: 'Delivery person not found' });
    }
  } catch (error) {
    console.error('Error deleting delivery person:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

})


async function softDeleteItem(itemId) {
  try {
    const updatedItem = await Order.findByIdAndUpdate(itemId, { deleted: true }, { new: true });
    return updatedItem;
  } catch (error) {
    console.error('Error soft deleting item:', error);
    throw error;
  }
}

var _default = router;
exports.default = _default;