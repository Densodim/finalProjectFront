import CreateFormPage from "../forms/components/createFormPage.tsx"
import {
  Button,
  ButtonGroup,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import DeleteIcon from "@mui/icons-material/Delete"
import { DataGrid, type GridRowSelectionModel } from "@mui/x-data-grid"
import { paginationModel } from "../../utils/CONST.ts"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts"
import { selectToken } from "../login/authSlice.ts"
import useRowsForms from "../forms/hooks/useRowsForms.ts"
import useColumsForms from "../forms/hooks/useColumsForms.tsx"
import {
  getAllCategoriesThunk,
  selectStatusCategories,
} from "../categories/categoriesSlice.ts"
import {
  deleteFormThunk,
  getUserFormThunk,
  selectStatusForm,
} from "../forms/formsSlice.ts"
import ImportExportIcon from "@mui/icons-material/ImportExport"
import { exportToOdooThunk, selectExportCountQuestionOdoo, selectOdooMessage } from "../odoo/odooSlice.ts"

export default function UserPage() {
  const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>()
  const gridRowId = selectedRows?.ids ? Array.from(selectedRows?.ids) : []

  const [createForm, setCreateForm] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const token = useAppSelector(selectToken)
  const rows = useRowsForms()
  const columns = useColumsForms()
  const statusCategory = useAppSelector(selectStatusCategories)
  const statusForm = useAppSelector(selectStatusForm)
  const messagOdoo = useAppSelector(selectOdooMessage)
  const exportCountQuestion = useAppSelector(selectExportCountQuestionOdoo)

  useEffect(() => {
    dispatch(getUserFormThunk(token))
    dispatch(getAllCategoriesThunk(token))
  }, [token])

  const handleDeleteForm = async () => {
    for (const id of gridRowId) {
      await dispatch(deleteFormThunk({ token, id: Number(id) }))
    }
    if (token) {
      await dispatch(getUserFormThunk(token))
    }
    setSelectedRows(undefined)
  }

  const handleExportToOdoo = async () => {
    for (const id of gridRowId) {
      await dispatch(exportToOdooThunk(Number(id)))
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
      <CreateFormPage open={createForm} setOpen={setCreateForm} users={true} />
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
        <Button
          startIcon={<ImportExportIcon />}
          color="primary"
          onClick={handleExportToOdoo}
        >
          Export Form
        </Button>
      </ButtonGroup>
      <Stack spacing={2} direction="column">
        <Typography>{messagOdoo} : {exportCountQuestion}</Typography>
      </Stack>

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
