const formidable = require("formidable");
const path = require("path");
const fs = require("fs");
const Student = require("../models/studentSchema");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerStudent = async (req, res) => {
  try {
    const form = new formidable.IncomingForm();
    form.parse(req, async (e, fields, files) => {
      const student = await Student.findOne({ email: fields.email[0] });
      if (student) {
        return res.status(409).json({
          success: false,
          message: "Email is already registered",
        });
      } else {
        const photo = files.student_img[0];
        let filepath = photo.filepath;
        let originalFilename = photo.originalFilename.replace(" ", "_");
        let newpath = path.join(
          __dirname,
          process.env.STUDENT_IMAGE_PATH,
          originalFilename
        );
        let photoData = fs.readFileSync(filepath);
        fs.writeFileSync(newpath, photoData);

        const salt = bcrypt.genSaltSync(10);
        const hashpassword = bcrypt.hashSync(fields.password[0], salt);

        const newstudent = new Student({
          school: req.user.schoolId,
          name: fields.name[0],
          email: fields.email[0],
          student_class: fields.student_class[0],
          age: fields.age[0],
          gender: fields.gender[0],
          guardian: fields.guardian[0],
          guardian_phone: fields.guardian_phone[0],
          student_img: originalFilename,
          password: hashpassword,
        });

        const savedstudent = await newstudent.save();
        res.status(200).json({
          success: true,
          data: savedstudent,
          message: "student is created succesfully",
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "student creation is failed",
    });
  }
};

const loginStudent = async (req, res) => {
  try {
    const student = await Student.findOne({ email: req.body.email });

    if (student) {
      const isAuth = bcrypt.compareSync(req.body.password, student.password);
      if (isAuth) {
        const jwtSecret = process.env.JWT_SECRET;
        const token = jwt.sign(
          {
            id: student._id,
            schoolId: student.school,
            name: student.name,
            image_url: student.student_img,
            role: "STUDENT",
          },
          jwtSecret
        );
        res.header("Authorization", token);
        res.status(200).json({
          success: true,
          message: "Success Login",
          user: {
            id: student._id,
            schoolId: student.school,
            name: student.name,
            image_url: student.student_img,
            role: "STUDENT",
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
      message: "Internal Server Error [student login]",
    });
  }
};

const getStudents = async (req, res) => {
  try {
    const filterQuery = {};
    const schoolId = req.user.schoolId;
    filterQuery["school"] = schoolId;

    if (req.query.hasOwnProperty("search")) {
      filterQuery["name"] = { $regex: req.query.search, $options: "i" };
    }

    if (req.query.hasOwnProperty("student_class")) {
      filterQuery["student_class"] = req.query.student_class;
    }
    const students = await Student.find(filterQuery)
      .select(["-password"])
      .populate({ path: "student_class", select: "class_text class_num" });
    res.status(200).json({
      success: true,
      message: "Succcess in fetching all students.",
      students,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error [All student Data]",
    });
  }
};

const getStudentOwnData = async (req, res) => {
  try {
    const id = req.user.id;
    const schoolId = req.user.schoolId;
    const student = await Student.findOne({ _id: id, school: schoolId }).select(
      ["-password"]
    );
    if (student) {
      res.status(200).json({
        success: true,
        student,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error [own student Data]",
    });
  }
};

const getStudentwithId = async (req, res) => {
  try {
    const id = req.params.id;
    const schoolId = req.user.schoolId;
    const student = await Student.findOne({ _id: id, school: schoolId }).select(
      ["-password"]
    );
    if (student) {
      res.status(200).json({
        success: true,
        student,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error [own student Data]",
    });
  }
};

const updateStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const schoolId = req.user.schoolId;
    const form = new formidable.IncomingForm();
    form.parse(req, async (e, fields, files) => {
      const student = await Student.findOne({ _id: id, school: schoolId });
      if (files.image) {
        const photo = files.image[0];
        let filepath = photo.filepath;
        let originalFilename = photo.originalFilename.replace(" ", "_");
        if (student.student_img) {
          let oldImagePath = path.join(
            __dirname,
            process.env.STUDENT_IMAGE_PATH,
            student.student_img
          );
          if (fs.existsSync(oldImagePath)) {
            fs.unlink(oldImagePath, (e) => {
              if (e) console.log("Error deleting old image", e);
            });
          }
        }
        let newpath = path.join(
          __dirname,
          process.env.STUDENT_IMAGE_PATH,
          originalFilename
        );
        let photoData = fs.readFileSync(filepath);
        fs.writeFileSync(newpath, photoData);

        Object.keys(fields).forEach((field) => {
          student[field] = fields[field][0];
        });
        student.student_img = originalFilename;
        if (fields.password) {
          const salt = bcrypt.genSaltSync(10);
          const hashpassword = bcrypt.hashSync(fields.password[0], salt);
          student.password = hashpassword;
        }
      } else {
        Object.keys(fields).forEach((field) => {
          student[field] = fields[field][0];
        });
        // student["name"] = fields.name[0];
      }
      await student.save();
      res.status(200).json({
        success: true,
        message: "Student Updates successfully",
        student,
      });
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Student creation is failed",
    });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const schoolId = req.user.schoolId;
    await Student.findByIdAndDelete({ _id: id, school: schoolId });
    const students = await Student.find({ school: schoolId });
    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
      students,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Student deletion is failed",
    });
  }
};

module.exports = {
  registerStudent,
  loginStudent,
  getStudents,
  getStudentwithId,
  getStudentOwnData,
  updateStudent,
  deleteStudent,
};
