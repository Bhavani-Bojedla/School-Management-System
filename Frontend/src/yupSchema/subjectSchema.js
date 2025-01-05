import * as yup from 'yup';

export const subjectSchema=yup.object({
    subject_name:yup.string().min(2,"Atleast 2 characters are required").required("Subject name is required field."),
    subject_codename:yup.string().required("Subject codename is a required field."),
})