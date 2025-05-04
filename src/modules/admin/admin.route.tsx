import { Icon } from "@chakra-ui/react";
import { paths } from "../../constants/paths";
import AdminCreate from "./entry/AdminCreate";
import AdminList from "./view/AdminList";
import { CiCirclePlus } from "react-icons/ci";

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
          {
            label: (
              <Icon size={"md"} cursor={"pointer"}>
                <CiCirclePlus />
              </Icon>
            ),
            url: paths.adminCreate,
          },
        ],
      };
    },
  },
  {
    id: "admin-create",
    path: paths.adminCreate, // Ensure this is defined in your paths constant
    element: <AdminCreate />, // This is where your wallet table or list component will be rendered
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
