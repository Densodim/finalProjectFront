import type { PropsWithChildren } from "react"
import { Box, Paper } from "@mui/material"

export default function WrapperBox({ children }: PropsWithChildren) {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="#f5f6fa"
    >
      <Paper elevation={6} sx={{ p: 4, minWidth: 350 }}>
        {children}
      </Paper>
    </Box>
  )
}
