import React from "react";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import CalculateOutlinedIcon from "@mui/icons-material/CalculateOutlined";
import MonitorHeartOutlinedIcon from "@mui/icons-material/MonitorHeartOutlined";
import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

export const SidebarData = [
  {
    title: "Dashboard",
    icon: <GridViewOutlinedIcon fontSize="small" />,
    path: "/dashboard",
    new: false,
  },
  {
    title: "Inventory",
    icon: <Inventory2OutlinedIcon fontSize="small" />,
    path: "/inventory",
    new: false,
  },
  {
    title: "Calculators",
    icon: <CalculateOutlinedIcon fontSize="small" />,
    path: "/calculators",
    new: false,
  },
  {
    title: "Tools",
    icon: <HandymanOutlinedIcon fontSize="small" />,
    path: "/tools",
    new: true,
  },
  {
    title: "Monitors",
    icon: <MonitorHeartOutlinedIcon fontSize="small" />,
    path: "/monitors",
    new: false,
  },
  {
    title: "Settings",
    icon: <SettingsOutlinedIcon fontSize="small" />,
    path: "/settings",
    new: false,
  },
];
