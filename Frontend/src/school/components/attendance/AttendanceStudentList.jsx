import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Form, useFormik } from "formik";
import { styled } from '@mui/material/styles';
import { Button, CardMedia, Grid, Grid2, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import axios from "axios";
import { studentEditSchema, studentSchema } from "../../../yupSchema/studentSchema";
import MessageSnackbar from "../../../Basic utitlity compoenents/SnackBar/MessageSnackbar";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { baseApi } from "../../../Environment";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import Attendee from "./Attendee";
import { useEffect } from "react";
import { Link } from "react-router-dom";
  const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

export default function AttendanceStudentList() {
  const [edit, setedit] = useState(false);
  const [classes, setClasses] = React.useState([]);
  const [params, setParams] = useState({});
  const [Students, setStudents] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const handleMessageClose = () => {
    setMessage("");
  };

  const handleMessage=(message,type)=>{
    setMessageType(type);
    setMessage(message);
  }

   const [selectedClass,setSelectedClass]=useState(null);
  const handleClass = (e) => {
    setSelectedClass(e.target.value);
    setParams((prevparams) => ({
      ...prevparams,
      student_class: e.target.value || undefined,
    }));
  };
  const handleSearch = (e) => {
    setParams((prevparams) => ({
      ...prevparams,
      search: e.target.value || undefined,
    }));
  };
  React.useEffect(() => {
    axios
      .get(`${baseApi}/student/fetch-with-query`, { params })
      .then((res) => {
        setStudents(res.data.students);
        fetchAttendanceForStudents(res.data.students);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [message, params]);

  const [attendanceData,setAttendanceData]=useState({});

  const fetchAttendanceForStudents=async(studentsList)=>{
    const attendancePromises=studentsList.map((student)=>fetchAttendanceForStudent(student._id));
    const results=await Promise.all(attendancePromises);
    const updatedAttendanceData={};

    results.forEach(({studentId,attendancePercentage})=>{
      updatedAttendanceData[studentId]=attendancePercentage;
    });
    setAttendanceData(updatedAttendanceData);
  }
  const fetchAttendanceForStudent = async(studentId)=>{
    try{
    const response=await axios.get(`${baseApi}/attendance/${studentId}`)
    const attendanceRecords=response.data;
    const totalClasses=attendanceRecords.length;
    const presentCount=attendanceRecords.filter(
      (record)=>record.status==="present"
    ).length;
    const attendancePercentage=totalClasses>0?(presentCount/totalClasses)*100:0;

    return {studentId,attendancePercentage};
    }catch(error){
       console.error(`Error fetching attendance for student ${studentId}:`,error);
       return {studentId,attendancePercentage:0};
    }
    
  }

  React.useEffect(() => {
    axios
      .get(`${baseApi}/class/all`)
      .then((res) => {
        setClasses(res.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [message]);



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
      {edit ? (
        <Typography
          variant="h4"
          sx={{ textAlign: "center", fontWeight: "700" }}
        >
          Edit the Student details
        </Typography>
      ) : (
        <Typography
          variant="h4"
          sx={{ textAlign: "center", fontWeight: "700" }}
        >
          Student's Attendance
        </Typography>
      )}
     
         <Box sx={{ flexGrow: 1 }}>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 6, md: 4 }}>
          <Item>
              <Box
        component={"div"}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginTop: "40px",
        }}
      >
        <TextField
          label="search"
          value={params.search ? params.search : ""}
          onChange={(e) => {
            handleSearch(e);
          }}
        />

        <FormControl sx={{ width: "180px", marginLeft: "5px" }}>
          <InputLabel id="demo-simple-select-label">Student Class</InputLabel>
          <Select
            label="student_class"
            value={params.student_class ? params.student_class : ""}
            onChange={(e) => {
              handleClass(e);
            }}
          >
            <MenuItem value="">Select Class</MenuItem>
            {classes &&
              classes.map((item) => {
                return (
                  <MenuItem key={item._id} value={item._id}>
                    {item.class_text} ({item.class_num})
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>
      </Box>
      <Box>
        {selectedClass && <Attendee classId={selectedClass} handleMessage={handleMessage} message={message}/>}
      </Box>
          </Item>
        </Grid2>
        <Grid2 size={{ xs: 6, md: 8 }}>
          <Item>
              <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Gender</TableCell>
            <TableCell align="right">Guardian Phone</TableCell>
            <TableCell align="right">Class</TableCell>
            <TableCell align="right">Percentage</TableCell>
            <TableCell align="right">View</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Students && Students.map((student) => (
            <TableRow
              key={student._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {student.name}
              </TableCell>
              <TableCell align="right">{student.gender}</TableCell>
              <TableCell align="right">{student.guardian_phone}</TableCell>
              <TableCell align="right">{student.student_class.class_text}</TableCell>
              <TableCell align="right">{attendanceData[student._id] !==undefined ? `${attendanceData[student._id].toFixed(2)}%` :"No Data" }</TableCell>
              <TableCell align="right"><Link to={`/school/attendance/${student._id}`}>view</Link></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

          </Item>
        </Grid2>
      </Grid2>
    </Box>

    
   
      
    </Box>
  );
}
