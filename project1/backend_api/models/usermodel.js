const mongosse=require('mongoose');
const Schema=mongosse.Schema;

const UserSchema=new Schema({
firstname:{
  type:String,
  required:true
},
lastname:{
  type:String,
  required:true
},
usertype:{
type:String,
required:true
},
email:{
  type:String,
  required:true
},
password:{
  type:String,
  required:true
},

// cart: {
//   items: [
//     {
//       productId: {
//         type: Schema.Types.ObjectId,
//         ref: 'Products',        //products is the name of collection
//         required: true
//       },
//       quantity: { type: Number, required: true }
//     }
//   ]
// }

});

// UserSchema.methods.addToCart=function(product){

//   //For getting the product index
//   const cartProductIndex = this.cart.items.findIndex(cp => {
//             return cp.productId.toString() === product._id.toString();
//           });
          
//           //to control the product quantity
//           let newQuantity = 1;

//           //update cart items
//           const updatedCartItems = [...this.cart.items];

//       //chack wether the product in the cart exist or not
//           if (cartProductIndex >= 0) {
//             newQuantity = this.cart.items[cartProductIndex].quantity + 1;
//             updatedCartItems[cartProductIndex].quantity = newQuantity;
//           } else {
//             updatedCartItems.push({
//               productId:product._id,
//               quantity: newQuantity
//             });
//           }
//           //now get the updated cart info
//           const updatedCart = {
//             items: updatedCartItems
//           };
         
//          this.cart=updatedCart;
//          return this.save()
// }

// UserSchema.methods.removeFromCart = function(productId) {
//   const updatedCartItems = this.cart.items.filter(item => {
//     return item.productId.toString() !== productId.toString();
//   });
//   this.cart.items = updatedCartItems;
//   return this.save();
// };

// UserSchema.methods.clearCart = function() {
//   this.cart = { items: [] };          //remove product when it 
//   return this.save();
// };
// module.exports=mongosse.model('Users',UserSchema);      //User is the name of collection  and userschema is the name of the schema



module.exports=mongosse.model('Users',UserSchema);
