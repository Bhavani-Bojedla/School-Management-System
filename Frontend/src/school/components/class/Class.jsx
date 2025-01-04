import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { classSchema } from "../../../yupSchema/classSchema";
import axios from "axios";
import { baseApi } from "../../../Environment";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Class() {
  const [classes, setClasses] = useState([]);

  const formik = useFormik({
    initialValues: { class_text: "", class_num: "" },
    validationSchema: classSchema,
    onSubmit: (values) => {
      // console.log(values);
      axios
        .post(`${baseApi}/class/create`, { ...values })
        .then((res) => {
          console.log("class add response", res);
         
        })
        .catch((error) => {
          console.log("error in class", error);
        });

      formik.resetForm();
    },
  });

  useEffect(()=>{
      axios.get(`${baseApi}/class/all`).then((res)=>{
        setClasses(res.data.data);
      }).catch((e)=>{
        console.log(e)
      })
  },[])
  return (
    <div>
      <h1>Class</h1>
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
        <Typography
          variant="h4"
          sx={{ textAlign: "center", fontWeight: "700" }}
        >
          Add New Class
        </Typography>
        <TextField
          name="class_text"
          label="Class Text"
          value={formik.values.class_text}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.class_text && formik.errors.class_text && (
          <p style={{ color: "red", textTransform: "capitalize" }}>
            {formik.errors.class_text}
          </p>
        )}

        <TextField
          name="class_num"
          label="class Number"
          value={formik.values.class_num}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.class_num && formik.errors.class_num && (
          <p style={{ color: "red", textTransform: "capitalize" }}>
            {formik.errors.class_num}
          </p>
        )}

        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Box>

      <Box
        component={"div"}
        sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
      >
        {classes &&
          classes.map((item) => {
          return  <Box component={"div"}  key={item._id}   sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
            <Box component={"div"} >
              <Typography>Class: {item.class_text} [{item.class_num}]</Typography>
            
            </Box>




            </Box>;
          })}
      </Box>
    </div>
  );
}
