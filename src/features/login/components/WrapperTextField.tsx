import { Visibility, VisibilityOff } from "@mui/icons-material"
import { IconButton, InputAdornment, TextField } from "@mui/material"
import { useState } from "react"

export default function WrapperTextField({
                                        label,
                                        placeholder,
                                        type = "text",
                                        error,
                                        fieldProps,
                                        isPassword = false,
                                      }: Props) {
  const [showPassword, setShowPassword] = useState(false)

  const actualType = isPassword ? (showPassword ? "text" : "password") : type


  return (
    <>
      <TextField
        fullWidth
        margin="normal"
        label={label}
        placeholder={placeholder}
        type={actualType}
        {...fieldProps}
        InputProps={
          isPassword
            ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => { setShowPassword(v => !v); }}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }
            : undefined
        }
      />
      {error && <div className="text-bg-info">{error}</div>}
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
}