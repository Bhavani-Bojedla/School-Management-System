const mongoose=require("mongoose");

const classSchema= new mongoose.Schema({
    class_text:{
      type:String,
      required:true
    },
    class_num:{
        type:String,
        required:true
    },
    attendee:{
        type:mongoose.Schema.ObjectId,
        ref:"teacher"
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

module.exports=mongoose.model("class",classSchema)