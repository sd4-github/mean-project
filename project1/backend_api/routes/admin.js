
const express=require('express');
const path=require('path');
const router=express.Router();
const isauth=require('../middleware/isauth')


const admin=require('../controllers/admin')

//router.get('/add_product_path',isauth,admin.getproductForm)

//router.post('/addproduct',isauth,admin.postproductform)  //with isauth

router.post('/addproduct',admin.postproductform)

//router.get('/adminproduct',isauth,admin.getProductDetails)  //with isauth

router.get('/adminproduct',admin.getProductDetails)

//router.get('/admin/admin_edit_product/:prodId',isauth,admin.getAdminEdit) // with isauth

router.get('/admin/admin_edit_product/:prodId',admin.getAdminEdit)

 //router.post('/admin/admin_edit_product',isauth,admin.postAdminEdit) //with isauth

router.post('/admin/admin_edit_product',admin.postAdminEdit)

 //router.post('/admin/delete_prod',isauth,admin.postDeleteItem)  //with isauth

router.post('/admin/delete_prod',admin.postDeleteItem)

module.exports=router;
