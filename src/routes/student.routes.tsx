import MySchedule from "../pages/student/MySchedule";
import OfferedCourseStu from "../pages/student/OfferedCourseStu";
import StudentDashboard from "../pages/student/StudentDashboard";

export const studentPaths = [
    {
      name: 'Dashboard',
      path: 'dashboard',
      element: <StudentDashboard></StudentDashboard>
    },
    {
      name: 'Offered Course',
      path: 'offered-course',
      element: <OfferedCourseStu></OfferedCourseStu>
    },
    {
      name: 'My Schedule',
      path: 'my-schedule',
      element: <MySchedule></MySchedule>
    },
  ];