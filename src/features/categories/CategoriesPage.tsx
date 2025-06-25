import { Button, ButtonGroup, Paper } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import DeleteIcon from "@mui/icons-material/Delete"
import useRowsCategories from "./hooks/useRowsCategories.ts"
import { useColumsCategories } from "./hooks/useColumsCategories.tsx"
import { paginationModel } from "../../utils/CONST.ts"
import { DataGrid } from "@mui/x-data-grid"
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts"
import { useEffect } from "react"
import { selectToken } from "../login/authSlice.ts"
import { getAllCategoriesThunk } from "./categoriesSlice.ts"

export default function CategoriesPage() {
  const rows = useRowsCategories()
  const columns = useColumsCategories()
  const dispatch = useAppDispatch()
  const token = useAppSelector(selectToken)

  useEffect(() => {
    dispatch(getAllCategoriesThunk(token))
  }, [token])

  const handleCreateCategory = () => {
    console.log("create category")
  }
  const handleDeleteCategory = () => {
    console.log("delete Category")
  }
  return (
    <>
      <ButtonGroup variant="outlined" aria-label="Loading button group">
        <Button startIcon={<AddIcon />} onClick={handleCreateCategory}>
          Create Form
        </Button>
        <Button
          startIcon={<DeleteIcon />}
          color="error"
          onClick={handleDeleteCategory}
          // disabled={!selectedRows?.ids}
        >
          Delete
        </Button>
      </ButtonGroup>

      <Paper sx={{ height: "100%", width: "80%" }}>
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
