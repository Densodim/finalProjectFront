import type { Navigation } from "@toolpad/core/AppProvider"
import DashboardIcon from "@mui/icons-material/Dashboard"
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings"
import GroupIcon from "@mui/icons-material/Group"
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter"
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered"
import CategoryIcon from "@mui/icons-material/Category"
import TableViewIcon from "@mui/icons-material/TableView"

export const NAVIGATION: Navigation = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    title: "Home page",
    icon: <DashboardIcon />,
  },
  {
    title: "Salesforce",
    segment: "salesforce",
  },
  {
    title: "Odoo",
    segment: "odoo",
    children:[
      {
        segment: "odooForm",
        title: "Odoo Form"
      }
    ]
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
      {
        segment: "allForms",
        title: "All Forms",
        icon: <FormatListNumberedIcon />,
      },
      {
        segment: "categories",
        title: "Categories",
        icon: <CategoryIcon />,
      },
    ],
  },
  {
    segment: "forms",
    title: "User Form",
    icon: <FormatAlignCenterIcon />,
    children: [
      {
        segment: "viewUserForm",
        title: "View User Forms",
        icon: <TableViewIcon />,
      },
    ],
  },
]
