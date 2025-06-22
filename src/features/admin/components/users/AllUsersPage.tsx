import { useAppDispatch, useAppSelector } from "../../../../app/hooks.ts"
import { fetchAllUsers, selectAllUsers } from "../../adminSlice.ts"
import { useEffect, useState } from "react"
import { selectToken } from "../../../login/authSlice.ts"
import { Button, ButtonGroup, Paper } from "@mui/material"
import type { GridColDef, GridRowSelectionModel } from "@mui/x-data-grid"
import { DataGrid } from "@mui/x-data-grid"
import AddIcon from "@mui/icons-material/Add"
import DeleteIcon from "@mui/icons-material/Delete"
import { useNavigate } from "react-router"

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "email", headerName: "Email", width: 130 },
  { field: "name", headerName: "User Name", width: 130, sortable: false },
  { field: "role", headerName: "role", width: 120 },
  { field: "isActive", headerName: "isActive", type: "boolean", width: 70 },
  { field: "lastLogin", headerName: "Last Login", width: 130 },
  { field: "createdAt", headerName: "Created", width: 130 },
  { field: "updatedAt", headerName: "Updated", width: 130 },
]

const paginationModel = { page: 0, pageSize: 5 }

export default function AllUsersPage() {
  const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>()
  console.log(selectedRows)

  const navigate = useNavigate()

  const dispatch = useAppDispatch()
  const users = useAppSelector(selectAllUsers)
  const token = useAppSelector(selectToken)

  const rows = users?.map(el => ({
    id: el.id,
    email: el.email,
    name: el.name,
    role: el.role,
    isActive: el.isActive,
    lastLogin: el.lastLoginAt,
    createdAt: el.createdAt,
    updatedAt: el.updatedAt,
  }))

  useEffect(() => {
    if (token != null) {
      dispatch(fetchAllUsers(token))
    }
  }, [token])

  const handleDeleteUsers = () => {
    console.log(selectedRows)
  }

  const handleCreateUser = () => {
    navigate('/admin/createUser')
  }

  return (
    <>
      <ButtonGroup variant="outlined" aria-label="Loading button group">
        <Button startIcon={<AddIcon />} onClick={handleCreateUser}>
          Create User
        </Button>
        <Button
          startIcon={<DeleteIcon />}
          color="error"
          onClick={handleDeleteUsers}
        >
          Delete
        </Button>
      </ButtonGroup>

      <Paper sx={{ height: "100%", width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
          onRowSelectionModelChange={prevSelect => setSelectedRows(prevSelect)}
          rowSelectionModel={selectedRows}
        />
      </Paper>
    </>
  )
}
