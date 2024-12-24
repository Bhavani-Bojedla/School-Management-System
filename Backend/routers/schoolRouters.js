const express=require("express");
const { registerSchool, getSchools, loginSchool, updateSchool, getSchoolOwnData } = require("../Controllers/schoolController");
const authMiddleware=require("../auth/auth")

const router=express.Router();

router.post("/register",registerSchool);
router.get("/all",getSchools);
router.get("/login",loginSchool);
router.patch("/update",authMiddleware(['SCHOOL']),updateSchool);
router.get("/fetch-single",authMiddleware(['SCHOOL']),getSchoolOwnData);
 

module.exports=router;