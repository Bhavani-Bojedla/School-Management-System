const mongoose=require("mongoose");

const subjectSchema= new mongoose.Schema({
    subject_name:{
      type:String,
      required:true
    },
    subject_codename:{
        type:String,
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

module.exports=mongoose.model("subject",subjectSchema)