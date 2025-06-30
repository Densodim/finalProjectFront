import { Button, Grid, LinearProgress, Paper, Typography } from "@mui/material"
import { Outlet, useNavigate } from "react-router"
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts"
import { useEffect } from "react"
import { selectToken } from "../login/authSlice.ts"
import {
  getPublishedFormThunk,
  selectAllForms,
  selectStatusForm,
} from "../forms/formsSlice.ts"

export default function HomePage() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const token = useAppSelector(selectToken)
  const statusForm = useAppSelector(selectStatusForm)
  const forms = useAppSelector(selectAllForms)

  useEffect(() => {
    dispatch(getPublishedFormThunk(token))
  }, [token])

  if (statusForm === "loading") {
    return (
      <div style={{ width: "100%" }}>
        <LinearProgress />
      </div>
    )
  }

  return (
    <>
      <Outlet />
      <Grid container spacing={4}>
        {forms?.map(form => (
          <Grid key={form.id}>
            <Paper elevation={6} sx={{ p: 6 }}>
              <Typography variant="h6">{form.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {form.description}
              </Typography>
              <Button
                fullWidth
                variant="outlined"
                sx={{ mt: 2 }}
                onClick={() => navigate(`/forms/viewForm/${form.id}`)}
              >
                Open
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </>
  )
}
