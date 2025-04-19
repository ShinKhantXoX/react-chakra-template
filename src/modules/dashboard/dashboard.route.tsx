import { paths } from "../../constants/paths";
import Dashboard from "./view/Dashboard";

export const DashboardRoute = [
  {
    id: "dashborad",
    path: paths.dashboard, // Ensure this is defined in your paths constant
    element: <Dashboard />, // This is where your wallet table or list component will be rendered
  },
];
