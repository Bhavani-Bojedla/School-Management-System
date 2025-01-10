import * as yup from 'yup';

export const periodSchema=yup.object({
    teacher:yup.string().required("Teacher is required field."),
    subject:yup.string().required("Subject is a required field."),
    period:yup.string().required("Period is a required field."),
    date:yup.date().required("date is required")
})