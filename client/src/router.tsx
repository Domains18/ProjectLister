import { createBrowserRouter, Navigate } from "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout";
import GuestLayout from "./layout/GuestLayout";
import Dashboard from "./components/Dashboard";
import Login from "./auth/Login";
import Register from "./auth/Register";

const Router = createBrowserRouter([
    {
        path: "/", element: <DefaultLayout />, 
        children: [
            { path: "/", element: <Navigate to="/dashboard" /> },
            { path: "/dashboard", element: <Dashboard/> },
        ]
    },
    {
        path: "/", element: <GuestLayout />,
        children: [
            { path: "/login", element: <Login/> },
            { path: "/register", element: <Register/> },
        ]
    }
]);


export default Router;
