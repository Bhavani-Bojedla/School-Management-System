const express=require("express");
const {createSchedule,getScheduleWithClass,updateSchedule ,deleteSchedule} = require("../Controllers/scheduleController");
const authMiddleware=require("../auth/auth")

const router=express.Router();

router.post("/create",authMiddleware(['SCHOOL']),createSchedule);
router.get("/fetch-with-class-id",authMiddleware(['SCHOOL']),getScheduleWithClass);
router.patch("/update/:id",authMiddleware(['SCHOOL']),updateSchedule);
router.delete("/delete/:id",authMiddleware(['SCHOOL']),deleteSchedule);
  

module.exports=router;