const Examination = require("../models/examSchema");

const newExamination = async (req, res) => {
  try {
    const schoolId = req.user.schoolId;
    const { date, subjectId, examType, classId } = req.body;
    const newExamination = new Examination({
      school: schoolId,
      exam_date: date,
      subject: subjectId,
      exam_type: examType,
      class: classId,
    });
    const saveData = await newExamination.save();

    res.status(200).json({
      success: true,
      message: "Success in creating new Examination.",
      data: saveData,
    });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ success: false, message: "Error in creating new Examination." });
  }
};

const getAllExaminations = async (req, res) => {
  try {
    const schoolId = req.user.schoolId;
    const examinations = await Examination.find({ school: schoolId });

    res.status(200).json({ success: true, examinations });
  } catch (e) {
    res
      .status(500)
      .json({ success: false, message: "Error in fetching Examination." });
  }
};

const getExaminationByClass = async (req, res) => {
  try {
    const schoolId = req.user.schoolId;
    const classId = req.params.id;
    const examinations = await Examination.find({
      school: schoolId,
      class: classId,
    }).populate("subject");

    res.status(200).json({ success: true, examinations });
  } catch (e) {
    res
      .status(500)
      .json({ success: false, message: "Error in fetching Examination." });
  }
};

const updateExaminationWithId = async (req, res) => {
  try {
    const schoolId = req.user.schoolId;
    const examinationId = req.params.id;
    const { date, subjectId, examType } = req.body;
    await Examination.findByIdAndUpdate(
      { _id: examinationId, school: schoolId },
      {
        $set: {
          examDate: date,
          subject: subjectId,
          examType: examType,
        },
      }
    );
    res
      .status(200)
      .json({ success: true, message: "Examination is updated successfully." });
  } catch (e) {
    res
      .status(500)
      .json({ success: false, message: "Error in updating Examination." });
  }
};

const deleteExaminationWithId = async (req, res) => {
  try {
    const schoolId = req.user.schoolId;
    const examinationId = req.params.id;
    await Examination.findByIdAndDelete({
      _id: examinationId,
      school: schoolId,
    });

    res
      .status(200)
      .json({ success: true, message: "Examination is deleted successfully." });
  } catch (e) {
    res
      .status(500)
      .json({ success: false, message: "Error in deleting Examination." });
  }
};

module.exports = {
  newExamination,
  getAllExaminations,
  getExaminationByClass,
  updateExaminationWithId,
  deleteExaminationWithId,
};
