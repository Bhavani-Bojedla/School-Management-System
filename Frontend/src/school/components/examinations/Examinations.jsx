import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
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
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useFormik } from "formik";
import { examinationSchema } from "../../../yupSchema/examinationSchema";
import dayjs from "dayjs";
import { baseApi } from "../../../Environment";
import axios from "axios";
import MessageSnackbar from "../../../Basic utitlity compoenents/SnackBar/MessageSnackbar";

export default function Examinations() {
  const [examinations, setExamination] = React.useState([]);
  const [subjects, setSubjects] = React.useState([]);
  const [classes, setClasses] = React.useState([]);
  const [selectedClass, setSelectedClass] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [messageType, setMessageType] = React.useState("success");
  const handleMessageClose = () => {
    setMessage("");
  };
  const handleMessageNew = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
  };

  const dateFormat = (dateDate) => {
    const date = new Date(dateDate);
    const dateHours = date.getHours();
    const dateMinutes = date.getMinutes();
    return (
      date.getDate() + "-" + (+date.getMonth() + 1) + "-" + date.getFullYear()
    );
  };
  const initialValues = {
    date: "",
    subject: "",
    examType: "",
  };
  const [openAdd, setopenAdd] = React.useState(false);
  const handleAddExam = () => {
    setopenAdd(true);
  };
  const handleAddCancel = () => {
    setopenAdd(false);
  };
  const [editId, setEditId] = React.useState(null);
  const handleEdit = (id) => {
    setEditId(id);
    const selectExamination = examinations.filter((x) => x._id === id);
    formik.setFieldValue("date", selectExamination[0].exam_date);
    formik.setFieldValue("subject", selectExamination[0].subject._id);
    formik.setFieldValue("examType", selectExamination[0].exam_type);
  };
  const handleEditCancel = () => {
    setEditId(null);
    formik.resetForm();
    setopenAdd(false);
  };
  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete")) {
      try {
        const response = await axios.delete(
          `${baseApi}/examination/delete/${id}`
        );
        console.log("delete exam", response);
        setMessage(response.data.message);
        setMessageType("success");
      } catch (e) {
        setMessage("Error in deleting examination");
        setMessageType("error");
        console.log("Error in deleting examination. Examination component", e);
      }
    }
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: examinationSchema,
    onSubmit: async (value) => {
      try {
        let URL = `${baseApi}/examination/create`;
        if (editId) {
          URL = `${baseApi}/examination/update/${editId}`;
        }
        console.log("Examination", value);
        const response = await axios.post(URL, {
          date: value.date,
          subjectId: value.subject,
          classId: selectedClass,
          examType: value.examType,
        });
        setMessage(response.data.message);
        setMessageType("success");
        formik.resetForm();
        if (editId) {
          setEditId(null);
          setopenAdd(false);
        }
        console.log("response new exam", response);
      } catch (e) {
        setMessage("Error in saving new examination");
        setMessageType("error");
        console.log("Error in creating examination. Examination component", e);
      }
    },
  });
  const fecthSubjects = async () => {
    try {
      const response = await axios.get(`${baseApi}/subject/all`);
      console.log("Examination Subjects", response);
      setSubjects(response.data.data);
    } catch (e) {
      console.log("Error in Subjects. Examination component", e);
    }
  };
  const fecthClasses = async () => {
    try {
      const response = await axios.get(`${baseApi}/class/all`);
      console.log("Examination Classes", response);
      setClasses(response.data.data);
      setSelectedClass(response.data.data[0]._id);
    } catch (e) {
      console.log("Error in Classes. Examination component", e);
    }
  };
  const fetchExaminations = async () => {
    try {
      console.log("id", selectedClass);
      if (selectedClass) {
        const response = await axios.get(
          `${baseApi}/examination/class/${selectedClass}`
        );
        setExamination(response.data.examinations);
        console.log("examinations", response);
      }
    } catch (error) {
      console.log("Error in fetching examinations", error);
    }
  };
  React.useEffect(() => {
    fecthClasses();
    fecthSubjects();
  }, []);
  React.useEffect(() => {
    fetchExaminations();
  }, [message, selectedClass]);

  return (
    <>
      {message && (
        <MessageSnackbar
          message={message}
          messageType={messageType}
          handleClose={handleMessageClose}
        />
      )}

      <Paper sx={{ marginBottom: "20px" }}>
        <Box>
          <FormControl sx={{ marginTop: "10px", minWidth: "200px" }}>
            <InputLabel id="demo-simple-select-label">Class</InputLabel>
            <Select
              onChange={(e) => {
                setSelectedClass(e.target.value);
              }}
              label="Subject"
              value={selectedClass}
            >
              <MenuItem value={""}>Select Class</MenuItem>
              {classes.map((x) => {
                return (
                  <MenuItem value={x._id} key={x._id}>
                    {x.class_text}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
      </Paper>
      <Paper>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={formik.handleSubmit}
          sx={{ width: "26vw", margin: "auto", minWidth: "310px" }}
        >
          {(openAdd || editId) && (
            <>
              <Typography variant="h4">
                {editId ? "Edit Exam" : "Add New Exam"}
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs} fullWidth>
                <DemoContainer components={["DatePicker"]} fullWidth>
                  <DatePicker
                    fullWidth
                    label="Date"
                    format="DD/MM/YYYY"
                    value={
                      formik.values.date ? dayjs(formik.values.date) : null
                    }
                    onChange={(newValue) =>
                      formik.setFieldValue(
                        "date",
                        newValue ? newValue.toDate() : null
                      )
                    }
                  />
                </DemoContainer>
              </LocalizationProvider>
              {formik.touched.date && formik.errors.date && (
                <p style={{ color: "red", textTransform: "capitalize" }}>
                  {formik.errors.date}
                </p>
              )}
              <FormControl sx={{ marginTop: "10px" }} fullWidth>
                <InputLabel id="demo-simple-select-label">Subject</InputLabel>
                <Select
                  fullWidth
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="subject"
                  id="filled-basic"
                  label="Subject"
                  value={formik.values.subject}
                >
                  <MenuItem value={""}>Select Subject</MenuItem>
                  {subjects.map((subject) => {
                    return (
                      <MenuItem value={subject._id} key={subject._id}>
                        {subject.subject_name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              {formik.touched.subject && formik.errors.subject && (
                <p style={{ color: "red", textTransform: "capitalize" }}>
                  {formik.errors.subject}
                </p>
              )}
              <TextField
                fullWidth
                sx={{ marginTop: "10px" }}
                name="examType"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Exam Type"
                variant="filled"
                value={formik.values.examType}
              />
              {formik.touched.examType && formik.errors.examType && (
                <p style={{ color: "red", textTransform: "capitalize" }}>
                  {formik.errors.examType}
                </p>
              )}
              <Box  sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
              <Button
                sx={{ marginTop: "10px" }}
                type="submit"
                variant="contained"
              >
                Submit
              </Button>

              <Button
                sx={{ marginTop: "10px" }}
                onClick={editId ? handleEditCancel : handleAddCancel}
                type="button"
                variant="outlined"
              >
                Cancel
              </Button>
              </Box>
            </>
          )}
        </Box>
      </Paper>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Exam date</TableCell>
              <TableCell align="right">Subject</TableCell>
              <TableCell align="right">Exam Type</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {examinations.map((examination) => (
              <TableRow
                key={examination._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right" component="th" scope="row">
                  {dateFormat(examination.exam_date)}
                </TableCell>
                <TableCell align="right">
                  {examination.subject ? examination.subject.subject_name : ""}
                </TableCell>
                <TableCell align="right">{examination.exam_type}</TableCell>
                <TableCell align="right">
                  <Box
                    sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}
                  >
                    <Button
                      variant="contained"
                      sx={{ background: "skyblue" }}
                      onClick={() => handleEdit(examination._id)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ background: "tomato" }}
                      onClick={() => handleDelete(examination._id)}
                    >
                      Delete
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
        <Button variant="contained" onClick={handleAddExam}>
          Add New Exam
        </Button>
      </Box>
    </>
  );
}
