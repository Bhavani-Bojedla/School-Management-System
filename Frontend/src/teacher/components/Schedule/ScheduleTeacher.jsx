import { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { FormControl, MenuItem, Select, Typography } from "@mui/material";
import axios from "axios";
import { baseApi } from "../../../Environment";
import MessageSnackbar from "../../../Basic utitlity compoenents/SnackBar/MessageSnackbar";

const localizer = momentLocalizer(moment);

export default function ScheduleTeacher() {
  const date = new Date();
  const user = JSON.parse(localStorage.getItem("user"));
  const teacherId = user?.id || user?._id;

  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);

  const myEventsList = [];

  const [events, setEvents] = useState(myEventsList);

  useEffect(() => {
    axios
      .get(`${baseApi}/class/all`)
      .then((res) => {
        setClasses(res.data.data);
        setSelectedClass(res.data.data[0]._id);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    if (selectedClass) {
      axios
        .get(`${baseApi}/schedule/fetch-with-class-and-teacher`, {
          params: {
            classId: selectedClass,
            teacherId: teacherId,
          },
        })
        .then((res) => {
          const respdata = res.data.data.map((x) => {
            // console.log(new Date(x.startTime))
            return {
              id: x._id,
              title: `Sub: ${x.subject.subject_name}, Teacher:${x.teacher.name}`,
              start: new Date(x.startTime),
              end: new Date(x.endTime),
            };
          });

          setEvents(respdata);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [selectedClass]);

  return (
    <>
      <h1>Schedule</h1>

      <FormControl>
        <Typography variant="h5">Class</Typography>
        <Select
          value={selectedClass}
          name="classes"
          onChange={(e) => {
            setSelectedClass(e.target.value);
          }}
        >
          {classes &&
            classes.map((item) => {
              return (
                <MenuItem key={item._id} value={item._id}>
                  {item.class_text}
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>

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
