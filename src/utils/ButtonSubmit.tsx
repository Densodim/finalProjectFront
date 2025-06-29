import type { PropsWithChildren } from "react"
import { Button } from "@mui/material"

export default function ButtonSubmit({ children }: PropsWithChildren) {
  return (
    <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
      {children}
    </Button>
  )
}
