import { RxDashboard } from "react-icons/rx";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

export const navigationlists = [
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
