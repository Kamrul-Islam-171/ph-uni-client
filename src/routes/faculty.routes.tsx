import FacultyDashboard from "../pages/faculty/FacultyDashboard";
import MyCourses from "../pages/faculty/MyCourses";
import MyStudents from "../pages/faculty/MyStudents";
import OfferedCourse from "../pages/faculty/OfferedCourse";


export const facultyPaths = [
    {
        name: 'Dashboard',
        path: 'dashboard',
        element: <FacultyDashboard></FacultyDashboard>
    },
    {
        name: 'Offered Course',
        path: 'offered-course',
        element: <OfferedCourse></OfferedCourse>
    },
    {
        name: 'My Courses',
        path: 'my-courses',
        element: <MyCourses></MyCourses>
    },
    {
      
        path: 'courses/:registerSemesterId/:courseId',
        element: <MyStudents></MyStudents>
    }
]