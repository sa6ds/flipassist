import React from "react";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import CalculateOutlinedIcon from "@mui/icons-material/CalculateOutlined";
import MonitorHeartOutlinedIcon from "@mui/icons-material/MonitorHeartOutlined";
import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";

export const SidebarData = [
  {
    title: "Dashboard",
    icon: <GridViewOutlinedIcon fontSize="small" />,
    path: "/dashboard",
  },
  {
    title: "Inventory",
    icon: <Inventory2OutlinedIcon fontSize="small" />,
    path: "/inventory",
  },
  // Work in Progress
  // {
  //   title: "Calculators",
  //   icon: <CalculateOutlinedIcon fontSize="small" />,
  //   path: "/calculators",
  // },
  // {
  //   title: "Tools",
  //   icon: <HandymanOutlinedIcon fontSize="small"  />,
  //   path: "/tools",
  // },
  {
    title: "Monitors",
    icon: <MonitorHeartOutlinedIcon fontSize="small" />,
    path: "/monitors",
  },
];
