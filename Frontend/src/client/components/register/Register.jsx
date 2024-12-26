import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Form, useFormik } from "formik";
import { registerSchema } from "../../../yupSchema/registerSchema";
import { Button, CardMedia, Typography } from "@mui/material";
import axios from "axios";
export default function Register() {
  const [file, setfile] = React.useState(null);
  const [imageurl, setimageurl] = React.useState(null);

  const fileInputRef = React.useState(null);
  const handleClearfile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setfile(null);
    setimageurl(null);
  };
  const initialValues = {
    school_name: "",
    email: "",
    owner_name: "",
    password: "",
    confirm_password: "",
  };
  const formik = useFormik({
    initialValues,
    validationSchema: registerSchema,
    onSubmit: (values) => {
      console.log("Register submit values", values);
      const fd = new FormData();
      fd.append("school_img", file, file.name);
      fd.append("school_name", values.school_name);
      fd.append("email", values.email);
      fd.append("owner_name", values.owner_name);
      fd.append("password", values.password);

      axios
        .post(`http://localhost:5000/api/school/register`, fd)
        .then((res) => {
          console.log(res.data);
          formik.resetForm();
          handleClearfile();
        })
        .catch((e) => {
          console.log(e);
        });
    },
  });

  const addImage = (event) => {
    const file = event.target.files[0];
    setimageurl(URL.createObjectURL(file));
    setfile(file);
  };
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1 },
        display: "flex",
        flexDirection: "column",
        width: "60vw",
        minWidth: "2px",
        margin: "auto",
      }}
      noValidate
      autoComplete="off"
      onSubmit={formik.handleSubmit}
    >
      <Typography>Add your School Picture</Typography>
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
        name="school_name"
        label="School Name"
        value={formik.values.school_name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.school_name && formik.errors.school_name && (
        <p style={{ color: "red", textTransform: "capitalize" }}>
          {formik.errors.school_name}
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
        name="owner_name"
        label="Owner Name"
        value={formik.values.owner_name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.owner_name && formik.errors.owner_name && (
        <p style={{ color: "red", textTransform: "capitalize" }}>
          {formik.errors.owner_name}
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
  );
}
