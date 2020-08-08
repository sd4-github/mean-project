const Product=require('../models/productmodel');
const path=require("path");
const Order=require('../models/order');
const Cart=require('../models/cart');
const Checkout=require('../models/checkout');

const mongoose=require('mongoose');

const nodmailer=require('nodemailer');
const sendGrid=require('nodemailer-sendgrid-transport');

const transport=nodmailer.createTransport(sendGrid({            //to call the api of sendgrid apikey
    auth:{
      
        api_key:'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'

    }
}))

exports.getproductListForm=(req,res,next)=>{

    Product.find().then(products=>{
        // res.render("shop/product_list",{
        //     title:"PRODUCT LIST",
        //     data:products,
        //     path:"/product_list_path"
        // })
        res.status(201).json({
          success:true,
          message:'productlist is displayed successfully',
          product_data:products
      })
    }).catch((err)=>{
            //console.log(err);
            res.status(400).json({
              success:false,
              message:'internal server error'
            })
    })
}




 exports.getProductDetails=(req,res,next)=>{
    
    const prodId=req.params.prod_id;
    //console.log("product Id is "+prodId)
  Product.findById(prodId).then(products=>{
  
    res.status(200).json({
      success:true,
      message:'product details displayed succesfully',
      product:products
    })
  }).catch(err=>{
    //console.log(err);
    res.status(400).json({
      success:false,
      message:'internal server error'
    })
  })
   
 }

 


exports.postCart = (req, res, next) => {
  const prodId=req.body.productId;
  const userid=req.body.userId;
  const prodquan=req.body.quantity;
  

  if(!prodId){
    res.status(400).json({
        success:false,
      message:'product ID field is required '
    })
}
if(!userid){
  res.status(400).json({
      success:false,
    message:'user ID field is required '
  })
}
if(!prodquan){
  res.status(400).json({
      success:false,
    message:'product quantity field is required '
  })
}
// if(!prodtotal){
//   res.status(400).json({
//       success:false,
//     message:'product total field is required '
//   })
// }
else{
  Product.findById(prodId).then(product=>{
    // console.log(product)
    const prodname=product.prodname;
    const prodimg=product.imgurl;
    const prodprice=product.price;
    const proddesc=product.description;
    const prodtotal=prodprice*prodquan;

    const Cartproduct=new Cart({prodId:prodId,prodname:prodname,imgurl:prodimg,price:prodprice,
      description:proddesc,userId:userid,quantity:prodquan,total:prodtotal});
     Cartproduct.save().then((prod)=>{
    return  res.status(200).json({
        success:true,
        message:'product added to cart succesfully',
        product:prod
      })
    }).catch(err=>{
      res.status(400).json({
        success:false,
        message:'not able to add this product',
        error:err
      })
    })
  }).catch(err=>{
    // console.log(err)
    res.status(400).json({
      success:false,
      message:'internal server error'
    })
   })
 
 };
}



exports.getCart=(req,res,next)=>{
    const cartarray=[];
  const prodId=req.body.prod_id;
  const userid=req.params.userId;
  

  //console.log("product Id is "+prodId)
//Cart.findById(prodId).then(products=>{
  Cart.find({userId:userid}).then(products=>{
    console.log(products)
cartarray.push(products)
  res.status(200).json({
    success:true,
    message:'product details displayed succesfully',
    product:products
  })
}).catch(err=>{
  //console.log(err);
  res.status(400).json({
    success:false,
    message:'internal server error'

  })
})
 
}


exports.postCartDeleteProduct = (req, res, next) => {

  const cartId = req.body.cartid;
  
        if(!cartId){
            res.status(400).json({
                success:false,
                message:'cart Id field is required '
            })
        }
            else{
                Cart.findByIdAndRemove(cartId).then(result=>{         //findByIdRemove is comes from mongoose it find by id and delete that product
                    //res.redirect('/adminproduct')
                    res.status(201).json({
                       success:true,
                       message:'product is deleted from the cart successfully',
                       product_data:result
                   })
                  }).catch(err=>{
                    //console.log(err)
                    res.status(400).json({
                       success:false,
                       message:'internal server error'
                   })
                  })

            }
 
}




exports.getCheckout=(req,res,next)=>{
  const checkoutarray=[];
  const userid=req.params.userId;

  Checkout.find({userId:userid}).then(carts=>{
    console.log(carts)
checkoutarray.push(carts)
  res.status(200).json({
    success:true,
    message:'cart details displayed succesfully',
    cart:carts
  })
})
  // Checkout.findById(userid).then(products=>{
  
  //   res.status(200).json({
  //     success:true,
  //     message:'product details displayed succesfully',
  //     product:products
  //   })
  // })
  .catch(err=>{
    //console.log(err);
    res.status(400).json({
      success:false,
      message:'internal server error'
    })
  })

}



exports.postCheckout=(req,res,next)=>{

  const name=req.body.fullname;
  const mail=req.body.email;
  const adrs=req.body.address;
  const city=req.body.city;
  const zipcode=req.body.zip;
 
 // const cartid=req.body.cartId;
  const userid=req.body.userId;

  if(!name){
    return res.status(400).json({
        success:false,
        meaagase:'full name is required'
    })
}
if(!mail){
    return res.status(400).json({
        success:false,
        meaagase:'email is required'
    })
}
if(!adrs){
  return res.status(400).json({
      success:false,
      meaagase:'address is required'
  })
}
if(!city){
    return res.status(400).json({
        success:false,
        meaagase:'city is required'
    })
}
if(!zipcode){
  return res.status(400).json({
      success:false,
      meaagase:'zipcode is required'
  })
}
// if(!cartid){
//   res.status(400).json({
//       success:false,
//       message:'cart Id field is required '
//   })
// }
if(!userid){
  res.status(400).json({
      success:false,
      message:'user Id field is required '
  })
}
else{
  Cart.findById(userid).then(product=>{
     console.log(product)
//const cart_id=product.cartId;
    const cart_prodname=product.prodname;
    const cart_prodtotal=product.total;
  const checkout=new Checkout({fullname:name,email:mail,
    address:adrs,city:city,zip:zipcode,userId:userid,prodname:cart_prodname,prodtotal:cart_prodtotal});
checkout.save().then((result)=>{
  
    res.status(201).json({
        success:true,
        message:'checkout is successfull',
          checkout_data:result
    })
}).catch(err=>{
  res.status(400).json({
    success:false,
    message:'not able to add this cart',
    error:err
  })
})
}).catch(err=>{
  // console.log(err)
  res.status(400).json({
    success:false,
    message:'internal server error'
  })
 })

}

}






// exports.postOrder = (req, res, next) => {
//   req.userdata
//  .populate('cart.items.productId')    //in respect of id extaact data,populate function doesnot return promise
//  .execPopulate()    //populate function helps to collect documents from other collection ,we can populate an single or multiple document as a form object
//  .then(user => {
//    const products = user.cart.items.map(i => {          //map return all data of the array
//      return { quantity: i.quantity, product: { ...i.productId._doc } };   //_doc is comes from mongoose and it is predefind,it 
//    });
//    const order = new Order({
//      user: {
//        email:    req.userdata.email,
//        userId:    req.userdata
//      },
//      products: products
//    });
//    return order.save();     //save in order collection
//  })
//  .then(result => {
//   const orderdetails=result;
//   res.status(201).json({
//     success:true,
//     message:'product is ordered successfully',
//     product_data:result
// })
//   // console.log("user details" +orderdetails)
//   // res.redirect('/order_path');
//   return  transport.sendMail({
//     to:req.userdata.email,
//     from:'hazraivy@gmail.com',
//     subject:'Order is successfully',
//     html:`<h1>your order is successful<br>you have ordered ${orderdetails},quantity=()</h1>`
//   })
 
//  })
//  .then((result) => {
   
// return    req.userdata.clearCart();   //after placing the order clear all data
//  })
//  .catch((err) =>{
//   //console.log(err)
//   res.status(400).json({
//     success:false,
//     message:'internal server error'
//   })
//  });
// };




exports.getOrders = (req, res, next) => {
  const userid=req.body.userId;
  if(!userid){
    res.status(400).json({
        success:false,
      message:'product ID field is required '
    })
}else{
  //Order.find({ 'user.userId':    req.userdata._id })
Order.find({userId:userid})
.then(orders => {
  Console.log(orders)
  //console.log('my-order' + orders)
 //  res.render('shop/order', {
 //    path: '/order_path',
 //    title: 'Your Orders',
 //    heading:'order page',
 //    orders: orders
 //  });
 res.status(201).json({
   success:true,
   message:'product is diaplayed in order page successfully',
   product_data:orders
})
})
.catch(err =>
  //console.log(err)
  res.status(400).json({
   success:false,
   message:'internal server error'
 })
  );

}

};



