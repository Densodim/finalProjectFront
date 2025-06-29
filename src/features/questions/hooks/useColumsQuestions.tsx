import type { GridColDef } from "@mui/x-data-grid"
import { IconButton } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import { useNavigate } from "react-router"

export default function useColumsQuestions() {
  const navigate = useNavigate()

  const colums: GridColDef[] = [
    { field: "id", headerName: "ID", width: 60 },
    { field: "title", headerName: "Title", width: 80 },
    { field: "desctiption", headerName: "Description", width: 130 },
    { field: "type", headerName: "Type", width: 80 },
    { field: "isRequired", headerName: "Required", width: 80, type: "boolean" },
    { field: "order", headerName: "Order", width: 80, type: "number" },
    { field: "formId", headerName: "formId", width: 80, type: "number" },
    { field: "options", headerName: "options", width: 80 },
    { field: "validation", headerName: "Validation", width: 80 },
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
  return colums
}
