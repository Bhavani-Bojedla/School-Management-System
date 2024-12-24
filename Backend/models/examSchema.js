const mongoose=require("mongoose");

const examSchema= new mongoose.Schema({
    exam_date:{
      type:Date,
      required:true
    },
    exam_type:{
        type:String,
        required:true
    },
    class:{
        type:mongoose.Schema.ObjectId,
        ref:"class"
    },
    subject:{
        type:mongoose.Schema.ObjectId,
        ref:"subject"
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

module.exports=mongoose.model("exam",examSchema)