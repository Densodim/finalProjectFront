import { styled } from "@mui/material/styles"
import Button from "@mui/material/Button"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import type { ChangeEvent } from "react"

type InputFileUploadDropboxProps = {
  onChange?: (event: ChangeEvent<HTMLInputElement>) => Promise<void>
}

export default function InputFileUploadDropbox({
  onChange,
}: InputFileUploadDropboxProps) {
  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      Upload files
      <VisuallyHiddenInput type="file" onChange={onChange} multiple />
    </Button>
  )
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
})
