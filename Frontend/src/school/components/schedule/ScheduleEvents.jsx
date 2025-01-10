import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Formik, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseApi } from "../../../Environment";
import { periodSchema } from "../../../yupSchema/periodSchema";
import dayjs from "dayjs";

export default function ScheduleEvents() {
  const periods = [
    {
      id: 1,
      label: "period 1 (10:00 AM - 11:00 AM)",
      startTime: "10:00",
      endTime: "11:00",
    },
    {
      id: 2,
      label: "period 2 (11:00 AM - 12:00 PM)",
      startTime: "10:00",
      endTime: "11:00",
    },
    {
      id: 3,
      label: "period 3 (2:00 PM - 3:00 PM)",
      startTime: "10:00",
      endTime: "11:00",
    },
    {
      id: 4,
      label: "period 4 (2:00 PM - 3:00 PM)",
      startTime: "10:00",
      endTime: "11:00",
    },
    {
      id: 5,
      label: "period 5 (2:00 PM - 3:00 PM)",
      startTime: "10:00",
      endTime: "11:00",
    },
  ];

  const [Teachers, setTeachers] = useState([]);
  const [Subjects, setSubjects] = useState([]);
  const initialValues = {
    teacher: "",
    subject: "",
    period: "",
    date: null,
  };
  const formik = useFormik({
    initialValues,
    validationSchema: periodSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teacherResponse = await axios.get(`${baseApi}/teacher/all`);
        const subjectResponse = await axios.get(`${baseApi}/subject/all`);
        setTeachers(teacherResponse.data.teachers);
        setSubjects(subjectResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Schedule Event</h1>
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
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Teachers</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formik.values.teacher}
              label="teacher"
              name="teacher"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              {Teachers &&
                Teachers.map((item) => {
                  return (
                    <MenuItem key={item._id} value={item._id}>
                      {item.name}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
        </Box>
        {formik.touched.teacher && formik.errors.teacher && (
          <p style={{ color: "red", textTransform: "capitalize" }}>
            {formik.errors.teacher}
          </p>
        )}

        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Subjects</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formik.values.subject}
              label="subject"
              name="subject"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              {Subjects &&
                Subjects.map((item) => {
                  return (
                    <MenuItem key={item._id} value={item._id}>
                      {item.subject_name}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
        </Box>
        {formik.touched.subject && formik.errors.subject && (
          <p style={{ color: "red", textTransform: "capitalize" }}>
            {formik.errors.subject}
          </p>
        )}

        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Periods</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formik.values.period}
              label="Periods"
              name="period"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              {periods &&
                periods.map((item) => {
                  return (
                    <MenuItem
                      key={item.id}
                      value={`${item.startTime}, ${item.endTime}`}
                    >
                      {item.label}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
        </Box>
        {formik.touched.period && formik.errors.period && (
          <p style={{ color: "red", textTransform: "capitalize" }}>
            {formik.errors.period}
          </p>
        )}

        <Box sx={{minWidth:120}}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date"
            value={formik.values.date}
            onChange={(value) => formik.setFieldValue("date", value)}
            slots={{
              textField: (params) => <TextField {...params} />,
            }}
          />
        </LocalizationProvider>
        </Box>
        

        <Button type="submit" variant="contained">Submit</Button>
      </Box>
    </div>
  );
}
