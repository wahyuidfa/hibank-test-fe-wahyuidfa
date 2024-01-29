import { CircleIcon, FolderIcon, HomeIcon, MailIcon, SettingsIcon, Users2 } from "lucide-react";

export const SIDENAV_ITEMS = [
  {
    title: "Users",
    path: "/",
    icon: <Users2 width='24' height='24' />,
  },
  {
    title: "Projects",
    path: "/projects",
    icon: <FolderIcon  width='24' height='24' />,
    submenu: true,
    subMenuItems: [
      { title: "All", path: "/projects" },
      { title: "Web Design", path: "/projects/web-design" },
      { title: "Graphic Design", path: "/projects/graphic-design" },
    ],
  },
  {
    title: "Messages",
    path: "/messages",
    icon: <MailIcon icon='lucide:mail' width='24' height='24' />,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: <SettingsIcon icon='lucide:settings' width='24' height='24' />,
    submenu: true,
    subMenuItems: [
      { title: "Account", path: "/settings/account" },
      { title: "Privacy", path: "/settings/privacy" },
    ],
  },
  {
    title: "Help",
    path: "/help",
    icon: <CircleIcon icon='lucide:help-circle' width='24' height='24' />,
  },
];
