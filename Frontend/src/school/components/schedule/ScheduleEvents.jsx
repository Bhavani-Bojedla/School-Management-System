import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseApi } from "../../../Environment";
import { periodSchema } from "../../../yupSchema/periodSchema";
import dayjs from "dayjs";

export default function ScheduleEvents({
  selectedClass,
  handleEventClose,
  handleMessageNew,
  handleNewEvent,
  edit,
  selectedEventId,
  handleDeleteEvent
}) {
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

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete?")) {
      axios
        .delete(`${baseApi}/schedule/delete/${selectedEventId}`)
        .then((res) => {
          handleDeleteEvent(selectedEventId)
          handleMessageNew(res.data.message, "success");
          handleCancel();
        })
        .catch((e) => {
          console.log("Error", e);
          handleMessageNew("Error in delete Schedule.", "error");
        });
    }
  };

  const handleCancel = () => {
    formik.resetForm();
    handleEventClose();
  };

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
      let [startHour, startMinute] = values.periods.split(",")[0].split(":");
      let [endHour, endMinute] = values.periods.split(",")[1].split(":");
      const startDate = new Date(values.date);
      startDate.setHours(startHour, startMinute, 0, 0);

      const endDate = new Date(values.date);
      endDate.setHours(endHour, endMinute, 0, 0);

      let BACKEND_URL = `${baseApi}/schedule/create`;
      let method = "post";

      if (edit) {
        BACKEND_URL = `${baseApi}/schedule/update/${selectedEventId}`;
        method = "put";
      }

      axios[method](BACKEND_URL, {
        ...values,
        selectedClass,
        startTime: startDate,
        endTime: endDate,
      })
        .then((resp) => {
          const newEvent = {
            id: resp.data.newSchedule._id,
            title: `Sub: ${resp.data.newSchedule.subject.subject_name}, Teacher: ${resp.data.newSchedule.teacher.name}`,
            start: new Date(resp.data.newSchedule.startTime),
            end: new Date(resp.data.newSchedule.endTime),
          };
          handleNewEvent(newEvent);
          formik.resetForm();
          handleEventClose();
          handleMessageNew(resp.data.message, "success");
        })
        .catch((e) => {
          console.log("error bl", e);
          handleMessageNew("Error in creation of Schedule", "error");
        });
    },
  });

  const fetchData = async () => {
    try {
      const teacherResponse = await axios.get(`${baseApi}/teacher/fetch-with-query`);
      const subjectResponse = await axios.get(`${baseApi}/subject/all`);
      setTeachers(teacherResponse.data.teachers);
      setSubjects(subjectResponse.data.data);
      console.log("teachers",teacherResponse)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedEventId) {
      axios
        .get(`${baseApi}/schedule/fetch/${selectedEventId}`)
        .then((resp) => {
          const scheduleData = resp.data.data;
          formik.setFieldValue("teachers", scheduleData.teacher._id);
          formik.setFieldValue("subjects", scheduleData.subject._id);

          const start = new Date(scheduleData.startTime);
          const end = new Date(scheduleData.endTime);
          const periodValue = `${start.getHours()}:${start
            .getMinutes()
            .toString()
            .padStart(2, "0")},${end.getHours()}:${end
            .getMinutes()
            .toString()
            .padStart(2, "0")}`;
          formik.setFieldValue("periods", periodValue);
          formik.setFieldValue("date", start);
        })
        .catch((e) => {
          console.log("Error", e);
        });
    }
  }, [selectedEventId]);

  return (
    <div>
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
          {edit ? "Edit Period" : "Add New Period"}
        </Typography>

        <FormControl fullWidth>
          <InputLabel>Teachers</InputLabel>
          <Select
            value={formik.values.teachers}
            label="Teacher"
            name="teachers"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            {Teachers.map((item) => (
              <MenuItem key={item._id} value={item._id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {formik.touched.teachers && formik.errors.teachers && (
          <p style={{ color: "red", textTransform: "capitalize" }}>
            {formik.errors.teachers}
          </p>
        )}

        <FormControl fullWidth>
          <InputLabel>Subjects</InputLabel>
          <Select
            value={formik.values.subjects}
            label="Subjects"
            name="subjects"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            {Subjects.map((item) => (
              <MenuItem key={item._id} value={item._id}>
                {item.subject_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {formik.touched.subjects && formik.errors.subjects && (
          <p style={{ color: "red", textTransform: "capitalize" }}>
            {formik.errors.subjects}
          </p>
        )}

        <FormControl fullWidth>
          <InputLabel>Periods</InputLabel>
          <Select
            value={formik.values.periods}
            label="Periods"
            name="periods"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            {Periods.map((item) => (
              <MenuItem
                key={item.id}
                value={`${item.startTime},${item.endTime}`}
              >
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {formik.touched.periods && formik.errors.periods && (
          <p style={{ color: "red", textTransform: "capitalize" }}>
            {formik.errors.periods}
          </p>
        )}

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              label="Date"
              format="DD/MM/YYYY"
              value={formik.values.date ? dayjs(formik.values.date) : null}
              onChange={(newValue) =>
                formik.setFieldValue(
                  "date",
                  newValue ? newValue.toDate() : null
                )
              }
            />
          </DemoContainer>
        </LocalizationProvider>

        {/* Conditional Buttons */}
        {!edit && (
          <Button type="submit" variant="contained">
            Submit
          </Button>
        )}

        {edit && (
          <>
            <Button type="submit" variant="contained">
              Update
            </Button>
            <Button
              type="button"
              variant="contained"
              sx={{ background: "red" }}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </>
        )}

        <Button type="button" variant="outlined" onClick={handleCancel}>
          Cancel
        </Button>
      </Box>
    </div>
  );
}
