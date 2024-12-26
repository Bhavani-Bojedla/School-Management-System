require('dotenv').config()
const express=require("express");
const cors=require("cors");
// const mongoose=require("mongoose")
const cookieparser=require("cookie-parser") 
require("./connection/conn")
const app=express();
app.use(cors());
//routers
const schoolRouter=require("./routers/schoolRouters");


//routers using
app.use("/api/school",schoolRouter);


app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieparser());


const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log("server is running at port->", PORT);
})