const Subject = require("../models/subjectSchema");
const Exam=require("../models/examSchema");
const Schedule=require("../models/scheduleSchema");

const createSubject = async (req, res) => {
  try {
    const newSubject = new Subject({
      school: req.user.schoolId,
      subject_name: req.body.subject_name,
      subject_codename: req.body.subject_codename,
    });

    await newSubject.save();
    res.status(200).json({
      success: true,
      message: "Successfully created the Subject",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "server error in creating Subject",
    });
  }
};

const updateSubject=async(req,res)=>{
    try {
        let id=req.params.id;
        await Subject.findOneAndUpdate({_id:id},{$set:{...req.body}});
        const subjectAfterupdate=await Subject.findOne({_id:id});
        res.status(200).json({
            success: true,
            message: "Successfully updated the Subject",
            data:subjectAfterupdate
          });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "server error in updating subject",
          });
    }
}


const deleteSubject=async(req,res)=>{
    try {
        let id=req.params.id;
        let schoolId=req.user.schoolId;  

        const subjectExamCount=(await Exam.find({subject:id,school:schoolId})).length;
        const subjectScheduleCount=(await Schedule.find({subject:id,school:schoolId})).length;

        if(subjectExamCount===0 && subjectScheduleCount===0){
            await Subject.findByIdAndDelete({_id:id,school:schoolId});
            res.status(200).json({
                success: true,
                message: "Successfully Deleted the subject"
              });
        }else{
            res.status(500).jspn({
                success:false,
                message:"this subject is already in use"
            })
        }
       
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "server error in deleting subject",
          });
    }
}

const getAllSubjects=async(req,res)=>{
    try {
        const schoolId=req.user.schoolId;
        const allSubjects=await Subject.find({school:schoolId})
        res.status(200).json({
            success: true,
            message: "Successfully in fetching all the subject",
            data:allSubjects
          });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "server error in deleting subject",
          });
    }
}

module.exports = {createSubject,updateSubject,deleteSubject,getAllSubjects };
