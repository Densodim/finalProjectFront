import type { Navigation } from "@toolpad/core/AppProvider"
import DashboardIcon from "@mui/icons-material/Dashboard"
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings"
import GroupIcon from "@mui/icons-material/Group"
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter"


export const NAVIGATION: Navigation = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "admin",
    title: "Admin",
    icon: <AdminPanelSettingsIcon />,
    children: [
      {
        segment: "allUsers",
        title: "All Users",
        icon: <GroupIcon />,
      },
    ],
  },
  {
    segment: "forms",
    title: "Forms",
    icon: <FormatAlignCenterIcon />,
  },
]
