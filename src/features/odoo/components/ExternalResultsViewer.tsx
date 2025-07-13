import { useEffect } from "react"
import { getExternalResultsThunk, selectExternalResult } from "../odooSlice.ts"
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts"
import { selectApiTokenOdoo, selectToken } from "../../login/authSlice.ts"
import {
  Box,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material"

export default function ExternalResultsViewer() {
  const apiToken = useAppSelector(selectApiTokenOdoo)
  const dispatch = useAppDispatch()
  const token = useAppSelector(selectToken)
  const externalResults = useAppSelector(selectExternalResult)
  useEffect(() => {
    if (apiToken) {
      dispatch(getExternalResultsThunk({ token, apiToken }))
    }
  }, [])

  return (
    <>
      <Box sx={{ mt: 4 }}>
        {externalResults?.map((form, idx) => (
          <Box key={form.id} sx={{ mb: 5 }}>
            <Typography variant="h6" gutterBottom>
              {idx + 1}. {form.title} (ID: {form.id})
            </Typography>

            <TableContainer
              component={Paper}
              sx={{ borderRadius: 2, boxShadow: 2 }}
            >
              <Table size="small">
                <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableRow>
                    <TableCell>
                      <strong>#</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Text</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Type</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Answers Count</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Top Answers</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {form.questions.map((q, i) => (
                    <TableRow key={i}>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell>{q.text}</TableCell>
                      <TableCell>{q.type}</TableCell>
                      <TableCell>{q.count}</TableCell>
                      <TableCell>
                        {q.topAnswers.length > 0 ? (
                          q.topAnswers.join(", ")
                        ) : (
                          <em>—</em>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Divider sx={{ mt: 4 }} />
          </Box>
        ))}
      </Box>
    </>
  )
}
