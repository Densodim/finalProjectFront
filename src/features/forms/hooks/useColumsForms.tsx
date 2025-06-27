import type { GridColDef } from "@mui/x-data-grid"
import EditIcon from "@mui/icons-material/Edit"
import { IconButton } from "@mui/material"
import PreviewIcon from "@mui/icons-material/Preview"
import { useNavigate } from "react-router"

export default function useColumsForms() {
  const navigate = useNavigate()

  const colums: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "title", headerName: "Title", width: 130 },
    { field: "description", headerName: "Description", width: 130 },
    {
      field: "isPublished",
      headerName: "Published",
      type: "boolean",
      width: 70,
    },
    {
      field: "isDeleted",
      headerName: "Deleted",
      type: "boolean",
      width: 70,
    },
    { field: "createdAt", headerName: "Created", width: 130 },
    { field: "updatedAt", headerName: "Updated", width: 130 },
    { field: "authorId", headerName: "AuthorId", type: "number", width: 50 },
    {
      field: "categoryId",
      headerName: "CategoryId",
      type: "number",
      width: 50,
    },
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
    {
      field: "view",
      headerName: "View",
      width: 80,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: params => (
        <IconButton
          color="primary"
          onClick={() => {
            navigate(`/forms/viewForm/${params.id}`)
          }}
        >
          <PreviewIcon />
        </IconButton>
      ),
    },
  ]
  return colums
}
