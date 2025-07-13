import {
  Box,
  Button,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts"
import {
  featchUserFromToken,
  selectApiTokenOdoo,
  selectToken,
  selectUserId,
} from "../../login/authSlice.ts"
import {
  getAPITokenThunk,
  importFromOdooThunk,
  selectImportedCountImport,
  selectOdooStatus,
} from "../odooSlice.ts"
import { useNavigate } from "react-router"
import ExternalResultsViewer from "./ExternalResultsViewer.tsx"

export default function ExternalResultPage() {
  const token = useAppSelector(selectToken)
  const dispatch = useAppDispatch()
  const apiToken = useAppSelector(selectApiTokenOdoo)
  const navigate = useNavigate()
  const status = useAppSelector(selectOdooStatus)
  const userId = useAppSelector(selectUserId)
  const importedCount = useAppSelector(selectImportedCountImport)

  const handleGetAPIToken = async () => {
    await dispatch(getAPITokenThunk(token))
    await dispatch(featchUserFromToken(token))
    navigate("/odoo/externalResult")
  }
  const handleImportFromOdoo = () => {
    if (userId) {
      dispatch(importFromOdooThunk(userId))
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
      <Box
        component={Paper}
        elevation={3}
        sx={{
          p: 3,
          borderRadius: 2,
          maxWidth: 600,
          mx: "auto",
          mt: 4,
          textAlign: "center",
        }}
      >
        <Stack spacing={2}>
          <Stack gap={1} direction={"row"}>
            <Button variant="contained" onClick={handleGetAPIToken}>
              Get API Token
            </Button>
            <Button variant="contained" onClick={handleImportFromOdoo}>
              Import Form
            </Button>
          </Stack>
          {apiToken && (
            <Box
              sx={{
                p: 2,
                bgcolor: "#f4f4f4",
                border: "1px solid #ccc",
                borderRadius: 1,
                wordBreak: "break-all",
              }}
            >
              <Typography variant="subtitle2" color="text.secondary">
                Your API Token:
              </Typography>
              <Typography variant="body2" sx={{ fontFamily: "monospace" }}>
                {apiToken}
              </Typography>
            </Box>
          )}
        </Stack>
        <Stack spacing={2}>
          <Typography>Import Forms: {importedCount}</Typography>
        </Stack>
      </Box>
      <ExternalResultsViewer />
    </>
  )
}
