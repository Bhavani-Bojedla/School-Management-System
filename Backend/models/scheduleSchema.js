const mongoose=require("mongoose");

const scheduleSchema= new mongoose.Schema({
    startTime:{
        type:Date,
        required:true
    },
    endTime:{
        type:Date,
        required:true
    },
    teacher:{
      type:mongoose.Schema.ObjectId,
      ref:"teacher"
    },
    subject:{
        type:mongoose.Schema.ObjectId,
        ref:"subject"
      },
    class:{
        type:mongoose.Schema.ObjectId,
        ref:"class"
    },
    school:{
        type:mongoose.Schema.ObjectId,
        ref:"school"
    },
    createdAt:{
        type:Date,
        default:new Date()
    }, 
})

module.exports=mongoose.model("schedule",scheduleSchema)