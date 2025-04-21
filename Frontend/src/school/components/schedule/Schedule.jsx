import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import ScheduleEvents from "./ScheduleEvents";
import { useFormik } from "formik";
import { periodSchema } from "../../../yupSchema/periodSchema";
import axios from "axios";
import { baseApi } from "../../../Environment";
import MessageSnackbar from "../../../Basic utitlity compoenents/SnackBar/MessageSnackbar";

const localizer = momentLocalizer(moment);

export default function Schedule() {
  const date = new Date();
  const [view, setView] = useState("week"); // Default is week view

  const [newPeriod, setNewperiod] = useState(false);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const handleMessageClose = () => {
    setMessage("");
  };
  const handleMessageNew=(msg,type)=>{
        setMessage(msg);
          setMessageType(type)
  }
  
  const myEventsList = [
    {
      id: 1,
      title: "subject:history, teacher: bhavani",
      start: new Date(date.setHours(11, 30)),
      end: new Date(date.setHours(14, 30)),
    },
    {
      id: 2,
      title: "subject:english, teacher: saniya",
      start: new Date(date.setHours(15, 30)),
      end: new Date(date.setHours(18, 30)),
    },
  ];

   const [events,setEvents]=useState(myEventsList);
  const handleEventClose=()=>{
      setNewperiod(false);
  }
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
    if(selectedClass){
    axios
      .get(`${baseApi}/schedule/fetch-with-class/${selectedClass}`)
      .then((res) => {
        console.log(res)
        const respdata=res.data.data.map(x=>{
          console.log(new Date(x.startTime))
          return ({
            id:x._id,
            title:`Sub: ${x.subject.subject_name}, Teacher:${x.teacher.name}`,
            start:new Date(x.startTime),
            end:new Date(x.endTime)
          })
        })
        
        setEvents(respdata);
      })
      .catch((e) => {
        console.log(e);
      });
  }}, [selectedClass]);

  const handleNewEvent = (newEvent) => {
    setEvents((prevEvents) => [...prevEvents, newEvent]); // Append new event
  };
  
 
  return (
    <>
      <h1>Schedule</h1>
      {message && <MessageSnackbar message={message} messageType={messageType} handleClose={handleMessageClose} />}
            
      <FormControl >
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
                  {item.class_text} [{item.class_num}]
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>

      <Button onClick={() => setNewperiod(true)}>Add new period</Button>
      {newPeriod && <ScheduleEvents selectedClass={selectedClass} handleEventClose={handleEventClose}  handleMessageNew={handleMessageNew} handleNewEvent={handleNewEvent}/>}
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
