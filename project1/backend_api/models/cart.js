const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CartSchema = new Schema({
  prodId:{
    type: String,
      required: true
      //ref: 'Products'
  },
  prodname:{
    type:String,
    required:true
  },
  imgurl:{
    type:String,
    required:false
  },
  price:{
    type:Number,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  userId:{
    type:String,
    required:true
  },
  quantity:{
    type:Number,
    required:true
  },
  total:{
    type:Number,
    required:true
  }
  
  })

module.exports = mongoose.model('Cart', CartSchema); 