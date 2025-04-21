import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
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
import MessageSnackbar from "../../../Basic utitlity compoenents/SnackBar/MessageSnackbar";

export default function ScheduleEvents({ selectedClass,handleEventClose ,handleMessageNew,handleNewEvent}) {
  const Periods = [
    {
      id: 1,
      label: "period 1 (10:00 AM - 11:00 AM)",
      startTime: "10:00",
      endTime: "11:00",
    },
    {
      id: 2,
      label: "period 2 (11:00 AM - 12:00 PM)",
      startTime: "11:00",
      endTime: "12:00",
    },
    {
      id: 3,
      label: "period 3 (12:00 PM - 1:00 PM)",
      startTime: "12:00",
      endTime: "13:00",
    },
    {
      id: 4,
      label: "Lunch Break (1:00 PM - 2:00 PM)",
      startTime: "13:00",
      endTime: "14:00",
    },
    {
      id: 5,
      label: "period 4 (2:00 PM - 3:00 PM)",
      startTime: "14:00",
      endTime: "15:00",
    },
    {
      id: 6,
      label: "period 5 (3:00 PM - 4:00 PM)",
      startTime: "15:00",
      endTime: "16:00",
    },
  ];
  const [Teachers, setTeachers] = useState([]);
  const [Subjects, setSubjects] = useState([]);
  const initialValues = {
    teachers: "",
    subjects: "",
    periods: "",
    date: new Date(),
  };

  const formik = useFormik({
    initialValues,
    validationSchema: periodSchema,
    onSubmit: (values) => {
      let date = values.date;
      let startTime = values.periods.split(",")[0];
      let endTime = values.periods.split(",")[1];
      console.log(values)
      axios
        .post(`${baseApi}/schedule/create`, {
          ...values,
          selectedClass,
          startTime: new Date(
            date.setHours(startTime.split(":")[0], startTime.split(":")[1])
          ),
          endTime: new Date(
            date.setHours(endTime.split(":")[0], endTime.split(":")[1])
          ),
        })
        .then((resp) => {
          console.log("response", resp);
          const newEvent = {
            id: resp.data.newSchedule._id, // Assuming API returns new schedule ID
            title: `Sub: ${resp.data.newSchedule.subject.subject_name}, Teacher: ${resp.data.newSchedule.teacher.name}`,
            start: new Date(resp.data.newSchedule.startTime),
            end: new Date(resp.data.newSchedule.endTime),
          };
          console.log(newEvent)
          handleNewEvent(newEvent);
          formik.resetForm();
          handleEventClose();
          handleMessageNew(resp.data.message,"success");
        })
        .catch((e) => {
          console.log("error",e)
          handleMessageNew("Error in creation of Schedule","error");
    });
    },
  });

  const fetchData = async () => {
    try {
      const teacherResponse = await axios.get(`${baseApi}/teacher/all`, {
        params: {},
      });
      const subjectResponse = await axios.get(`${baseApi}/subject/all`, {
        params: {},
      });
      setTeachers(teacherResponse.data.teachers);
      setSubjects(subjectResponse.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      {/* {message && <MessageSnackbar message={message} messageType={messageType} handleClose={handleMessageClose} />} */}
      
      <div>Schedule Event</div>
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
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          Add New Period
        </Typography>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Teachers</InputLabel>
          <Select
            value={formik.values.teachers}
            label="Teacher"
            name="teachers"
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
        {formik.touched.teachers && formik.errors.teachers && (
          <p style={{ color: "red", textTransform: "capitalize" }}>
            {formik.errors.teachers}
          </p>
        )}

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Subjects</InputLabel>
          <Select
            value={formik.values.subjects}
            label="Subjects"
            name="subjects"
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

        {formik.touched.subjects && formik.errors.subjects && (
          <p style={{ color: "red", textTransform: "capitalize" }}>
            {formik.errors.subjects}
          </p>
        )}

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Periods</InputLabel>
          <Select
            value={formik.values.periods}
            label="Periods"
            name="periods"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            {Periods &&
              Periods.map((item) => {
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

        {formik.touched.periods && formik.errors.periods && (
          <p style={{ color: "red", textTransform: "capitalize" }}>
            {formik.errors.periods}
          </p>
        )}

        {/* <Box sx={{ minWidth: 120 }}> */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
               label="Date"
               value={formik.values.date ? dayjs(formik.values.date) : null}
               onChange={(newValue) => {
                 formik.setFieldValue("date", newValue ? newValue.toDate() : null);
               }}
            />
          </DemoContainer>
        </LocalizationProvider>
        {/* </Box> */}

        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Box>
    </div>
  );
}
