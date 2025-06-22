import { Visibility, VisibilityOff } from "@mui/icons-material"
import { IconButton, InputAdornment, TextField } from "@mui/material"
import { useState } from "react"

export default function WrapperTextField({
                                           label,
                                           placeholder,
                                           type = "text",
                                           error,
                                           fieldProps,
                                           fullWidth = false,
                                           isPassword = false
                                         }: Props) {
  const [showPassword, setShowPassword] = useState(false)

  const actualType = isPassword ? (showPassword ? "text" : "password") : type

  return (
    <>
      <TextField
        margin="normal"
        label={label}
        placeholder={placeholder}
        type={actualType}
        {...fieldProps}
        fullWidth={fullWidth}
      InputProps={
      isPassword
        ? {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => {
                  setShowPassword(v => !v)
                }}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }
        : undefined
    }
      />
      {error && <div className="text-danger">{error}</div>}
    </>
  )
}

type Props = {
  label: string
  placeholder?: string
  type?: "text" | "password"
  error?: string
  fieldProps: any
  isPassword?: boolean
  fullWidth?: boolean
}
