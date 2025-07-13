import { useParams } from "react-router"
import { LinearProgress, Paper, Typography } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts"
import {
  getSurveyIdThunk,
  selectOdooStatus,
  selectSurveyId,
} from "../odooSlice.ts"
import { useEffect } from "react"

export default function SurveyIdPage() {
  const params = useParams()
  const dispatch = useAppDispatch()
  const status = useAppSelector(selectOdooStatus)
  const surveyId = useAppSelector(selectSurveyId)
  console.log(surveyId)

  useEffect(() => {
    if (params.id) {
      dispatch(getSurveyIdThunk(params.id))
    }
  }, [])

  console.log(params.id)

  if (status === "loading") {
    return (
      <div style={{ width: "100%" }}>
        <LinearProgress />
      </div>
    )
  }
  return (
    <>
      <Paper sx={{ p: 2, my: 2 }}>
        <Typography variant="h6">Survey: {surveyId?.survey.title}</Typography>
        <Typography>ID: {surveyId?.surveyId}</Typography>
        <Typography>Description: {surveyId?.survey.description}</Typography>
        <Typography>Created: {surveyId?.survey.create_date}</Typography>
        <Typography>
          User: {surveyId?.survey.user_id[1]} (ID: {surveyId?.survey.user_id[0]}
          )
        </Typography>
      </Paper>
    </>
  )
}
