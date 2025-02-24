import * as yup from 'yup';

export const periodSchema=yup.object({
    teachers:yup.string().required("Teacher is required field."),
    subjects:yup.string().required("Subject is a required field."),
    periods:yup.string().required("Period is a required field."),
    date:yup.date().required("date is required")
})