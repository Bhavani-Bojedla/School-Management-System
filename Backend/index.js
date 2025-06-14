require("dotenv").config();
const express = require("express");
const cors = require("cors");
// const mongoose=require("mongoose")
const cookieparser = require("cookie-parser");
require("./connection/conn");
const app = express();
const corsOption={exposedHeaders:'Authorization'}
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());



app.get("/",(req,res)=>{
  res.send("hello")
})

//routers
const schoolRouter = require("./routers/schoolRouters");
const classRouter=require("./routers/classRouters")
const subjectRouter=require("./routers/subjectRouter")
const teacherRouter=require("./routers/teacherRouters")
const studentRouter=require("./routers/studentRouter")
const scheduleRouter=require("./routers/scheduleRouter")
const attendanceRouter=require("./routers/attendanceRouters");
const examinationRouter=require("./routers/examinationRouters");
//routers using
app.use("/api/school", schoolRouter);
app.use("/api/class",classRouter);
app.use("/api/subject",subjectRouter);
app.use("/api/student",studentRouter);
app.use("/api/teacher",teacherRouter);
app.use("/api/schedule",scheduleRouter);
app.use("/api/attendance",attendanceRouter);
app.use("/api/examination",examinationRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("server is running at port->", PORT);
});
