const express=require("express");
const { markAttendance, getAttendance, checkAttendance } = require("../Controllers/attendanceController");
const authMiddleware=require("../auth/auth")

const router=express.Router();

router.post("/mark",authMiddleware(['TEACHER']),markAttendance);
router.get("/:studentId",authMiddleware(['SCHOOL','STUDENT']),getAttendance);
router.get("/check/:classId",authMiddleware(['TEACHER']),checkAttendance);


module.exports=router;