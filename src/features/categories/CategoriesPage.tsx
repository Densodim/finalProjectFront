import { Button, ButtonGroup, LinearProgress, Paper } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import DeleteIcon from "@mui/icons-material/Delete"
import useRowsCategories from "./hooks/useRowsCategories.ts"
import { useColumsCategories } from "./hooks/useColumsCategories.tsx"
import { paginationModel } from "../../utils/CONST.ts"
import { DataGrid } from "@mui/x-data-grid"
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts"
import { useEffect, useState } from "react"
import { selectToken } from "../login/authSlice.ts"
import {
  getAllCategoriesThunk,
  selectStatusCategories,
} from "./categoriesSlice.ts"
import CreateCategories from "./components/createCategory.tsx"

export default function CategoriesPage() {
  const [createCategory, setCreateCategory] = useState<boolean>(false)

  const rows = useRowsCategories()
  const columns = useColumsCategories()
  const dispatch = useAppDispatch()
  const token = useAppSelector(selectToken)
  const status = useAppSelector(selectStatusCategories)

  useEffect(() => {
    dispatch(getAllCategoriesThunk(token))
  }, [token])

  const handleCreateCategory = () => {
    setCreateCategory(prevState => !prevState)
    dispatch(getAllCategoriesThunk(token))
  }
  const handleDeleteCategory = () => {
    console.log("delete Category")
  }
  if (status === "loading") {
    return (
      <div style={{ width: "100%" }}>
        <LinearProgress />
      </div>
    )
  }
  return (
    <>
      <CreateCategories open={createCategory} setOpen={setCreateCategory} />

      <ButtonGroup variant="outlined" aria-label="Loading button group">
        <Button startIcon={<AddIcon />} onClick={handleCreateCategory}>
          Create Category
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
