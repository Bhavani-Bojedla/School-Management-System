const mongoose=require('mongoose');
// require('dotenv').config()

const dbconnect=async(req,res)=>{
      try{
        await mongoose.connect(process.env.MONGODB_URL)
        .then(()=>{
          console.log("connected to db")
        })
      }
      catch(e){
           res.status(400).json({
            msg:"not connected"
           })
      }
}

dbconnect();