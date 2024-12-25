import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Attendance from './school/components/attendance/Attendance'
import Class from './school/components/class/Class'
import Dashboard from './school/components/dashboard/Dashboard'
import Examinations from './school/components/examinations/Examinations'
import Notice from './school/components/notice/Notice'
import Schedule from './school/components/schedule/Schedule'
import Students from './school/components/students/Students'
import Subjects from './school/components/subjects/Subjects'
import Teachers from './school/components/teachers/Teachers'
import School from './school/School'
import Client from './client/Client'
import Home from './client/components/home/Home'
import Login from './client/components/login/Login'
import Register from './client/components/register/Register'
import Teacher from './teacher/Teacher'
import TeacherDetails from './teacher/components/TeacherDetails/TeacherDetails'
import ScheduleTeacher from './teacher/components/Schedule/ScheduleTeacher'
import AttendanceTeacher from './teacher/components/attendance/AttendanceTeacher'
import ExaminationTeacher from './teacher/components/examinations/ExaminationTeacher'
import NoticeTeacher from './teacher/components/notice/NoticeTeacher'
import Student from './student/Student'
import StudentDetails from './student/components/studentdetails/StudentDetails'
import ScheduleStudent from './student/components/schedule/ScheduleStudent'
import AttendanceStudents from './student/components/atttendance/AttendanceStudents'
import ExaminationStudents from './student/components/examinations/ExaminationStudents'
import NoticeStudents from './student/components/notice/NoticeStudents'

function App() {


  return (
   <>
     <BrowserRouter>
       <Routes>
        {/* SCHOOL ROUTE */}
         <Route path='school' element={<School/>}>
            <Route index element={<Dashboard/>}/>
            <Route path='attendance' element={<Attendance/>}/>
            <Route path='class' element={<Class/>}/>
            <Route path='dashboard' element={<Dashboard/>}/>
            <Route path='examinations' element={<Examinations/>}/>
            <Route path='notifications' element={<Notice/>}/>
            <Route path='schedule' element={<Schedule/>}/>
            <Route path='students' element={<Students/>}/>
            <Route path='subjects' element={<Subjects/>}/>
            <Route path='teachers' element={<Teachers/>}/>
         </Route>


        {/* TEACHER */}
         <Route path='teacher' element={<Teacher/>}>
            <Route index element={<TeacherDetails/>}/>
            <Route path='schedule' element={<ScheduleTeacher/>}/>
            <Route path='attendance' element={<AttendanceTeacher/>}/>
            <Route path='examinations' element={<ExaminationTeacher/>}/>
            <Route path='notifications' element={<NoticeTeacher/>}/>
         </Route>


         {/* STUDENT */}
         <Route path='student' element={<Student/>}>
            <Route index element={<StudentDetails/>}/>
            <Route path='schedule' element={<ScheduleStudent/>}/>
            <Route path='attendance' element={<AttendanceStudents/>}/>
            <Route path='examinations' element={<ExaminationStudents/>}/>
            <Route path='notifications' element={<NoticeStudents/>}/>
         </Route>

         {/* CLIENT */}
         <Route path='/' element={<Client/>}>
           <Route index element={<Home/>}/>
           <Route path='login' element={<Login/>}/>
           <Route path='register' element={<Register/>}/>

         </Route>
       </Routes>
     </BrowserRouter>
   </>
  )
}

export default App
