const express=require('express');
const path=require('path');
const router=express.Router();
const isauth=require('../middleware/isauth');


const authController=require('../controllers/authcontroler')


//router.get('/signup_path',authController.getSignUp);
router.post('/sign-up',authController.postSignUp);

//router.get('/signin_path',authController.getSignIn);
router.post('/login',authController.postSignIn);

//router.get('/nav',authController.getNavbar);
router.post('/logout',authController.postLogout);

module.exports=router;