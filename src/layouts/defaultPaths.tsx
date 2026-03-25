import type { ReactNode } from "react";
import { RxDashboard } from "react-icons/rx";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { LuUsers } from "react-icons/lu";
import type { PermissionName } from "@/ability/permissions";

export type NavItem = {
  segment: string;
  title: string;
  icon: ReactNode;
  isParent: boolean;
  /** If set, drawer link is hidden unless CASL allows `execute` on this permission */
  requiredPermission?: PermissionName;
};

export const navigationlists: NavItem[] = [
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <RxDashboard />,
    isParent: false,
  },
  {
    segment: "admin",
    title: "Admin",
    icon: <MdOutlineAdminPanelSettings />,
    isParent: false,
  },
  {
    segment: "user",
    title: "Users",
    icon: <LuUsers />,
    isParent: false,
    requiredPermission: "USER_INDEX",
  },
  //   {
  //     segment: "admin",
  //     title: "Admin",
  //     isParent: true,
  //     icon: <AdminPanelSettingsIcon />,
  //     children: [
  //       {
  //         segment: "list",
  //         title: "List",
  //         icon: <FormatListBulletedIcon />,
  //       },
  //     ],
  //   },
];
