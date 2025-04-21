const Subject = require("../models/subjectSchema");
const Exam = require("../models/examSchema");
const Schedule = require("../models/scheduleSchema");

const createSchedule = async (req, res) => {
  try {
    const newSchedule = new Schedule({
      school: req.user.schoolId,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      teacher: req.body.teachers,
      subject: req.body.subjects,
      class: req.body.selectedClass,
    });
    console.log(newSchedule)
    await newSchedule.save();
    const populatedSchedule = await newSchedule.populate("teacher").populate("subject");
    res.status(200).json({
      success: true,
      message: "Successfully created the Schedule",
      newSchedule:populatedSchedule
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "server error in creating Schedule",
      error: error.message, 
    });
  }
};

const updateSchedule = async (req, res) => {
  try {
    let id = req.params.id;
    await Schedule.findOneAndUpdate({ _id: id }, { $set: { ...req.body } });
    const scheduleAfterupdate = await Schedule.findOne({ _id: id });
    res.status(200).json({
      success: true,
      message: "Successfully updated the Schedule",
      data: scheduleAfterupdate,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "server error in updating Schedule",
    });
  }
};

const deleteSchedule = async (req, res) => {
  try {
    let id = req.params.id;
    let schoolId = req.user.schoolId;

    await Schedule.findByIdAndDelete({ _id: id, school: schoolId });
    res.status(200).json({
      success: true,
      message: "Successfully Deleted the Schedule",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "server error in deleting Schedule",
    });
  }
};

const getScheduleWithClass = async (req, res) => {
  console.log(req.params.id)
  try {
    const classId = req.params.id;
    const schoolId = req.user.schoolId;
    const Schedules = await Schedule.find({ school: schoolId, class: classId }).populate("teacher").populate("subject");
    res.status(200).json({
      success: true,
      message: "Successfully in fetching the Schedule with class",
      data: Schedules,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "server error in getting schedule of a class",

    });
  }
};

module.exports = {
  createSchedule,
  updateSchedule,
  deleteSchedule,
  getScheduleWithClass,
};
