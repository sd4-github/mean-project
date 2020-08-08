const express=require('express');
const path=require('path');
const router=express.Router();
const isauth=require('../middleware/isauth');

const product=require('../controllers/products');


router.get('/product_list_path',product.getproductListForm)

router.get('/product_list_path/:prod_id',product.getProductDetails);

router.get('/cart_path/:userId',product.getCart);

router.post('/addcart',product.postCart);

router.post('/cart-delete-item',product.postCartDeleteProduct );

router.get('/checkout/:userId',product.getCheckout);

router.post('/pcheckout',product.postCheckout);

//                    router.get('/order_path',product.getOrders);

//router.post('/add-order',product.postOrder);


module.exports=router;