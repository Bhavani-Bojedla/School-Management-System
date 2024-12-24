const mongoose=require("mongoose");

const studentSchema= new mongoose.Schema({
    email:{
      type:String,
      required:true
    },
    name:{
        type:String,
        required:true
    },
    student_class:{
        type:String,
        required:true
    },
    age:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true,
    },
    guardian:{
        type:String,
        required:true
    },
    guardian_phone:{
        type:String,
        required:true
    },
    student_img:{
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

module.exports=mongoose.model("student",studentSchema)