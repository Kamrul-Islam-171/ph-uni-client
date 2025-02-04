
import { NavLink } from "react-router-dom";
import AdminDashBord from "../pages/admin/AdminDashBord";
import CrateAdmin from "../pages/admin/CrateAdmin";
import CreateFaculty from "../pages/admin/CreateFaculty";
import CreateStudent from "../pages/admin/CreateStudent";
import { ReactNode } from "react";
import AcademicSemester from "../pages/admin/AcademicSemester";
import CreateAcademicSemester from './../pages/admin/CreateAcademicSemester';
import CreateAcademicFaculty from './../pages/admin/CreateAcademicFaculty';
import AcademicFaculty from './../pages/admin/AcademicFaculty';
import CreateAcademicDepartment from './../pages/admin/CreateAcademicDepartment';
import AcademicDepartment from './../pages/admin/AcademicDepartment';
import StudentDetails from './../pages/admin/StudentDetails';
import SemesterRegistration from "../pages/admin/SemesterRegistration";
import RegisteredSemesters from "../pages/admin/RegisteredSemesters";
import CreateCourse from "../pages/admin/CreateCourse";
import Courses from "../pages/admin/Courses";
import OfferCourse from "../pages/admin/OfferCourse";
import OfferedCouseForAll from "../pages/admin/OfferedCourse";



export const adminPaths2 = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashBord></AdminDashBord>,
  },
  {
    name: "Academic Semster manage",
    children: [
      {
        name: "Academic Semester",
        path: "academic-semesters",
        element: <AcademicSemester></AcademicSemester>,
      },
      {
        name: "Create A.Semester",
        path: "create-academic-semesters",
        element: <CreateAcademicSemester></CreateAcademicSemester>,
      },
      {
        name: "Create A.Faculty",
        path: "create-academic-faculty",
        element: <CreateAcademicFaculty></CreateAcademicFaculty>,
      },
      {
        name: "Academic Faculty",
        path: "academic-faculty",
        element: <AcademicFaculty></AcademicFaculty>,
      },
      {
        name: "Create A.Dept",
        path: "create-academic-dept",
        element: <CreateAcademicDepartment></CreateAcademicDepartment>,
      },
      {
        name: "Academic Dept",
        path: "academic-dept",
        element: <AcademicDepartment></AcademicDepartment>,
      },
    ]
  },
  {
    name: "User Management",
    // path nai kono
    children: [
      {
        name: "Create student",
        path: "create-student",
        element: <CreateStudent></CreateStudent>,
      },
      {
        name: "Create Admin",
        path: "create-admin",
        element: <CrateAdmin></CrateAdmin>,
      },
      {
        name: "Create Faculty",
        path: "create-faculty",
        element: <CreateFaculty></CreateFaculty>,
      },
      {
        path: "student-data/:studentId",
        element: <StudentDetails></StudentDetails>,
      },
    ],
  },
  {
    name: 'Course Management',
    children: [
      {
        name: 'Semester Registration',
        path: 'semester-registration',
        element: <SemesterRegistration />,
      },
      {
        name: 'Registered Semesters',
        path: 'registered-semesters',
        element: <RegisteredSemesters />,
      },
      {
        name: 'Create Course',
        path: 'create-course',
        element: <CreateCourse />,
      },
      {
        name: 'Courses',
        path: 'courses',
        element: <Courses />,
      },
      {
        name: 'Offer Course',
        path: 'offer-course',
        element: <OfferCourse />,
      },
      {
        name: 'Offered Courses',
        path: 'offered-courses',
        element: <OfferedCouseForAll />,
      },
    ],
  },
  
];

// type Troutes = {
//   path:string,
//   element: ReactNode
// }

// type TsideBar = {
//   key:string,
//   label:ReactNode,
//   children?: TsideBar[]
// }


type TsideBar = {
  key: string;
  label: ReactNode;
  children?: TsideBar[];
};


//for dashboard
// export const adminSidebarItems = adminPaths2.reduce((acc: TsideBar[], item) => {
//   if(item.path && item.name) {
//     acc.push({
//       key: item.name,
//       label: <NavLink to={`/admin/${item.path}`}>{item.name}</NavLink>
//     })
//   }
//   if(item.children) {
//     acc.push({
//       key: item.name,
//       label: item.name,
//       children: item.children.map((child) => ({
//         key: child.name,
//         label: <NavLink to={`/admin/${child.path}`}>{child.name}</NavLink>
//       }))
//     })
//   }
//   return acc;
// }, [])


// for routes
// export const adminPaths = adminPaths2.reduce((acc : Troutes[] , item) => {
//   if(item.path && item.element) {
//     acc.push({
//       path: item.path,
//       element: item.element
//     })
//   }
//   if(item.children) {
//     item.children.forEach((child) => {
//       acc.push({
//         path: child.path,
//         element: child.element
//       })
//     })
//   }

//   return acc;
// }, [])

// adminPaths er accoumelator ta nicher moto kore res dibe

// export const adminPaths = [
//   {
//     path: "dashbord",
//     element: <AdminDashBord></AdminDashBord>,
//   },
//   {
//     path: "create-student",
//     element: <CreateStudent></CreateStudent>,
//   },
//   {
//     path: "create-admin",
//     element: <CrateAdmin></CrateAdmin>,
//   },
//   {
//     path: "create-faculty",
//     element: <CreateFaculty></CreateFaculty>,
//   },
// ];
