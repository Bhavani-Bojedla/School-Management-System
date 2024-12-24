import GridViewIcon from '@mui/icons-material/GridView';
import PeopleIcon from '@mui/icons-material/People';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SubjectIcon from '@mui/icons-material/Subject';
import ExplicitIcon from '@mui/icons-material/Explicit';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';

const navArr=[
    {link:"/school",component:"Dashboard",icon:GridViewIcon},
    {link:"/school/class",component:"Class",icon:FormatListNumberedIcon},
    {link:"/school/subjects",component:"Subjects",icon:SubjectIcon},
    {link:"/school/students",component:"Students",icon:PeopleIcon},
    {link:"/school/teachers",component:"Teachers",icon:PeopleIcon},
    {link:"/school/schedule",component:"Schedule",icon:CalendarMonthIcon},
    {link:"/school/attendance",component:"Attendance",icon:RecentActorsIcon},
    {link:"/school/examinations",component:"Examinations",icon:ExplicitIcon},
    {link:"/school/notifications",component:"Notifications",icon:NotificationsIcon}
  ]

export default navArr