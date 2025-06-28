import { useParams } from "react-router"
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts"
import { selectToken } from "../login/authSlice.ts"
import { Button, ButtonGroup, LinearProgress, Paper } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import DeleteIcon from "@mui/icons-material/Delete"
import { DataGrid, type GridRowSelectionModel } from "@mui/x-data-grid"
import { paginationModel } from "../../utils/CONST.ts"
import useRowsQuestions from "./hooks/useRowsQuestions.ts"
import useColumsQuestions from "./hooks/useColumsQuestions.tsx"
import { useEffect, useState } from "react"
import {
  deleteQuestionThunk,
  getQuestionsThunk,
  selectStatusQuestion
} from "./questionsSlice.ts"
import CreateQuestion from "./components/createQuestion.tsx"

export default function QuestionsPage() {
  const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>()
  const [open, setOpen] = useState<boolean>(false)

  const gridRowId = selectedRows?.ids ? Array.from(selectedRows?.ids) : []
  const params = useParams()
  const token = useAppSelector(selectToken)
  const dispatch = useAppDispatch()
  const rows = useRowsQuestions()
  const columns = useColumsQuestions()
  const statusQuestion = useAppSelector(selectStatusQuestion)

  useEffect(() => {
    if (token) {
      dispatch(getQuestionsThunk({ token, id: Number(params.id) }))
    }
  }, [])

  const handleCreateQuestion = () => {
    setOpen(prevState => !prevState)
  }

  const handleDeleteQuestion = async () => {
    for (const id of gridRowId) {
      await dispatch(deleteQuestionThunk({ token, id: Number(id) }))
    }
    setSelectedRows(undefined)
    dispatch(getQuestionsThunk({ token, id: Number(params.id) }))
  }

  if (statusQuestion === "loading") {
    return (
      <div style={{ width: "100%" }}>
        <LinearProgress />
      </div>
    )
  }

  return (
    <>
      <CreateQuestion open={open} setOpen={setOpen} formId={Number(params.id)} />
      <ButtonGroup variant="outlined" aria-label="Loading button group">
        <Button startIcon={<AddIcon />} onClick={handleCreateQuestion}>
          Create Questions
        </Button>
        <Button
          startIcon={<DeleteIcon />}
          color="error"
          onClick={handleDeleteQuestion}
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
