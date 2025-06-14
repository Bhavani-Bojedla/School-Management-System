import * as yup from "yup";

export const examinationSchema = yup.object({
  date: yup.date().required("date is required"),
  subject: yup.string().required("Subject is a required field."),
  examType: yup.string().required("Exam type is required field."),
});
