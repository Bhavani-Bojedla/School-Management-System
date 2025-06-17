import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { baseApi } from "../../../Environment";
import axios from "axios";
import { CardMedia } from "@mui/material";

export default function TeacherDetails() {
  const [teacherDetails, setTeacherDetails] = React.useState(null);
  const fetchTeacher=async()=>{
    try {
      const response = await axios.get(`${baseApi}/teacher/fetch-single`);
    console.log("teacher details", response);
    setTeacherDetails(response.data.teacher);
    console.log(response.data.teacher.name)
    } catch (error) {
      console.log("Error in teacher details",error);
    }
  }
  React.useEffect(() => {
     fetchTeacher();
  },[]);
  return (
    <>
      {teacherDetails && (
        <>
         <CardMedia
        component="img"
        sx={{height:"300px",width:"300px",margin:'auto',borderRadius:'50%'}}
        image={`./images/uploaded/teacher/${teacherDetails.teacher_img}`}
        alt="Paella dish"
      />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell>
                    <b>Name : </b>
                  </TableCell>
                  <TableCell align="right">{teacherDetails.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>Email : </b>
                  </TableCell>
                  <TableCell align="right">{teacherDetails.email}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>Age :</b>
                  </TableCell>
                  <TableCell align="right">{teacherDetails.age}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>Gender :</b>
                  </TableCell>
                  <TableCell align="right">{teacherDetails.gender}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>Qualification</b>
                  </TableCell>
                  <TableCell align="right">
                    {teacherDetails.qualification}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </>
  );
}
