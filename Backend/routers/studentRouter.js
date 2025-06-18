const express=require("express");
const authMiddleware=require("../auth/auth");
const { registerStudent, getStudents, loginStudent, updateStudent, getStudentOwnData, deleteStudent, getStudentwithId } = require("../Controllers/studentController");

const router=express.Router();

router.post("/register",authMiddleware(['SCHOOL']),registerStudent);
router.get("/fetch-with-query",authMiddleware(['SCHOOL','TEACHER']),getStudents);
router.post("/login",loginStudent);
router.patch("/update/:id",authMiddleware(['SCHOOL']),updateStudent);
router.get("/fetch-single",authMiddleware(['STUDENT']),getStudentOwnData);
router.get("/fetch/:id",authMiddleware(['SCHOOL']),getStudentwithId);
router.delete("/delete/:id",authMiddleware(['SCHOOL']),deleteStudent);
 

module.exports=router;