import { Button, Stack } from "@mui/material"
import type { MouseEventHandler } from "react"

export default function ButtonLink({
  handleReturn,
  withoutSubmit = true,
}: ButtonProps) {
  return (
    <Stack spacing={2} direction={"row"} margin={2}>
      {withoutSubmit && (
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          {"Submit"}
        </Button>
      )}
      <Button
        type="submit"
        variant="outlined"
        color="primary"
        onClick={handleReturn}
      >
        {"Back"}
      </Button>
    </Stack>
  )
}

type ButtonProps = {
  handleReturn?: MouseEventHandler<HTMLButtonElement>
  withoutSubmit?: boolean
}
