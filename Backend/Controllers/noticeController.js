const Notice = require("../models/noticeSchema");

const createNotice = async (req, res) => {
  try {
    const { title, message, audience } = req.body;
    const newNotice = new Notice({
      school: req.user.schoolId,
      title: title,
      message:message,
      audience: audience,
    });

    await newNotice.save(); 
    res.status(200).json({
      success: true,
      message: "Successfully created the Notice",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "server error in creating Notice",
    });
  }
};

const updateNotice = async (req, res) => {
  try {
    let id = req.params.id;
    await Notice.findOneAndUpdate({ _id: id }, { $set: { ...req.body } });
    const NoticeAfterupdate = await Notice.findOne({ _id: id });
    res.status(200).json({
      success: true,
      message: "Successfully updated the Notice",
      data: NoticeAfterupdate,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "server error in updating Notice",
    });
  }
};

const deleteNotice = async (req, res) => {
  try {
    let id = req.params.id;
    let schoolId = req.user.schoolId;

    await Notice.findByIdAndDelete({ _id: id, school: schoolId });
    res.status(200).json({
      success: true,
      message: "Successfully Deleted the Notice",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "server error in deleting Notice",
    });
  }
};

const getAllNotices = async (req, res) => {
  try {
    const schoolId = req.user.schoolId;
    const allNotices = await Notice.find({ school: schoolId });
    res.status(200).json({
      success: true,
      message: "Successfully in fetching all the Notice",
      data: allNotices,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "server error in getting Notices",
    });
  }
};

module.exports = { createNotice, updateNotice, deleteNotice, getAllNotices };
