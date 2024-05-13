"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});

exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const OrderSchema = new _mongoose.default.Schema({

  deliveryAddress: {
    type: String,
    required: false,
  },
  userId: {
    type: String,
    required: true,
  },
  Cart: {
    type: Array,
    required: true,
  },
  orderStatus: {
    type: String,
    default: "Pending",
  },
  orderPrice: {
    type: Number,
    required: true,
  },
  deliveryCharge:{
    type:Number,
    required:true,
    default:0
  }
  ,
  deliveryPersonId: {
    type: String,
    required: false,
  },
  paymentStatus: {
    type: String,
    default: "Pending",
  },
  tipAmount: {
    type: Number,
    required: 0,
  },
  totalCost:{
    type:Number,
    required:false,
    default:0
  },
  supplierIds: {
    required: true,
    type: Array,
  },

  productIds: {
    required: true,
    type: Array,
  },
  timeStamp: {
    type: Date,
    default: Date.now(),
  },
  orderNotes: {
    required: false,
    type: String,
  },
  payNumber: {
    required: false,
    type: String,
  },
  phoneNumber: {
    required: false,
    type: String,
  },
  userName: {
    required: false,
    type: String, 
  },
  deleted: {
    type: Boolean,
    default: false,
  },
});


OrderSchema.methods.resetStatus = function(){

  if(this.orderStatus == 'Viewing'){
    this.orderStatus = 'Pending';
    console.log('View time expirted, reseting order');
    return this.save();
  }
}


OrderSchema.pre('save', function(next) {
  if (this.orderStatus === 'Viewing') {
    setTimeout(() => {
      this.resetStatus().then(() => {
        console.log('Done.');
      }).catch(err => {
        console.error('Error resetting order status:', err);
      });
    }, 10000); // 10 seconds delay (in milliseconds)
  }
if(this.orderStatus == 'Accepted' ){
  setTimeout(async () => {
    console.log('resetting accepted ordefrs')
   this.orderStatus = 'Pending';
   await this.save();
  }, 15000); // 10 seconds delay (in milliseconds)
}
  next();
});



const Order = _mongoose.default.model("Order", OrderSchema);

(async ()=>{

  try {
    const ordersToUpdate = await this.find({ orderStatus: 'Viewing' }).exec();
    if (ordersToUpdate.length > 0) {
      for (let i = 0; i < ordersToUpdate.length; i++) {
        const order = ordersToUpdate[i];
        order.orderStatus = 'Pending';
        await order.save();
      }
      console.log('Viewing orders reset to pending.');
    } else {
      console.log('No viewing orders found.');
    }
  } catch (error) {
    console.error('Error resetting viewing orders:', error);
  }
})

exports.default = Order;
