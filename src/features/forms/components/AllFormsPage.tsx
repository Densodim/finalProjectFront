import { Button, ButtonGroup, LinearProgress, Paper } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import DeleteIcon from "@mui/icons-material/Delete"
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts"
import { selectToken } from "../../login/authSlice.ts"
import { useEffect, useState } from "react"
import {
  deleteFormThunk,
  getAllFormsThunk,
  selectStatusForm,
} from "../formsSlice.ts"
import { paginationModel } from "../../../utils/CONST.ts"
import { DataGrid, type GridRowSelectionModel } from "@mui/x-data-grid"
import useRowsForms from "../hooks/useRowsForms.ts"
import useColumsForms from "../hooks/useColumsForms.tsx"
import {
  getAllCategoriesThunk,
  selectStatusCategories,
} from "../../categories/categoriesSlice.ts"
import CreateFormPage from "./createFormPage.tsx"

export default function AllFormsPage() {
  const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>()
  const gridRowId = selectedRows?.ids ? Array.from(selectedRows?.ids) : []

  const [createForm, setCreateForm] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const token = useAppSelector(selectToken)
  const rows = useRowsForms()
  const columns = useColumsForms()
  const statusCategory = useAppSelector(selectStatusCategories)
  const statusForm = useAppSelector(selectStatusForm)

  useEffect(() => {
    dispatch(getAllFormsThunk(token))
    dispatch(getAllCategoriesThunk(token))
  }, [token])

  const handleDeleteForm = async () => {
    for (const id of gridRowId) {
      await dispatch(deleteFormThunk({ token, id: Number(id) }))
    }
    if (token) {
      await dispatch(getAllFormsThunk(token))
    }
    setSelectedRows(undefined)
  }
  const handleCreateForm = () => {
    setCreateForm(prevState => !prevState)
  }

  if (statusCategory === "loading" || statusForm === "loading") {
    return (
      <div style={{ width: "100%" }}>
        <LinearProgress />
      </div>
    )
  }
  return (
    <>
      <CreateFormPage open={createForm} setOpen={setCreateForm} />
      <ButtonGroup variant="outlined" aria-label="Loading button group">
        <Button startIcon={<AddIcon />} onClick={handleCreateForm}>
          Create Form
        </Button>
        <Button
          startIcon={<DeleteIcon />}
          color="error"
          onClick={handleDeleteForm}
          disabled={!selectedRows?.ids && selectedRows === undefined}
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
