const Subject = require("../models/subjectSchema");
const Exam = require("../models/examSchema");
const Schedule = require("../models/scheduleSchema");

const createSchedule = async (req, res) => {
  // console.log("Incoming Request Body:", req.body);

  try {
    const newSchedule = new Schedule({
      school: req.user.schoolId,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      teacher: req.body.teachers,
      subject: req.body.subjects,
      class: req.body.selectedClass,
    });

    await newSchedule.save();
    // const populatedSchedule = await newSchedule.populate("teacher").populate("subject");
    const populatedSchedule = await Schedule.findById(newSchedule._id)
      .populate("teacher")
      .populate("subject");

    res.status(200).json({
      success: true,
      message: "Successfully created the Schedule",
      newSchedule: populatedSchedule,
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

    const updatedFields = {
      teacher: req.body.teachers,
      subject: req.body.subjects,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      class: req.body.selectedClass,
    };

    await Schedule.findOneAndUpdate({ _id: id }, { $set: updatedFields });

    const scheduleAfterupdate = await Schedule.findOne({ _id: id })
      .populate("teacher")
      .populate("subject");

    res.status(200).json({
      success: true,
      message: "Successfully updated the Schedule",
      newSchedule: scheduleAfterupdate,
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
  // console.log(req.params.id)
  try {
    const classId = req.params.id;
    const schoolId = req.user.schoolId;
    const Schedules = await Schedule.find({ school: schoolId, class: classId })
      .populate("teacher")
      .populate("subject");
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

const getScheduleWithId = async (req, res) => {
  // console.log(req.params.id)
  try {
    const id = req.params.id;
    const schoolId = req.user.schoolId;

    const scheduleData = await Schedule.findOne({ school: schoolId, _id: id })
      .populate("teacher")
      .populate("subject");

    res.status(200).json({
      success: true,
      message: "Successfully fetched the Schedule with ID",
      data: scheduleData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error in getting schedule by ID",
    });
  }
};

const getScheduleWithClassAndTeacher = async (req, res) => {
  try {
    const { classId, teacherId } = req.query;
    const schoolId = req.user.schoolId;

    const schedules = await Schedule.find({
      school: schoolId,
      class: classId,
      teacher: teacherId,
    })
      .populate("teacher")
      .populate("subject");

    res.status(200).json({
      success: true,
      message: "Successfully fetched schedule by class and teacher",
      data: schedules,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching schedule by class and teacher",
    });
  }
};


module.exports = {
  createSchedule,
  updateSchedule,
  deleteSchedule,
  getScheduleWithClass,
  getScheduleWithId,
  getScheduleWithClassAndTeacher
};
