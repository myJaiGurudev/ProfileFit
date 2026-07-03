import { createBrowserRouter } from "react-router-dom";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Home from "./features/main/pages/Home";
import ResetPassword from "./features/auth/pages/ResetPassword";
import Error from "./features/main/pages/Error";
import GuestRoute from "./features/main/components/GuestRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <Error />
    },
    {
        path: "/login",
        element: (
            <GuestRoute>
                <Login />
            </GuestRoute>
        ),
        errorElement: <Error />
    },
    {
        path: "/register",
        element: (
            <GuestRoute>
                <Register />
            </GuestRoute>
        ),
        errorElement: <Error />
    },
    {
        path: "/reset-password",
        element: (
            <GuestRoute>
                <ResetPassword />
            </GuestRoute>
        ),
        errorElement: <Error />
    },
    {
        path: "*",
        element: <Error />
    }
]);