const Product=require('../models/productmodel');
const mongodb=require('mongodb');
const ObjectId=mongodb.ObjectId;
const multer=require('multer');
// exports.getproductForm=(req,res,next)=>{
//     res.render("admin/add_product",{
//         title:"addproductform",
//         heading:"Add PRODUCT FORM",
//         path:"/add_product_path"
//     })
// }
const fileStorage=multer.diskStorage({   //
    destination:(req,file,cb)=>{
        cb(null,dir)
    },
    filename:(req,file,cb)=>{   //file is object
         cb(null,file.originalname)
      //cb(null,new Date().toISOString() + '_' + file.originalname);
    }
});


exports.postproductform=(req,res,next)=>{
   
    const prod=req.body.prodname;               //prod,prodquantity,prodp,imageurl,description are userdefind 
    const image=req.file;
   
    const imgpath=image.path;    //prodname,no_of_body,price,imgurl,description is same name in database and model
    const prodp=req.body.prod_price;
    const description=req.body.prod_desc;
  
    if(!prod){
        res.status(400).json({
            success:false,
          message:'product name field is required '
        })
    }

    if(!req.file){
        res.status(400).json({
            success:false,
          message:'product image field is required '
        })
    }
     if(!prodp){
        res.status(400).json({
            success:false,
          message:'product price field is required '
        })
    }
    if(!description){
        res.status(400).json({
            success:false,
          message:'product description field is required '
        })
    }
  
    else{
        // const url = req.protocol + '://' + req.get('host')

    const product=new Product({prodname:prod,
        imgurl: imgpath,
        price:prodp,description:description});
    product.save().then((result)=>{              //save is predefind function of mongoose to save data in database
      
        res.status(201).json({
            success:true,
            message:'product is added successfully',
            product_data:{

                prodname:result.prodname,
                imgurl:result.imgurl,
                price:result.price,
                description:result.description
            }
           

        })
   }).catch((err)=>{
       //console.log(err);
       res.status(400).json({
        success:false,
        message:'internal server error'
    })
   })
    //res.redirect("/adminproduct")
    }

}


exports.getProductDetails=(req,res,next)=>{
    Product.find().then(products=>{  
        //console.log("product"+products);               //find is used to fetch all data details
        // res.render("admin/admin_prod",{
        //     title:"PRODUCT DETAILS",
        //     data:products,
        //     path:"/adminproduct"
        // })
        res.status(201).json({
            success:true,
            message:'product is displayed successfully',
            product_data:products
        })

    }).catch((err)=>{
        res.status(400).json({
            success:false,
            message:'internal server error'
        })
       // console.log(err);
    })


}

// exports.getAdminProd=(req,res,next)=>{
//     res.render("admin_prod",{
//         title:adminproduct
//     })
// }


exports.getAdminEdit=(req,res,next)=>{
        const prodId=req.params.prodId;
        Product.findById(prodId).then(product=>{            //findById is predefind mongoose function
          if(!product){
            {
                res.status(400).json({
                    success:false,
                  message:'product name field is required '
                })
              //console.log("price"+product.price)
           // res.redirect('/add_product_path');
                }
            //   res.render('admin/admin_edit', {
            //     title: 'Edit Product',
            //     heading:'Admin editing page',
            //     path: '/admin/admin_edit_product',
            //     product:product
            //   })
        }
        else{
            res.status(201).json({
                success:true,
                message:'product is displayed successfully',
                product_data:product
            })

        
        }
    }).catch(err=>{
            //console.log(err)
            res.status(400).json({
              success:false,
              message:'internal server error'
          })
          })
         
};


exports.postAdminEdit=(req,res,next)=>{
    const prodId=req.body.productId;
    const updatedp_name=req.body.prodname;
   
    const updated_image=req.file;
     const updatedp_price=req.body.price;
    const updatedp_description=req.body.description;
   
    Product.findById(prodId).then((products)=>{   
       products.prodname=updatedp_name;               //name which is same as database like prodname ,price...
   
       products.price=updatedp_price;
       products.description=updatedp_description;
      // products.imgurl=updatedp_imageurl;
    if(updated_image)  {
        products.imgurl=updated_image.path
   
    }   
       return products.save();
    }).then((result)=>{
      return res.status(201).json({
           success:true,
           message:'product is edited successfully',
           product_data:result
       })
       // console.log('updated data' +result);
       // res.redirect('/adminproduct')
    }).catch((err)=>{
       res.status(400).json({
           success:false,
           message:'internal server error'
       })
       //console.log(err);
    })
}



exports.postDeleteItem=(req,res,next)=>{
        const prodId = req.body.productid;
        if(!prodId){
            res.status(400).json({
                success:false,
              message:'product Id field is required '
            })
        }
            else{
                Product.findByIdAndRemove(prodId).then(result=>{         //findByIdRemove is comes from mongoose it find by id and delete that product
                    //res.redirect('/adminproduct')
                    res.status(201).json({
                       success:true,
                       message:'product is deleted successfully',
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
