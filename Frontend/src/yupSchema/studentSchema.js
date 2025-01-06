import * as yup from 'yup';

export const studentSchema=yup.object({
    name:yup.string().min(3,"Student name must contain 3 characters.").required("Student name is required."),
    email:yup.string().email("It must be an email.").required("Email is required."),
    student_class:yup.string().required("Student class is a required"),
    age:yup.string().required("Age is a required field"),
    gender:yup.string().required("Gender is a required field"),
    guardian:yup.string().min(4,"Must contain 4 characters.").required("Guardian  is a required field"),
    guardian_phone:yup.string().min(10,"Must contain 10 characters").max(11,"Can't extend 11 characters").required("Guardian Phone Number  is a required field"),
    password:yup.string().min(8,"Password must contain 8 characters").required("Password is required."),
    confirm_password:yup.string().oneOf([yup.ref('password')],"Password must match with Password").required("Confirm Password is required.")
})

export const studentEditSchema=yup.object({
    name:yup.string().min(3,"Student name must contain 3 characters.").required("Student name is required."),
    email:yup.string().email("It must be an email.").required("Email is required."),
    student_class:yup.string().required("Student class is a required"),
    age:yup.string().required("Age is a required field"),
    gender:yup.string().required("Gender is a required field"),
    guardian:yup.string().min(4,"Must contain 4 characters.").required("Guardian  is a required field"),
    guardian_phone:yup.string().min(10,"Must contain 10 characters").max(11,"Can't extend 11 characters").required("Guardian Phone Number  is a required field"),
    password:yup.string().min(8,"Password must contain 8 characters"),
    confirm_password:yup.string().oneOf([yup.ref('password')],"Password must match with Password")
})