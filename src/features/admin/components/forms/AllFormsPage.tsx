import { Button, ButtonGroup, Paper } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import DeleteIcon from "@mui/icons-material/Delete"
import { useAppDispatch, useAppSelector } from "../../../../app/hooks.ts"
import { selectToken } from "../../../login/authSlice.ts"
import { useEffect } from "react"
import { getAllFormsThunk, selectAllForms } from "../../../forms/formsSlice.ts"
import { paginationModel } from "../../../../utils/CONST.ts"
import { DataGrid } from "@mui/x-data-grid"
import useRowsForms from "../../../forms/hooks/useRowsForms.ts"
import useColumsForms from "../../../forms/hooks/useColumsForms.tsx"

export default function AllFormsPage() {
  const dispatch = useAppDispatch()
  const token = useAppSelector(selectToken)
  const forms = useAppSelector(selectAllForms)
  const rows = useRowsForms()
  const columns = useColumsForms()
  console.log(forms)

  useEffect(() => {
    dispatch(getAllFormsThunk(token))
  }, [token])

  const handleDeleteForm = () => {
    console.log("delete")
  }
  const handleCreateForm = () => {
    console.log("Create Form")
  }
  return (
    <>
      <ButtonGroup variant="outlined" aria-label="Loading button group">
        <Button startIcon={<AddIcon />} onClick={handleCreateForm}>
          Create Form
        </Button>
        <Button
          startIcon={<DeleteIcon />}
          color="error"
          onClick={handleDeleteForm}
          // disabled={!selectedRows?.ids}
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
          // onRowSelectionModelChange={prevSelect => setSelectedRows(prevSelect)}
          // rowSelectionModel={selectedRows}
        />
      </Paper>
    </>
  )
}
