import { Button, Grid, Paper, Typography } from "@mui/material"
import { Outlet, useNavigate } from "react-router"

export default function UserPage() {
  const navigate = useNavigate()
  return (
    <>
      <Outlet />
      <Grid container spacing={4}>
        <Grid>
          <Paper elevation={6} sx={{ p: 6 }}>
            <Typography variant="h6">Title</Typography>
            <Typography variant="body2" color="text.secondary">
              Description
            </Typography>
            <Button
              fullWidth
              variant="outlined"
              sx={{ mt: 2 }}
              onClick={() => navigate(`/form/${1}`)}
            >
              Open
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}
