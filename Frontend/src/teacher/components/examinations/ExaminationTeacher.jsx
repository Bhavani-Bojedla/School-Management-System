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

export default function ExaminationTeacher() {
  const [examinations, setExamination] = React.useState([]);
  const [subjects, setSubjects] = React.useState([]);
  const [classes, setClasses] = React.useState([]);
  const [selectedClass, setSelectedClass] = React.useState("");


  const dateFormat = (dateDate) => {
    const date = new Date(dateDate);
    return (
      date.getDate() + "-" + (+date.getMonth() + 1) + "-" + date.getFullYear()
    );
  };
 
  // const fecthSubjects = async () => {
  //   try {
  //     const response = await axios.get(`${baseApi}/subject/all`);
  //     console.log("Examination Subjects", response);
  //     // setSubjects(response.data.data);
  //   } catch (e) {
  //     console.log("Error in Subjects. Examination component", e);
  //   }
  // };
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
    // fecthSubjects();
  }, []);
  React.useEffect(() => {
    fetchExaminations();
  }, [ selectedClass]);

  return (
    <>
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
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right"><b>Exam date</b></TableCell>
              <TableCell align="right"><b>Subject</b></TableCell>
              <TableCell align="right"><b>Exam Type</b></TableCell>
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
               
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
