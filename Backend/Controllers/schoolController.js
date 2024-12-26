const formidable = require("formidable");
const path = require("path");
const fs = require("fs");
const school = require("../models/schoolSchema");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerSchool = async (req, res) => {
  try {
    const form = new formidable.IncomingForm();
    form.parse(req, async (e, fields, files) => {
      const schoolimg = await school.find({ email: fields.email[0] });
      if (schoolimg) {
        return res.status(409).json({
          success: false,
          message: "Email is already registered",
        });
      } else {
        const photo = files.school_img[0];
        let filepath = photo.filepath;
        let originalFilename = photo.originalFilename.replace(" ", "_");
        let newpath = path.join(
          __dirname,
          process.env.SCHOOL_IMAGE_PATH,
          originalFilename
        );
        let photoData = fs.readFileSync(filepath);
        fs.writeFileSync(newpath, photoData);

        const salt = bcrypt.genSaltSync(10);
        const hashpassword = bcrypt.hashSync(fields.password[0], salt);

        const newschool = new school({
          school_name: fields.school_name[0],
          email: fields.email[0],
          owner_name: fields.owner_name[0],
          school_img: originalFilename,
          password: hashpassword,
        });

        const savedschool = await newschool.save();
        res.status(200).json({
          success: true,
          data: savedschool,
          message: "school is created succesfully",
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "school creation is failed",
    });
  }
};

const loginSchool = async (req, res) => {
  try {
    const school = await school.findOne({ email: req.body.email });
    if (school) {
      const isAuth = bcrypt.compareSync(req.body.password, school.password);
      if (isAuth) {
        const jwtSecret = process.env.JWT_SECRET;
        const token = jwt.sign(
          {
            id: school._id,
            schoolId: school._id,
            owner_name: school.owner_name,
            school_name: school.school_name,
            image_url: school.school_img,
            role: "SCHOOL",
          },
          jwtSecret
        );
        res.header("Authorization", token);
        res.status(200).json({
          success: true,
          message: "Success Login",
          user: {
            id: school._id,
            owner_name: school.owner_name,
            school_name: school.school_name,
            image_url: school.img,
            role: "SCHOOL",
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
      message: "Internal Server Error [school login]",
    });
  }
};

const getSchools = async (req, res) => {
  try {
    const schools = await school
      .find()
      .select(["-password", "-_id", "-email", "-owner_name", "-createdAt"]);
    res.status(200).json({
      success: true,
      message: "Succcess in fetching all schools.",
      schools,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error [All school Data]",
    });
  }
};

const getSchoolOwnData = async (req, res) => {
  try {
    const id = req.user.id;
    const School = await school.findOne({ _id: id });
    if (School) {
      res.status(200).json({
        success: true,
        School,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "School not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error [own school Data]",
    });
  }
};

const updateSchool = async (req, res) => {
  try {
    const id = req.user.id;
    const form = new formidable.IncomingForm();
    form.parse(req, async (e, fields, files) => {
      const School = await school.findOne({ _id: id });
      if (files.image) {
        const photo = files.image[0];
        let filepath = photo.filepath;
        let originalFilename = photo.originalFilename.replace(" ", "_");
        if (School.school_img) {
          let oldImagePath = path.join(
            __dirname,
            process.env.SCHOOL_IMAGE_PATH,
            School.school_img
          );
          if (fs.existsSync(oldImagePath)) {
            fs.unlink(oldImagePath, (e) => {
              if (e) console.log("Error deleting old image", e);
            });
          }
        }
        let newpath = path.join(
          __dirname,
          process.env.SCHOOL_IMAGE_PATH,
          originalFilename
        );
        let photoData = fs.readFileSync(filepath);
        fs.writeFileSync(newpath, photoData);

        Object.keys(fields).forEach((field) => {
          School[field] = fields[field][0];
        });
        await School.save();
        res.status(200).json({
          success: true,
          message: "School Updates successfully",
          School,
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "school creation is",
    });
  }
};

module.exports = {
  registerSchool,
  loginSchool,
  getSchools,
  getSchoolOwnData,
  updateSchool,
};
