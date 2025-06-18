const express=require("express");
const authMiddleware=require("../auth/auth");
const { createClass, getAllClasses, updateClass, deleteClass ,getSingleClasses,getAttendeeClasses} = require("../Controllers/classController");

const router=express.Router();

router.post("/create",authMiddleware(['SCHOOL']),createClass);
router.get("/all",authMiddleware(['SCHOOL','TEACHER']),getAllClasses);
router.get("/single/:id",authMiddleware(['SCHOOL']),getSingleClasses);
router.get("/attendee",authMiddleware(['TEACHER']),getAttendeeClasses);
router.patch("/update/:id",authMiddleware(['SCHOOL']),updateClass);
router.delete("/delete/:id",authMiddleware(['SCHOOL']),deleteClass);
 

module.exports=router;