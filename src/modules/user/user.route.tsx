import { Icon } from "@chakra-ui/react";
import { paths } from "../../constants/paths";
import UserCreate from "./entry/UserCreate";
import UserList from "./view/UserList";
import { CiCirclePlus } from "react-icons/ci";
import { RequirePermission } from "@/ability/RequirePermission";
import { Permission } from "@/ability/permissions";

export const UserRoute = [
  {
    id: "user",
    path: paths.user,
    element: (
      <RequirePermission permission={Permission.USER_INDEX}>
        <UserList />
      </RequirePermission>
    ),
    loader: () => {
      return {
        breadcrumbs: [
          { label: "Dashboard", url: paths.dashboard },
          { label: "Users", url: paths.user },
          {
            label: (
              <Icon size={"md"} cursor={"pointer"}>
                <CiCirclePlus />
              </Icon>
            ),
            url: paths.userCreate,
          },
        ],
      };
    },
  },
  {
    id: "user-create",
    path: paths.userCreate,
    element: (
      <RequirePermission permission={Permission.USER_STORE}>
        <UserCreate />
      </RequirePermission>
    ),
    loader: () => {
      return {
        breadcrumbs: [
          { label: "Dashboard", url: paths.dashboard },
          { label: "Users", url: paths.user },
        ],
      };
    },
  },
];
