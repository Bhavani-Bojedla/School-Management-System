import React, { useEffect, useState } from "react";
import { baseApi } from "../../../Environment";
import axios from "axios";
import {
  Alert,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import MessageSnackbar from "../../../Basic utitlity compoenents/SnackBar/MessageSnackbar";

export default function AttendanceTeacher() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [attendanceStatus, setAttendanceStatus] = useState([]);

  const [message, setMessage] = React.useState("");
  const [messageType, setMessageType] = React.useState("success");

  const handleMessageClose = () => {
    setMessage("");
  };

  const handleAttendance = (studentId, status) => {
    setAttendanceStatus((prevStatus) => ({
      ...prevStatus,
      [studentId]: status,
    }));
  };
  const singleStudentattendance = async (studentId, status) => {
    try {
      const response = await axios.post(`${baseApi}/attendance/mark`, {
        studentId,
        date: new Date(),
        classId: selectedClass,
        status,
      });
      // console.log("marking attendance", response);
    } catch (error) {
      console.log("Error in marking attendee", error);
    }
  };
  const submitAttendance = async () => {
    try {
      await Promise.all(
        students.map((student) => {
          singleStudentattendance(student._id, attendanceStatus[student._id]);
        })
      );
      setMessage("Attendance Submitted Successfully");
      setMessageType("success");
    } catch (error) {
      setMessage("Failed attendance submission");
      setMessageType("error");
      console.log("Error in marking all attendees", error);
    }
  };

  const fetchAttendeeClass = async () => {
    try {
      const response = await axios.get(`${baseApi}/class/attendee`);
      // console.log("attendee class", response);
      setClasses(response.data.data);
      if (response.data.data.length > 0) {
        setSelectedClass(response.data.data[0]._id);
      }
    } catch (error) {
      console.log("Error in fetching attendee class", error);
    }
  };

  useEffect(() => {
    fetchAttendeeClass();
  }, []);
  const [students, setStudents] = useState([]);
  const [attendanceChecked, setAttendanceChecked] = useState(false);
  const checkAttendanceAndFetchStudents = async () => {
    try {
      if (selectedClass) {
        const responseStudents = await axios.get(
          `${baseApi}/student/fetch-with-query`,
          {
            params: { student_class: selectedClass },
          }
        );
        const responseCheck = await axios.get(
          `${baseApi}/attendance/check/${selectedClass}`
        );
        if (!responseCheck.data.attendanceTaken) {
          setStudents(responseStudents.data.students);
          responseStudents.data.students.forEach((student) => {
            handleAttendance(student._id, "present");
          });
          console.log("students", responseStudents.data);
        } else {
          // setStudents([]);
          setAttendanceChecked(true);
        }
        console.log("check attendance", responseCheck);
      }
    } catch (error) {
      console.log("Error in checking attendance", error);
    }
  };

  useEffect(() => {
    checkAttendanceAndFetchStudents();
  }, [selectedClass, message]);

  return (
    <div>
      {message && (
        <MessageSnackbar
          message={message}
          messageType={messageType}
          handleClose={handleMessageClose}
        />
      )}
      <h1>AttendanceTeacher</h1>
      {classes.length > 0 ? (
        <Paper sx={{ marginBottom: "20px" }}>
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
            You are attendee of {classes.length} classes.
          </Alert>
          <Box>
            <FormControl sx={{ marginTop: "10px", minWidth: "200px" }}>
              <InputLabel id="demo-simple-select-label">Class</InputLabel>
              <Select
                onChange={(e) => {
                  setSelectedClass(e.target.value);
                  setAttendanceChecked(false);
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
      ) : (
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="error">
          You are not attendee of any class.
        </Alert>
      )}
      {attendanceChecked ? (
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="info">
          Attendance has already been taken for this class.
        </Alert>
      ) : students.length > 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">
                  <b>Name</b>
                </TableCell>
                <TableCell align="right">
                  <b>Action</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow
                  key={student._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right">{student.name}</TableCell>
                  <TableCell align="right">
                    <FormControl sx={{ marginTop: "10px", minWidth: "200px" }}>
                      <InputLabel>Attendance</InputLabel>
                      <Select
                        onChange={(e) =>
                          handleAttendance(student._id, e.target.value)
                        }
                        label="Attendance"
                        value={attendanceStatus[student._id]}
                      >
                        <MenuItem value={"present"}>Present</MenuItem>
                        <MenuItem value={"absent"}>Absent</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button variant="contained" onClick={submitAttendance}>
            Take Attendance
          </Button>
        </TableContainer>
      ) : (
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="warning">
          There are no students in this class.
        </Alert>
      )}
    </div>
  );
}
