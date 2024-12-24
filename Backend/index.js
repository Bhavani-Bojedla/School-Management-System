require('dotenv').config()
const express=require("express");
const cors=require("cors");
// const mongoose=require("mongoose")
const cookieparser=require("cookie-parser") 
require("./connection/conn")

//routers
const schoolRouter=require("./routers/schoolRouters");


const app=express();


//routers using
app.use("/api/school",schoolRouter);


app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors());
app.use(cookieparser());


const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log("server is running at port->", PORT);
})