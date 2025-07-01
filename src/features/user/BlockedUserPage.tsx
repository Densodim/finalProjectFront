import { Box, Container, CssBaseline, Typography } from "@mui/material"

export default function BlockedUserPage() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ height: "100vh" }}>
          <Typography variant='h6' >
            For some unknown reason, your access has been denied. Please contact
            the site administrator.
          </Typography>
        </Box>
      </Container>
    </>
  )
}
