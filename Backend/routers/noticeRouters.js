const express=require("express");
const authMiddleware=require("../auth/auth");
const { createNotice, getAllNotices, updateNotice, deleteNotice ,} = require("../Controllers/noticeController");

const router=express.Router();

router.post("/create",authMiddleware(['SCHOOL']),createNotice);
router.get("/all",authMiddleware(['SCHOOL']),getAllNotices);
router.patch("/update/:id",authMiddleware(['SCHOOL']),updateNotice);
router.delete("/delete/:id",authMiddleware(['SCHOOL']),deleteNotice);
 

module.exports=router;