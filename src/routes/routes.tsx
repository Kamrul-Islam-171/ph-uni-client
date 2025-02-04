import { createBrowserRouter } from "react-router-dom";
import App from "../App";

import {  adminPaths2 } from "./admin.routes";
import { routeGenerates } from "../utils/routesGenerator";
import { facultyPaths } from "./faculty.routes";
import { studentPaths } from "./student.routes";
import LoginForm from "../pages/login/Login";
import ProtectedRoute from './../components/layout/ProtectedRoute';
import ChangePassword from "../pages/admin/ChangePassword";



const router = createBrowserRouter([
    {
        path: '/',
        element: <App></App>,
    },
    {
        path: '/admin',
        element: <ProtectedRoute role="admin"> <App></App></ProtectedRoute>,
        children: routeGenerates(adminPaths2)
    },
    {
        path: '/faculty',
        element: <App></App>,
        children: routeGenerates(facultyPaths)
    },
    {
        path: '/student',
        element: <ProtectedRoute role="student"> <App></App></ProtectedRoute>,
        children: routeGenerates(studentPaths)
    },
    {
        path: '/login',
        element:<LoginForm></LoginForm>
    },
    {
        path: '/change-password',
        element:<ChangePassword></ChangePassword>
    },

    // this is single protected route
    // {
    //     path: '/student',
    //     element: <ProtectedRoute><App></App></ProtectedRoute>,
    //     children: routeGenerates(studentPaths)
    // },
])

export default router;