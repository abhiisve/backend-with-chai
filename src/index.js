// require('dotenv').config({path: './env'});
import dotenv from 'dotenv';

import connectDb from "./db/index.js";

dotenv.config({
  path: '.env'
})


connectDb();

then(()=>{
  app.listen((process.env.PORT || 7000), ()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
  })
})
.catch((error)=>{
  console.log("mongo db connnection error!!!",error);
});





/*

import express from "express";
const app = express();

;(async ()=> {
    try {
      await  mongoose.connect(`${process.env.MongoDB_URI}/${DB_name}`);
app.on("error",(error)=>{
    console.log("errr: ",error);
    throw error
})

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
  })
}
     catch (error) {
        console.error("Error :",error);
        
    }
})()    */