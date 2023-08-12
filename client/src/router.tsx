import {Navigate } from 'react-router-dom'
import { createBrowserRouter } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import AllowedLayout from "./layout/AllowedLayout";
import AuthLayout from "./layout/AuthLayout";
import Dashboard from './components/Dashboard';


// interface ContextProviderProps {
//     children: ReactNode;
// }
const router= createBrowserRouter([
    {
        path: "/", element: <AuthLayout />,
        children: [
            { path: "/", element: <Navigate to="/login" /> },
            { path: "/login", element: <Login /> },
            { path: "/register", element: <Register /> },
        ]
    },
    {
        path: "/", element: <AllowedLayout />,
        children: [
            { path: "/dashboard", element: <Dashboard /> },
        ]
    }
])


export default router;
