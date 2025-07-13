import { useParams } from "react-router"
import {
  Box,
  Button,
  Divider,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts"
import {
  getLinkOdooThunk,
  getSurveyIdThunk,
  selectLinkOdoo,
  selectOdooStatus,
  selectSurveyId,
} from "../odooSlice.ts"
import { useEffect, useState } from "react"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"

export default function SurveyIdPage() {
  const [copied, setCopied] = useState(false)
  const params = useParams()
  const dispatch = useAppDispatch()
  const status = useAppSelector(selectOdooStatus)
  const surveyId = useAppSelector(selectSurveyId)
  const linkOdoo = useAppSelector(selectLinkOdoo)

  useEffect(() => {
    if (params.id) {
      dispatch(getSurveyIdThunk(params.id))
      dispatch(getLinkOdooThunk(params.id))
    }
  }, [])

  const handleCopy = async () => {
    if (linkOdoo?.surveyLink) {
      await navigator.clipboard.writeText(linkOdoo.surveyLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
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
      <Paper sx={{ p: 3, my: 3, borderRadius: 2, boxShadow: 3 }}>
        <Stack spacing={1}>
          <Typography variant="h6" gutterBottom>
            Survey: {surveyId?.survey.title}
          </Typography>

          <Divider />

          <Typography variant="body2">
            <strong>ID:</strong> {surveyId?.surveyId}
          </Typography>

          <Typography variant="body2">
            <strong>Description:</strong> {surveyId?.survey.description}
          </Typography>

          <Typography variant="body2">
            <strong>Created:</strong>
            {surveyId?.survey.create_date}
          </Typography>

          <Typography variant="body2">
            <strong>User:</strong> {surveyId?.survey.user_id[1]} (ID:{" "}
            {surveyId?.survey.user_id[0]})
          </Typography>

          {linkOdoo?.surveyLink && (
            <Box mt={2}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Link:</strong> {linkOdoo.surveyLink}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Access Token:</strong> {linkOdoo.accessToken}
              </Typography>

              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  color="primary"
                  href={linkOdoo.surveyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Go to the survey
                </Button>

                <Button
                  variant="outlined"
                  color={copied ? "success" : "primary"}
                  startIcon={<ContentCopyIcon />}
                  onClick={handleCopy}
                >
                  {copied ? "Copied!" : "Copy the link"}
                </Button>
              </Stack>
            </Box>
          )}
        </Stack>
      </Paper>
    </>
  )
}
