import { styled } from "@mui/material/styles"
import Button from "@mui/material/Button"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import type { ChangeEvent } from "react"
import type { FormikErrors } from "formik"
import { Typography } from "@mui/material"

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

export default function InputFileUpload({
  data,
  setFieldValue,
  errors,
}: Props) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFieldValue("file", event.target.files[0] as File)
    }
  }
  return (
    <div>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        Upload files
        <VisuallyHiddenInput
          type="file"
          onChange={event => handleChange(event)}
          multiple
          accept="image/png, .svg, .jpg, .jpeg"
        />
      </Button>
      {data.file?.name && <div>{data.file?.name}</div>}
      {errors.file && (
        <>
          <Typography component="div" variant="body2" color="textSecondary">
            {errors.file}
          </Typography>
        </>
      )}
    </div>
  )
}
//types
type Props = {
  data: { file?: File }
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => Promise<FormikErrors<{ file?: File }>> | Promise<void>
  errors: FormikErrors<{ file?: File }>
}
