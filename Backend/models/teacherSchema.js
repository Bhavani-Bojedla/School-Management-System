const mongoose=require("mongoose");

const teacherSchema= new mongoose.Schema({
    name:{
      type:String,
      required:true
    },
    email:{
        type:String,
        required:true
    },
    qualification:{
        type:String,
      required:true
    },
    age:{
        type:String,
        required:true
    },
    gender:{
        type:String,
      required:true
    },
    teacher_img:{
        type:String,
      required:true
    },
    password:{
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

module.exports=mongoose.model("teacher",teacherSchema)