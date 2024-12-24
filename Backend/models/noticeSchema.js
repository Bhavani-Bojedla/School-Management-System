const mongoose=require("mongoose");

const noticeSchema= new mongoose.Schema({
    title:{
      type:String,
      required:true
    },
    message:{
        type:String,
        required:true
    },
    audience:{
        type:String,
        enum:['student','teacher'],
        required:true
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

module.exports=mongoose.model("notice",noticeSchema)