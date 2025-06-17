const Class = require("../models/classSchema");
const Student = require("../models/studentSchema");
const Exam = require("../models/examSchema");
const Schedule = require("../models/scheduleSchema");

const createClass = async (req, res) => {
  try {
    const newClass = new Class({
      school: req.user.schoolId,
      class_text: req.body.class_text,
      class_num: req.body.class_num,
    });

    await newClass.save();
    res.status(200).json({
      success: true,
      message: "Successfully created the class",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "server error in creating class",
    });
  }
};

const updateClass = async (req, res) => {
  try {
    let id = req.params.id;
    await Class.findOneAndUpdate({ _id: id }, { $set: { ...req.body } });
    const classAfterupdate = await Class.findOne({ _id: id });
    res.status(200).json({
      success: true,
      message: "Successfully updated the class",
      data: classAfterupdate,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "server error in updating class",
    });
  }
};

const deleteClass = async (req, res) => {
  try {
    let id = req.params.id;
    let schoolId = req.user.schoolId;

    const classStudentCount = (
      await Student.find({ student_class: id, school: schoolId })
    ).length;
    const classExamCount = (await Exam.find({ class: id, school: schoolId }))
      .length;
    const classScheduleCount = (
      await Schedule.find({ class: id, school: schoolId })
    ).length;

    if (
      classStudentCount === 0 &&
      classExamCount === 0 &&
      classScheduleCount === 0
    ) {
      await Class.findByIdAndDelete({ _id: id, school: schoolId });
      res.status(200).json({
        success: true,
        message: "Successfully Deleted the class",
      });
    } else {
      res.status(500).jspn({
        success: false,
        message: "this class is already in use",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "server error in deleting class",
    });
  }
};

const getAllClasses = async (req, res) => {
  try {
    const schoolId = req.user.schoolId;
    const allClasses = await Class.find({ school: schoolId });
    res.status(200).json({
      success: true,
      message: "Successfully in fetching all the class",
      data: allClasses,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "server error in getting classes",
    });
  }
};

const getSingleClasses = async (req, res) => {
  try {
    const schoolId = req.user.schoolId;
    const classId = req.params.id;
    const allClasses = await Class.findOne({
      school: schoolId,
      _id: classId,
    }).populate("attendee");
    res.status(200).json({
      success: true,
      message: "Successfully in fetching single class",
      data: allClasses,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "server error in getting single class",
    });
  }
};

module.exports = {
  createClass,
  updateClass,
  deleteClass,
  getAllClasses,
  getSingleClasses,
};
