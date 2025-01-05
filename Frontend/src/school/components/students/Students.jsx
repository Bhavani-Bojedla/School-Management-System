import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Form, useFormik } from "formik";
import { registerSchema } from "../../../yupSchema/registerSchema";
import { Button, CardMedia, Typography } from "@mui/material";
import axios from "axios";
import Snackbar from "../../../Basic utitlity compoenents/SnackBar/MessageSnackbar";
import { studentSchema } from "../../../yupSchema/studentSchema";
import MessageSnackbar from "../../../Basic utitlity compoenents/SnackBar/MessageSnackbar";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function Student() {
  const [classes,setClasses]=React.useState([]);
  const [file, setfile] = React.useState(null);
  const [imageurl, setimageurl] = React.useState(null);
  const [message, setMessage] = React.useState("");
  const [messageType, setMessageType] = React.useState("success");
  const handleMessageClose = () => {
    setMessage("");
  };
  const fileInputRef = React.useRef(null);
  const handleClearfile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setfile(null);
    setimageurl(null);
  };
  const initialValues = {
    name: "",
    email: "",
    student_class: "",
    age: "",
    gender: "",
    guardian: "",
    guardian_phone: "",
    password: "",
    confirm_password: "",
  };
  const formik = useFormik({
    initialValues,
    validationSchema: studentSchema,
    onSubmit: (values) => {
      console.log("Register submit values", values);
      if (file) {
        const fd = new FormData();
        fd.append("student_img", file, file.name);
        fd.append("name", values.name);
        fd.append("email", values.email);
        fd.append("age", values.age);
        fd.append("gender", values.gender);
        fd.append("student_class", values.student_class);
        fd.append("guardian", values.guardian);
        fd.append("guardian_phone", values.guardian_phone);
        fd.append("password", values.password);

        axios
          .post(`http://localhost:5000/api/student/register`, fd)
          .then((res) => {
            console.log(res);
            setMessageType("success");
            setMessage(res.data.message);
            formik.resetForm();
            handleClearfile();
          })
          .catch((e) => {
            console.log(e);
            setMessageType("error");
            setMessage(e.response.data.message);
          });
      } else {
        setMessageType("error");
        setMessage("Please Add School Image");
      }
    },
  });

  const addImage = (event) => {
    const file = event.target.files[0];
    setimageurl(URL.createObjectURL(file));
    setfile(file);
  };

  return (
    <Box
      component={"div"}
      sx={{
        // background:
        //   "url(https://cdn.pixabay.com/photo/2017/08/12/21/42/back2school-2635456_1280.png)",
        // backgroundSize: "cover",
        // backgroundRepeat: "no-repeat",
        height: "100%",
        paddingTop: "60px",
        paddingBottom: "60px",
      }}
    >
      {message && (
        <MessageSnackbar
          message={message}
          messageType={messageType}
          handleClose={handleMessageClose}
        />
      )}
      <Typography variant="h2" sx={{ textAlign: "center" }}>
        Regsiter
      </Typography>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1 },
          display: "flex",
          flexDirection: "column",
          width: "50vw",
          minWidth: "230px",
          margin: "auto",
          background: "#fff",
        }}
        noValidate
        autoComplete="off"
        onSubmit={formik.handleSubmit}
      >
        <Typography>Add the Student Picture</Typography>
        <TextField
          type="file"
          inputRef={fileInputRef}
          onChange={(event) => {
            {
              addImage(event);
            }
          }}
        />
        {imageurl && (
          <Box>
            <CardMedia component={"img"} image={imageurl} />
          </Box>
        )}
        <TextField
          name="name"
          label="Student Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.name && formik.errors.name && (
          <p style={{ color: "red", textTransform: "capitalize" }}>
            {formik.errors.name}
          </p>
        )}

        <TextField
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email && (
          <p style={{ color: "red", textTransform: "capitalize" }}>
            {formik.errors.email}
          </p>
        )}

        <TextField
          name="student_class"
          label="Student Class"
          value={formik.values.student_class}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Student Class</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formik.values.student_class}
              label="student_class"
              name="student_class"
              onChange={formik.handleChange}
            >
              
              {classes && classes.map(student_class=>{
                return <MenuItem value={"female"}>Female</MenuItem>
              })}
            </Select>
          </FormControl>
        </Box>

        {formik.touched.student_class && formik.errors.student_class && (
          <p style={{ color: "red", textTransform: "capitalize" }}>
            {formik.errors.student_class}
          </p>
        )}

        <TextField
          name="age"
          label="Age"
          value={formik.values.age}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.age && formik.errors.age && (
          <p style={{ color: "red", textTransform: "capitalize" }}>
            {formik.errors.age}
          </p>
        )}

        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formik.values.gender}
              label="gender"
              name="gender"
              onChange={formik.handleChange}
            >
              <MenuItem value={"female"}>Female</MenuItem>
              <MenuItem value={"male"}>Male</MenuItem>
              <MenuItem value={"other"}>Other</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {formik.touched.gender && formik.errors.gender && (
          <p style={{ color: "red", textTransform: "capitalize" }}>
            {formik.errors.gender}
          </p>
        )}

        <TextField
          name="guardian"
          label="Guardian"
          value={formik.values.guardian}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.guardian && formik.errors.guardian && (
          <p style={{ color: "red", textTransform: "capitalize" }}>
            {formik.errors.guardian}
          </p>
        )}

        <TextField
          name="guardian_phone"
          label="Guardian Phone"
          value={formik.values.guardian_phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.guardian_phone && formik.errors.guardian_phone && (
          <p style={{ color: "red", textTransform: "capitalize" }}>
            {formik.errors.guardian_phone}
          </p>
        )}

        <TextField
          type="password"
          name="password"
          label="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password && formik.errors.password && (
          <p style={{ color: "red", textTransform: "capitalize" }}>
            {formik.errors.password}
          </p>
        )}

        <TextField
          type="password"
          name="confirm_password"
          label="Confirm Password"
          value={formik.values.confirm_password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.confirm_password && formik.errors.confirm_password && (
          <p style={{ color: "red", textTransform: "capitalize" }}>
            {formik.errors.confirm_password}
          </p>
        )}

        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Box>
    </Box>
  );
}
