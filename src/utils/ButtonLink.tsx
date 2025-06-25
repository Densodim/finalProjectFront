import { Button, Stack } from "@mui/material"
import type { MouseEventHandler } from "react"

export default function ButtonLink({ handleReturn }: ButtonProps) {
  return (
    <Stack spacing={2} direction={"row"} margin={2}>
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        {"Submit"}
      </Button>
      <Button
        type="submit"
        variant="outlined"
        color="primary"
        onClick={handleReturn}
      >
        {"Cancel"}
      </Button>
    </Stack>
  )
}

type ButtonProps = {
  handleReturn?: MouseEventHandler<HTMLButtonElement>
}
