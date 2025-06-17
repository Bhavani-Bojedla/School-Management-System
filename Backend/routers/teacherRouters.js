const express=require("express");
const authMiddleware=require("../auth/auth");
const { registerTeacher, getTeachers, updateTeacher, getTeacherOwnData, getTeacherwithId, deleteTeacher, loginTeacher } = require("../Controllers/teacherController");

const router=express.Router();

router.post("/register",authMiddleware(['SCHOOL']),registerTeacher);
router.get("/fetch-with-query",authMiddleware(['SCHOOL']),getTeachers);
router.post("/login",loginTeacher);
router.patch("/update/:id",authMiddleware(['SCHOOL']),updateTeacher);
router.get("/fetch-single",authMiddleware(['TEACHER']),getTeacherOwnData);
router.get("/fetch/:id",authMiddleware(['SCHOOL']),getTeacherwithId);
router.delete("/delete/:id",authMiddleware(['SCHOOL']),deleteTeacher);
 

module.exports=router;