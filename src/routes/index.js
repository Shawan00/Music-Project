import { Navigate } from "react-router-dom";
import AdminLayout from "../components/Admin/AdminLayout";
import Genre from "../pages/Admin/Genre";
import Song from "../pages/Admin/Song";

export const adminRoutes = [
    {
        path: "admin",
        element: <AdminLayout/>,
        children: [
            {
                path: "genre",
                element: <Genre/>
            },
            {
                path: "song",
                element: <Song/>
            }
        ]
    },
    {
        path: "*",
        element: <Navigate to="/"/>
    }
]