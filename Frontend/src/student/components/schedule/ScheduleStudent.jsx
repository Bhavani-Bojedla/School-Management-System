import { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { FormControl, MenuItem, Select, Typography } from "@mui/material";
import axios from "axios";
import { baseApi } from "../../../Environment";
import MessageSnackbar from "../../../Basic utitlity compoenents/SnackBar/MessageSnackbar";

const localizer = momentLocalizer(moment);

export default function ScheduleStudent() {
  const date = new Date();
  const user = JSON.parse(localStorage.getItem("user"));
  const teacherId = user?.id || user?._id;

  const [selectedClass, setSelectedClass] = useState(null);

  const myEventsList = [];

  const [events, setEvents] = useState(myEventsList);
const fetchStudent=async()=>{
    try {
      const response = await axios.get(`${baseApi}/student/fetch-single`);
    console.log("student details", response);
    setSelectedClass(response.data.student.student_class)
    console.log(response.data.student.name)
    } catch (error) {
      console.log("Error in student details",error);
    }
  }
  useEffect(() => {
    fetchStudent();
  }, []);

  useEffect(() => {
    if (selectedClass) {
      console.log("selected",selectedClass)
      axios
        .get(`${baseApi}/schedule/fetch-with-class/${selectedClass._id}`)
        .then((res) => {
          const respdata = res.data.data.map((x) => {
            
            return {
              id: x._id,
              title: `Sub: ${x.subject.subject_name}, Teacher:${x.teacher.name}`,
              start: new Date(x.startTime),
              end: new Date(x.endTime),
            };
          });
// console.log("response data",respdata)
          setEvents(respdata);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [selectedClass]);

  return (
    <>
      <h1>Schedule of your Class [{selectedClass?selectedClass.class_text:""}]</h1>


      <div style={{ height: "100vh", width: "100%" }}>
        <Calendar
          defaultView="week"
          views={["week", "day", "agenda"]}
          step={30}
          timeslots={1}
          min={new Date(1970, 1, 1, 10, 0, 0)}
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          max={new Date(1970, 1, 1, 17, 0, 0)}
          defaultDate={date}
          showMultiDayTimes
          style={{ height: "100%", width: "100%" }}
        />
      </div>
    </>
  );
}
