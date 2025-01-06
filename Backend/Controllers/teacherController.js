const formidable = require("formidable");
const path = require("path");
const fs = require("fs");
const Teacher = require("../models/teacherSchema");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerTeacher = async (req, res) => {
  try {
    const form = new formidable.IncomingForm();
    form.parse(req, async (e, fields, files) => {
      const teacher = await Teacher.findOne({ email: fields.email[0] });
      if (teacher) {
        return res.status(409).json({
          success: false,
          message: "Email is already registered",
        });
      } else {
        const photo = files.teacher_img[0];
        let filepath = photo.filepath;
        let originalFilename = photo.originalFilename.replace(" ", "_");
        let newpath = path.join(
          __dirname,
          process.env.TEACHER_IMAGE_PATH,
          originalFilename
        );
        let photoData = fs.readFileSync(filepath);
        fs.writeFileSync(newpath, photoData);

        const salt = bcrypt.genSaltSync(10);
        const hashpassword = bcrypt.hashSync(fields.password[0], salt);

        const newteacher = new Teacher({
          school: req.user.schoolId,
          name: fields.name[0],
          email: fields.email[0],
          age: fields.age[0],
          gender: fields.gender[0],
          qualification: fields.qualification[0],
          teacher_img: originalFilename,
          password: hashpassword,
        });

        const savedteacher = await newteacher.save();
        res.status(200).json({
          success: true,
          data: savedteacher,
          message: "teacher is created succesfully",
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "teacher creation is failed",
    });
  }
};

const loginTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findOne({ email: req.body.email });

    if (teacher) {
      const isAuth = bcrypt.compareSync(req.body.password, teacher.password);
      if (isAuth) {
        const jwtSecret = process.env.JWT_SECRET;
        const token = jwt.sign(
          {
            id: teacher._id,
            schoolId: teacher.school,
            name: teacher.name,
            image_url: teacher.teacher_img,
            role: "TEACHER",
          },
          jwtSecret
        );
        res.header("Authorization", token);
        res.status(200).json({
          success: true,
          message: "Success Login",
          user: {
            id: teacher._id,
            schoolId: teacher.school,
            name: teacher.name,
            image_url: teacher.teacher_img,
            role: "TEACHER",
          },
        });
      } else {
        res.status(401).json({
          success: false,
          message: "Password is incorrect.",
        });
      }
    } else {
      res.status(401).json({
        success: false,
        message: "Email is not registered",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error [teacher login]",
    });
  }
};

const getTeachers = async (req, res) => {
  try {
    const filterQuery = {};
    const schoolId = req.user.schoolId;
    filterQuery["school"] = schoolId;

    if (req.query.hasOwnProperty("search")) {
      filterQuery["name"] = { $regex: req.query.search, $options: "i" };
    }

    const teachers = await Teacher.find(filterQuery);
    res.status(200).json({
      success: true,
      message: "Succcess in fetching all teachers.",
      teachers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error [All teacher Data]",
    });
  }
};

const getTeacherOwnData = async (req, res) => {
  try {
    const id = req.user.id;
    const schoolId = req.user.schoolId;
    const teacher = await Teacher.findOne({ _id: id, school: schoolId }).select(
      ["-password"]
    );
    if (teacher) {
      res.status(200).json({
        success: true,
        teacher,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error [own teacher Data]",
    });
  }
};

const getTeacherwithId = async (req, res) => {
    try {
      const id = req.params.id;
      const schoolId = req.user.schoolId;
      const teacher = await Teacher.findOne({ _id: id, school: schoolId }).select(
        ["-password"]
      );
      if (teacher) {
        res.status(200).json({
          success: true,
          teacher,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Teacher not found",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error [own teacher Data]",
      });
    }
  };

const updateTeacher = async (req, res) => {
  try {
    const id = req.params.id;
    const schoolId=req.user.schoolId;
    const form = new formidable.IncomingForm();
    form.parse(req, async (e, fields, files) => {
      const teacher = await Teacher.findOne({ _id: id ,school:schoolId});
      if (files.image) {   
        const photo = files.image[0];
        let filepath = photo.filepath;
        let originalFilename = photo.originalFilename.replace(" ", "_");
        if (teacher.teacher_img) {
          let oldImagePath = path.join(
            __dirname,
            process.env.TEACHER_IMAGE_PATH,
            teacher.teacher_img
          );
          if (fs.existsSync(oldImagePath)) {
            fs.unlink(oldImagePath, (e) => {
              if (e) console.log("Error deleting old image", e);
            });
          }
        }
        let newpath = path.join(
          __dirname,
          process.env.TEACHER_IMAGE_PATH,
          originalFilename
        );
        let photoData = fs.readFileSync(filepath);
        fs.writeFileSync(newpath, photoData);

        Object.keys(fields).forEach((field) => {
          teacher[field] = fields[field][0];
        });
        teacher.teacher_img = originalFilename;
        if(fields.password){
          const salt = bcrypt.genSaltSync(10);
          const hashpassword = bcrypt.hashSync(fields.password[0], salt);
          teacher.password=hashpassword
        }
      } else {
        Object.keys(fields).forEach((field) => {
          teacher[field] = fields[field][0];
        });
      }
      await teacher.save();
      res.status(200).json({
        success: true,
        message: "Teacher Updates successfully",
        teacher,
      });
    });
  } catch (error) {
    res.status(500).json({
      success: false, 
      message: "Teacher creation is failed",
    });
  }
};

const deleteTeacher=async(req,res)=>{
     try {
        const id=req.params.id;
        const schoolId=req.user.schoolId;
        await Teacher.findByIdAndDelete({_id:id,school:schoolId});
        const teachers= await Teacher.find({school:schoolId});
        res.status(200).json({
            success: true,
            message: "Teacher deleted successfully",
            teachers,
          });
     } catch (error) {
        res.status(500).json({
            success: false,
            message: "Teacher deletion is failed",
          });
     }
}

module.exports = {
  registerTeacher,
  loginTeacher,
  getTeachers,
  getTeacherwithId,
  getTeacherOwnData,
  updateTeacher,
  deleteTeacher
};
