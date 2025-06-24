import { useAppDispatch, useAppSelector } from "../../../../app/hooks.ts"
import { deleteUserThunk, fetchAllUsers } from "../../adminSlice.ts"
import { useEffect, useState } from "react"
import { selectToken } from "../../../login/authSlice.ts"
import { Button, ButtonGroup, Paper } from "@mui/material"
import type { GridRowSelectionModel } from "@mui/x-data-grid"
import { DataGrid } from "@mui/x-data-grid"
import AddIcon from "@mui/icons-material/Add"
import DeleteIcon from "@mui/icons-material/Delete"
import { useNavigate } from "react-router"
import useRowsUsers from "../../hooks/useRowsUsers.ts"
import useColumsUsers from "../../hooks/useColumsUsers.tsx"

const paginationModel = { page: 0, pageSize: 5 }

export default function AllUsersPage() {
  const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>()
  const gridRowId = selectedRows?.ids ? Array.from(selectedRows?.ids) : []

  const navigate = useNavigate()

  const dispatch = useAppDispatch()
  const token = useAppSelector(selectToken)

  const rows = useRowsUsers()
  const columns = useColumsUsers()

  useEffect(() => {
    if (token != null) {
      dispatch(fetchAllUsers(token))
    }
  }, [token])

  const handleDeleteUsers = async () => {
    for (const id of gridRowId) {
      await dispatch(
        deleteUserThunk({
          id: Number(id),
          token,
        }),
      )
    }
    if (token) {
      dispatch(fetchAllUsers(token))
    }
    setSelectedRows(undefined)
  }

  const handleCreateUser = () => {
    navigate("/admin/createUser")
  }

  return (
    <>
      <ButtonGroup variant="outlined" aria-label="Loading button group">
        <Button
          startIcon={<AddIcon />}
          onClick={handleCreateUser}
        >
          Create User
        </Button>
        <Button
          startIcon={<DeleteIcon />}
          color="error"
          onClick={handleDeleteUsers}
          disabled={!selectedRows?.ids}
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
