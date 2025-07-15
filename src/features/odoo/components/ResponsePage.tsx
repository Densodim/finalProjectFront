import { useParams } from "react-router"
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts"
import { useEffect } from "react"
import {
  getResponseThunk,
  selectOdooStatus,
  selectResponseAnswer,
} from "../odooSlice.ts"
import {
  Box,
  Divider,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material"
import { enqueueSnackbar } from "notistack"

export default function ResponsePage() {
  const params = useParams()
  const dispatch = useAppDispatch()
  const status = useAppSelector(selectOdooStatus)
  const answers = useAppSelector(selectResponseAnswer)

  useEffect(() => {
    if (params.id) {
      dispatch(getResponseThunk(params.id))
      enqueueSnackbar("The file is successfully uploaded", {
        variant: "success",
      })
    }
  }, [])

  if (status === "loading") {
    return (
      <div style={{ width: "100%" }}>
        <LinearProgress />
      </div>
    )
  }

  return (
    <>
      <Box sx={{ p: 2 }}>
        <Typography variant="h4" gutterBottom>
          Survey Response #{params.id}
        </Typography>

        {answers?.length === 0 ? (
          <Typography variant="body1">There is no data for display.</Typography>
        ) : (
          <Stack spacing={3}>
            {answers?.map((responseGroup, index) => (
              <Paper key={index} elevation={3} sx={{ p: 2 }}>
                <Divider sx={{ my: 1 }} />

                <Stack spacing={1}>
                  {responseGroup.map(answer => (
                    <Box
                      key={answer.id}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        pl: 1,
                      }}
                    >
                      <Typography variant="body1">
                        <strong>{answer.display_name}</strong>{" "}
                        <Typography
                          component="span"
                          variant="caption"
                          color="text.secondary"
                        >
                          ({answer.answer_type})
                        </Typography>
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Paper>
            ))}
          </Stack>
        )}
      </Box>
    </>
  )
}
