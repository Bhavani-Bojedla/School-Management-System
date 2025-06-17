import GridViewIcon from '@mui/icons-material/GridView';
import PeopleIcon from '@mui/icons-material/People';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SubjectIcon from '@mui/icons-material/Subject';
import ExplicitIcon from '@mui/icons-material/Explicit';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';

const TeachernavArr=[
    {link:"/",component:"Home",icon:HomeIcon},
    {link:"/teacher",component:"Your Details",icon:GridViewIcon},
    {link:"/teacher/schedule",component:"Schedule",icon:CalendarMonthIcon},
    {link:"/teacher/attendance",component:"Attendance",icon:RecentActorsIcon},
    {link:"/teacher/examinations",component:"Examinations",icon:ExplicitIcon},
    {link:"/teacher/notifications",component:"Notifications",icon:NotificationsIcon}
]
const StudentnavArr=[
  {link:"/",component:"Home",icon:HomeIcon},
  {link:"/student",component:"Your Details",icon:GridViewIcon},
  {link:"/student/schedule",component:"Schedule",icon:CalendarMonthIcon},
  {link:"/student/attendance",component:"Attendance",icon:RecentActorsIcon},
  {link:"/student/examinations",component:"Examinations",icon:ExplicitIcon},
  {link:"/student/notifications",component:"Notifications",icon:NotificationsIcon}
]
const SchoolnavArr=[
  {link:"/",component:"Home",icon:HomeIcon},
  {link:"/school",component:"Dashboard",icon:GridViewIcon},
  {link:"/school/class",component:"Class",icon:FormatListNumberedIcon},
  {link:"/school/subjects",component:"Subjects",icon:SubjectIcon},
  {link:"/school/students",component:"Students",icon:PeopleIcon},
  {link:"/school/teachers",component:"Teachers",icon:PeopleIcon},
  {link:"/school/schedule",component:"Schedule",icon:CalendarMonthIcon},
  {link:"/school/attendance",component:"Attendance",icon:RecentActorsIcon},
  {link:"/school/examinations",component:"Examinations",icon:ExplicitIcon},
  {link:"/school/notifications",component:"Notifications",icon:NotificationsIcon},
    {link:"/logout",component:"Log Out",icon:LogoutIcon}
]

  const Homelinks=[
    {link:"/",component:"Home"},
    {link:"/login",component:"Login"},
    {link:"/register",component:"Register"}
  ]
 export {Homelinks,SchoolnavArr,TeachernavArr,StudentnavArr}