const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CheckoutSchema = new Schema({
  fullname:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:false
  },
  address:{
    type:String,
    required:true
  },
  city:{
    type:String,
    required:true
  },
  zip:{
    type:Number,
    required:true
  },
  userId:{
    type:String,
    required:true
  },
  cartId:{
    type:String,
    required:true
  },
  prodname:{
type:String,
required:true
  },
  prodtotal:{
    type:Number,
    require:true
  }
  })
module.exports = mongoose.model('Checkout', CheckoutSchema); 