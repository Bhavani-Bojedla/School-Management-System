import React from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { baseApi } from "../../../Environment";
import { useState } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Grid2 } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { PieChart } from "@mui/x-charts/PieChart";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

export default function AttendanceStudents() {
  const [present, setPresent] = useState(0);
  const [absent, setAbsent] = useState(0);

  const [attendanceData, setAttendanceData] = useState([]);
  const [studentId, setStudentId] = useState(null);

  const convertDate = (dateData) => {
    const date = new Date(dateData);
    return (
      date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
    );
  };

  const fetchStudent = async () => {
    try {
      const response = await axios.get(`${baseApi}/student/fetch-single`);
      console.log("student details", response);
      console.log(response.data.student._id);

      setStudentId(response.data.student._id);
    } catch (error) {
      console.log("Error in student details", error);
    }
  };
  useEffect(() => {
    fetchStudent();
  }, []);

  const fetchAttendanceData = async () => {
    try {
      const response = await axios.get(`${baseApi}/attendance/${studentId}`);
      console.log("attendance details", response);
      setAttendanceData(response.data);
      const respData = response.data;
      console.log("respdata", respData);
      if (respData) {
        respData.forEach((attendance) => {
          if (attendance.status === "present") {
            // setPresent(present + 1);
            setPresent((prev)=>prev+1)
          } else if (attendance.status === "absent") {
            // setAbsent(absent + 1);
            setAbsent((prev)=>prev+1)
          }
        });
      }
    } catch (e) {
      console.log("Error in fetching student attendance", e);
    }
  };
  useEffect(() => {
    if (studentId) {
      fetchAttendanceData();
    }
  }, [studentId]);
  return (
    <div>
      <h1>Attendance Details</h1>
      <Grid2 container spacing={2}>
        <Grid2 size={6}>
          <Item>
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: present, label: "Present" },
                    { id: 1, value: absent, label: "Absent" },
                  ],
                },
              ]}
              width={200}
              height={200}
            />
          </Item>
        </Grid2>
        <Grid2 size={6}>
          <Item>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell align="right">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {attendanceData.map((attendance) => (
                    <TableRow
                      key={attendance._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {convertDate(attendance.date)}
                      </TableCell>
                      <TableCell align="right">{attendance.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Item>
        </Grid2>
      </Grid2>
    </div>
  );
}
