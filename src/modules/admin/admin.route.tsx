import { paths } from "../../constants/paths";
import AdminList from "./view/AdminList";

export const AdminRoute = [
  {
    id: "admin",
    path: paths.admin, // Ensure this is defined in your paths constant
    element: <AdminList />, // This is where your wallet table or list component will be rendered
    loader: () => {
      return {
        breadcrumbs: [
          { label: "Dashboard", url: paths.dashboard },
          { label: "Admin", url: paths.admin },
        ],
      };
    },
  },
];
