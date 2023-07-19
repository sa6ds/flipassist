import React from "react";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import CalculateOutlinedIcon from "@mui/icons-material/CalculateOutlined";
import MonitorHeartOutlinedIcon from "@mui/icons-material/MonitorHeartOutlined";
import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";

export const SidebarData = [
  {
    title: "Dashboard",
    icon: <GridViewOutlinedIcon className="mr-5 w-8" />,
    path: "/dashboard",
  },
  {
    title: "Inventory",
    icon: <Inventory2OutlinedIcon className="mr-5 w-8" />,
    path: "/inventory",
  },
  // Work in Progress
  // {
  //   title: "Calculators",
  //   icon: <CalculateOutlinedIcon className="mr-5 w-8" />,
  //   path: "/calculators",
  // },
  // {
  //   title: "Tools",
  //   icon: <HandymanOutlinedIcon className="mr-5 w-8" />,
  //   path: "/tools",
  // },
  {
    title: "Monitors",
    icon: <MonitorHeartOutlinedIcon className="mr-5 w-8" />,
    path: "/monitors",
  },
];
