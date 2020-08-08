const User=require('../models/usermodel');
const mongodb=require('mongodb');
const ObjectId=mongodb.ObjectId;
const bcrypt=require('bcryptjs');

const nodmailer=require('nodemailer');
const sendGrid=require('nodemailer-sendgrid-transport');
const jwt=require('jsonwebtoken');

const transport=nodmailer.createTransport(sendGrid({            //to call the api of sendgrid apikey
    auth:{
        api_key:'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'
    }
}))


// exports.getSignUp=(req,res,next)=>{
//     let msg=req.flash('err');
//     if(msg.length>0){
//         msg=msg[0];
//     }
//     else{
//         msg=null;
//     }
//     res.render('auth/signup',{
//         path:'/signup_path',
//         heading:'sign up',
//         title:'Sign Up Here',
//         errormsg:msg

//     })

// }


exports.postSignUp=(req,res,next)=>{

    const firstname=req.body.firstname;
    const lastname=req.body.lastname;
    const email=req.body.email;
    const password=req.body.password;
    const cpassword=req.body.cpassword;

    if(!firstname){
        return res.status(400).json({
            success:false,
            message:'first name is required'
        })
    }
    if(!lastname){
        return res.status(400).json({
            success:false,
            message:'last name is required'
        })
    }

    if(!email){
        return res.status(400).json({
            success:false,
            message:'email is required'
        })
    }

    if(!password){
        return res.status(400).json({
            success:false,
            message:'password is required'
        })
    }
    else{

        User.findOne({email:email}).then(userEmail=>{
            if(userEmail){
                if(userEmail){
                    res.status(400).json({
                        success:false,
                        message:'email already exist '
                    })
                }
                console.log(userEmail);
                 return res.redirect('/signup_path')
            }
               return bcrypt.hash(password,12)
               .then(
                    hashPassword=>{
                     const Udetails=new User({
                         firstname:firstname,
                         lastname:lastname,
                         usertype:"user",
                         email:email,
                         password:hashPassword
                         //:{items:[]}
                     })
                     return Udetails.save()
                    }).then(
                    result=>{
                        console.log(result);
                     //res.redirect('/signin_path');
                     res.status(201).json({
                         success:true,
                         message:'registration successful',
                         register_data:result
                     })
                    return    transport.sendMail({
                            to:email,
                            from:'hazraivy@gmail.com',
                            subject:'Sign up successfully',
                            html:'<h1>you have created your account</h1>'
                        })
                       
                    }).catch(
                    err=>{
                        console.log(err);
                    }
                )
                }).catch((err)=>{
                   if(err){
                       res.status(400).json({
                           success:false,
                           message:'internal server error'
                       })
                   }
                }) 
            }
    }


// exports.getSignIn=(req,res,next)=>{

//    let msg=req.flash('err');
//     if(msg.length>0){
//         msg=msg[0];
//     }
//     else{
//         msg=null;
//     }
//     res.render('auth/signin',{
//         title:'sign in',
//         heading:'Sign in page',
//         path:'/signin_path',
//         errormsg:msg
//     })
// }

exports.postSignIn=(req,res,next)=>{
    const email=req.body.email;
    const password=req.body.password;

    if(!email){
        res.status(400).json({
            success:false,
          message:'email field is required '
        })
    }
    
    if(!password){
        res.status(400).json({
            success:false,
          message:'password field is required '
        })
    }
    else{
        let usr_data
        User.findOne({email:email}).then((usermail)=>{              //findOne match the email with the database and gives all data in usermail
            usr_data=usermail
               if(!usr_data){
                 res.status(400).json({
                    success:false,
                    message:'email not exist '
                })                               // if usermail is incorrect
            }
            const valid=bcrypt.compareSync(password,usr_data.password)  //compare is comes from bcrypt,it compare with given password with database password 
                if(!valid){
                    res.status(400).json({
                        success:false,
                        message:'password not exist '
                    })

                }else{

                    const token=jwt.sign({email:usr_data.email},'secrect',{expiresIn:'1h'});
                    res.status(200).json({
                        success:true,
                        message:'Login successful',
                        user_name:usr_data.firstname,
                        user_id:usr_data._id,
                        user_email:usr_data.email,
                        token:token,
                        usertype:usr_data.usertype
                    })
                }
            }).catch((err)=>{
                if(err){
                    res.status(400).json({
                        success:false,
                         message:'internal server error'
                    })

                }
                
                })
    
    }
}


exports.postLogout=(req,res,next)=>{
    req.session.destroy((err)=>{
         //console.log(err);
        // res.redirect('/signin_path');
        if(!err){
            res.status(200).json({
                success:true,
                 message:'Log out successful'
            })

        }
        
        })
    }


    

