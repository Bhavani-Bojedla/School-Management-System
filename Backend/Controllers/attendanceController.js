const Attendance = require("../models/attendanceSchema");
const moment = require("moment");
const markAttendance = async (req, res) => {
  try {
    const [studentId, date, status, classId] = req.body;
    const schoolId = req.user.schoolId;
    const newAttendance = new Attendance({
      student: studentId,
      date,
      status,
      class: classId,
      school: schoolId,
    });

    await newAttendance.save();
    res.status(201).json(newAttendance);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error in marking attendance" });
  }
};

const getAttendance = async (req, res) => {
  try {
    const { studentId } = req.params;

    const attendance = await Attendance.find({ student: studentId }).populate(
      "student"
    );
    res.status(200).json(attendance);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error in getting attendance" });
  }
};

const checkAttendance = async (req, res) => {
  try {
    const { classId } = req.params;
    const today = moment().startOf("day");
    const attendanceforToday = await Attendance.findOne({
      class: req.params.classId,
      date: {
        $gt: today.toDate(),
        $lt: moment(today).endOf("day").toDate(),
      },
    });

    if (attendanceforToday) {
      return res
        .status(200)
        .json({ attendanceTaken: true, message: "Attendance taken already" });
    } else {
      return res.status(200).json({
        attendanceTaken: false,
        message: "No attendance taken yet for today",
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error in checking attendance" });
  }
};

module.exports = { markAttendance, getAttendance, checkAttendance };
