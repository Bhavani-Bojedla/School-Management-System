import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

const localizer = momentLocalizer(moment);

export default function Schedule() {
  const currentDate = new Date();
  const myEventsList = [
    {
      id: 1,
      title: "Subject: History, Teacher: Hamid",
      start: new Date(currentDate.setHours(11, 30)),
      end: new Date(currentDate.setHours(14, 30)),
    },
    {
      id: 2,
      title: "Subject: Science, Teacher: John",
      start: new Date(new Date(currentDate).setHours(15, 30)),
      end: new Date(new Date(currentDate).setHours(17, 30)),
    },
    {
      id: 3,
      title: "Subject: Math, Teacher: Sarah",
      start: new Date(new Date(currentDate).setHours(18, 30)),
      end: new Date(new Date(currentDate).setHours(19, 30)),
    },
  ];

  return (
    <div style={{ height: '720vh' }}>
      <h1>Schedule</h1>
      <Calendar
        defaultView="week"
        step={30}
        timeslots={1}
        min={new Date(1970, 1, 1, 10, 0, 0)}
        max={new Date(1970, 1, 1, 17, 0, 0)}
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        defaultDate={new Date()}
        style={{ height: '100%',width:'100%' }}
        showMultiDayTimes
      />
    </div>
  );
}
