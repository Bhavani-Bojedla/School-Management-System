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

export default function StudentDetails() {
  const [studentDetails, setStudentDetails] = React.useState(null);
  const fetchStudent=async()=>{
    try {
      const response = await axios.get(`${baseApi}/student/fetch-single`);
    console.log("student details", response);
    setStudentDetails(response.data.student);
    console.log(response.data.student.name)
    } catch (error) {
      console.log("Error in student details",error);
    }
  }
  React.useEffect(() => {
     fetchStudent();
  },[]);
  return (
    <>
      {studentDetails && (
        <>
         <CardMedia
        component="img"
        sx={{height:"300px",width:"300px",margin:'auto',borderRadius:'50%'}}
        image={`./images/uploaded/student/${studentDetails.student_img}`}
        alt="Paella dish"
      />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell>
                    <b>Name : </b>
                  </TableCell>
                  <TableCell align="right">{studentDetails.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>Email : </b>
                  </TableCell>
                  <TableCell align="right">{studentDetails.email}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>Class</b>
                  </TableCell>
                  <TableCell align="right">
                    {studentDetails.student_class.class_text} [{studentDetails.student_class.class_num}]
                  </TableCell>
                </TableRow>
                <TableRow>

                  <TableCell>
                    <b>Age :</b>
                  </TableCell>
                  <TableCell align="right">{studentDetails.age}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>Gender :</b>
                  </TableCell>
                  <TableCell align="right">{studentDetails.gender}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>Guardian</b>
                  </TableCell>
                  <TableCell align="right">
                    {studentDetails.guardian}
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
