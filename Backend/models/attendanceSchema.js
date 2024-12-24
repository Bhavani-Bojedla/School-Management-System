const mongoose=require("mongoose");

const attendanceSchema= new mongoose.Schema({
    status:{
        type:String,
        enum:['Present','Absent'],
        default:'Absent'
    },
    date:{
        type:Date,
        required:true
    },
    class:{
        type:mongoose.Schema.ObjectId,
        ref:"class"
    }, 
    student:{
        type:mongoose.Schema.ObjectId,
        ref:"student"
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

module.exports=mongoose.model("attendance",attendanceSchema)