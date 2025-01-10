import React, { useState } from 'react';
import { Button } from "@mui/material";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import ScheduleEvents from './ScheduleEvents';

const localizer = momentLocalizer(moment);

export default function Schedule() {
  const [newPeriod,setNewperiod]=useState(false);
  const myEventsList = [
    {
      id: 1,
      title: "Subject: History, Teacher: Hamid",
      start: new Date(2025, 0, 7, 8, 30),
      end: new Date(2025, 0, 7, 10, 30),
    },
    {
      id: 2,
      title: "Subject: Science, Teacher: John",
      start: new Date(2025, 0, 7, 11, 30),
      end: new Date(2025, 0, 7, 13, 30),
    },
    {
      id: 3,
      title: "Subject: Math, Teacher: Sarah",
      start: new Date(2025, 0, 7, 14, 30),
      end: new Date(2025, 0, 7, 17, 30),
    },
  ];

  return (
    <div style={{ height: '100vh', padding: '10px' }}>
      <h1>Schedule</h1>
      <Button onClick={()=>setNewperiod(true)}>Add New Period</Button>
      {newPeriod && <ScheduleEvents/> }
      <Calendar
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        defaultView="week"
        // views={['week', 'day', 'agenda']}
        step={30}
        timeslots={1}
        min={new Date(1970, 1, 1, 10, 0, 0)}
        max={new Date(1970, 1, 1, 18, 0, 0)}
        defaultDate={new Date()}
        style={{ height: '80%', width: '100%' }}
        showMultiDayTimes
      />
    </div>
  );
}
