const express=require("express");
const authMiddleware=require("../auth/auth");
const { createClass, getAllClasses, updateClass, deleteClass } = require("../Controllers/classController");

const router=express.Router();

router.post("/create",authMiddleware(['SCHOOL']),createClass);
router.get("/all",authMiddleware(['SCHOOL']),getAllClasses);
router.patch("/update/:id",authMiddleware(['SCHOOL']),updateClass);
router.delete("/delete/:id",authMiddleware(['SCHOOL']),deleteClass);
 

module.exports=router;