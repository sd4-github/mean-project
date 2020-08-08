const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const path=require('path');
const admin=require('./routes/admin');
const shop=require('./routes/shop');
const authrouter=require('./routes/authrouter');
const mongoose=require('mongoose');
const dburl=""   //url which is copied
const userModel=require('./models/usermodel');

const cors=require('cors');  //cross origine resource sharing is a mechanism that uses additional http headers 
                            //to tell browsers to give a webapplication running at one 
                           //origin, access to selected resourses from a different origin
const multer=require('multer');//Multer is a node.js middleware for handling multipart/formdata,which is primarily used 


app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');

    next();
})   

// const store = new MongoDBStore({
//                     uri:'mongodb+srv://ivyhazra:ivyhazra1996@cluster0-656si.mongodb.net/shop',
//                     collection: 'sessions'
//                   });       //created collection mysession to store the session information,create connection 


app.use('./Images',express.static(path.join(__dirname,'Images')));//to store images
                  //to use the images folder after adding it to database
                  const fileStorage=multer.diskStorage({   //
                      destination:(req,file,cb)=>{
                          cb(null,'Images')
                      },
                      filename:(req,file,cb)=>{   //file is object
                           cb(null,file.originalname)
                        //cb(null,new Date().toISOString() + '_' + file.originalname);
                      }
                  });

  

// file.mimetype === 'image/jpg'
const fileFilter=(req,file,cb)=>{
  if(file.mimetype.includes("png") ||
  file.mimetype.includes("jpg") ||
  file.mimetype.includes("jpeg")){      //it returns true or false
      cb(null,true)
  }
  else{
      cb(null,false)
  }

}

app.use(multer({storage:fileStorage,fileFilter:fileFilter,limits:{fieldSize:1024*1024*5}}).single('prod_img')); //input filder name


app.use(admin);
app.use(shop);
app.use(authrouter);

app.use(cors());

app.use((req,res,next)=>{
    res.status(404).send('<h1>PAGE NOT FOUND</h1>');
})

mongoose.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true}).then(result=>{
    app.listen(4203,()=>{
        console.log("server is connected");
    })
}).catch(err=>{
    Console.log(err);
})
module.exports=express











