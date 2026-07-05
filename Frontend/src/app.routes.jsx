import { createBrowserRouter } from "react-router-dom";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Home from "./features/main/pages/Home";
import ResetPassword from "./features/auth/pages/ResetPassword";
import Error from "./features/main/pages/Error";
import GuestRoute from "./features/main/components/GuestRoute";
import AnalyzeResume from "./features/main/pages/AnalyzeResume";
import LayoutWithFooter from "./features/main/components/LayoutWithFooter";
import LayoutWithoutFooter from "./features/main/components/LayoutWithoutFooter";
import ResumeAnalysis from "./features/main/pages/ResumeAnalysis";

export const router=createBrowserRouter([
    {
        element:<LayoutWithFooter />,
        errorElement:<Error />,
        children:[
            {
                path:"/",
                element:<Home />
            }
        ]
    },
    {
        element:<LayoutWithoutFooter />,
        errorElement:<Error />,
        children:[
            {
                path:"/analyze-resume",
                element:<AnalyzeResume />
            },
            {
                path:"/resume-analysis",
                element: <ResumeAnalysis />
            }
        ]
    },
    {
        path:"/login",
        element:(
            <GuestRoute>
                <Login />
            </GuestRoute>
        ),
        errorElement:<Error />
    },
    {
        path:"/register",
        element:(
            <GuestRoute>
                <Register />
            </GuestRoute>
        ),
        errorElement:<Error />
    },
    {
        path:"/reset-password",
        element:(
            <GuestRoute>
                <ResetPassword />
            </GuestRoute>
        ),
        errorElement:<Error />
    },
    {
        path:"*",
        element:<Error />
    }
]);