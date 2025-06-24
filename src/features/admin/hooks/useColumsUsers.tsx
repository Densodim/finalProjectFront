import type { GridColDef } from "@mui/x-data-grid"
import { IconButton } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import { useNavigate } from "react-router"

export default function useColumsUsers() {
  const navigate = useNavigate()

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "email", headerName: "Email", width: 130 },
    { field: "name", headerName: "User Name", width: 130, sortable: false },
    { field: "role", headerName: "role", width: 120 },
    { field: "isActive", headerName: "isActive", type: "boolean", width: 70 },
    { field: "lastLogin", headerName: "Last Login", width: 130 },
    { field: "createdAt", headerName: "Created", width: 130 },
    { field: "updatedAt", headerName: "Updated", width: 130 },
    {
      field: "edit",
      headerName: "Edit",
      width: 100,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: params => (
        <IconButton
          color="primary"
          onClick={() => {
            navigate(`/admin/editUser/${params.id}`)
          }}
        >
          <EditIcon />
        </IconButton>
      ),
    },
  ]

  return columns
}
