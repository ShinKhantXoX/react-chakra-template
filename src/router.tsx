import { createBrowserRouter } from "react-router-dom";
import NotFound from "./layouts/pages/NotFound";
import DefaultLayout from "./layouts";
import Login from "./modules/auth/view/Login";
import BlankTemplate from "./layouts/pages/BlankTemplate";
import { DashboardRoute } from "./modules/dashboard/dashboard.route";
import { AdminRoute } from "./modules/admin/admin.route";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    errorElement: <NotFound />,
    children: [...DashboardRoute, ...AdminRoute],
  },
  {
    path: "auth",
    element: <BlankTemplate />,
    errorElement: <NotFound />,
  },
  {
    path: "auth/login",
    element: <Login />,
    errorElement: <NotFound />,
  },
]);
