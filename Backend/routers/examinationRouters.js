const express=require("express");
const {newExamination,getAllExaminations,getExaminationByClass,updateExaminationWithId,deleteExaminationWithId} = require("../Controllers/examinationController");
const authMiddleware=require("../auth/auth")

const router=express.Router();

router.post("/create",authMiddleware(['SCHOOL']),newExamination);
router.get("/all",authMiddleware(['SCHOOL']),getAllExaminations);
router.get("/class/:id",authMiddleware(['SCHOOL','TEACHER','STUDENT']),getExaminationByClass);
router.get("/update/:id",authMiddleware(['SCHOOL']),updateExaminationWithId);
router.delete("/delete/:id",authMiddleware(['SCHOOL']),deleteExaminationWithId);



module.exports=router;