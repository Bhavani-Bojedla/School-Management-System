const express=require("express");
const {createSchedule,getScheduleWithClass,updateSchedule ,deleteSchedule,getScheduleWithId,getScheduleWithClassAndTeacher} = require("../Controllers/scheduleController");
const authMiddleware=require("../auth/auth")

const router=express.Router();

router.post("/create",authMiddleware(['SCHOOL']),createSchedule);
router.get("/fetch-with-class/:id",authMiddleware(['SCHOOL','TEACHER']),getScheduleWithClass);
router.get( "/fetch-with-class-and-teacher", authMiddleware(["SCHOOL", "TEACHER"]),  getScheduleWithClassAndTeacher);
router.get("/fetch/:id",authMiddleware(['SCHOOL']),getScheduleWithId);
router.put("/update/:id",authMiddleware(['SCHOOL']),updateSchedule);
router.delete("/delete/:id",authMiddleware(['SCHOOL']),deleteSchedule);
  

module.exports=router;