import { Link } from "@mui/material"
import type { MouseEventHandler } from "react"

export default function ButtonLink({ value, onClick }: ButtonLinkProps) {
  return (
    <Link component="button" variant="body2" onClick={onClick}>
      {value}
    </Link>
  )
}

type ButtonLinkProps = {
  value: string
  onClick?: MouseEventHandler<HTMLButtonElement>
}
