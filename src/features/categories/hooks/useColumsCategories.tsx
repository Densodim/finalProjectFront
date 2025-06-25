import type { GridColDef } from "@mui/x-data-grid"
import { IconButton } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import { useNavigate } from "react-router"

export function useColumsCategories() {
  const navigate = useNavigate()

  const colums:GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    {field: 'name', headerName: "Name", width: 130 },
    {field: 'description', headerName: "Description", width: 200 },
    { field: "createdAt", headerName: "Created", width: 130 },
    { field: "updatedAt", headerName: "Updated", width: 130 },
    {
      field: "edit",
      headerName: "Edit",
      width: 80,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: params => (
        <IconButton
          color="primary"
          onClick={() => {
            navigate(``)
            console.log(params.id)
          }}
        >
          <EditIcon />
        </IconButton>
      ),
    },
  ]
  return  colums
}