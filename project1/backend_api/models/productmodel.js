const mongosse=require('mongoose');
const Schema=mongosse.Schema;

const ProductSchema=new Schema({
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
}
// },
// userId:{
//    type:Schema.Types.ObjectId,
//     ref:'Users',
//     required:true
// }




})
module.exports=mongosse.model('Products',ProductSchema);