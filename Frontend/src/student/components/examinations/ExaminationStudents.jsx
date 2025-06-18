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

export default function ExaminationStudents() {
  const [examinations, setExamination] = React.useState([]);
  const [subjects, setSubjects] = React.useState([]);
  const [selectedClass, setSelectedClass] = React.useState("");


  const dateFormat = (dateDate) => {
    const date = new Date(dateDate);
    return (
      date.getDate() + "-" + (+date.getMonth() + 1) + "-" + date.getFullYear()
    );
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
  const [className,setClassName]=React.useState("")
   const fetchStudent = async () => {
    try {
      const response = await axios.get(`${baseApi}/student/fetch-single`);
      console.log("student details", response.data);
      setClassName(response.data.student.student_class.class_text)

      setSelectedClass(response.data.student.student_class._id);
    } catch (error) {
      console.log("Error in student details", error);
    }
  };
  React.useEffect(() => {
    fetchStudent();
  }, []);

  React.useEffect(() => {
    fetchExaminations();
  }, [ selectedClass]);

  return (
    <>
    <Typography variant="h4">Examinations of your Class {className}</Typography>
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
