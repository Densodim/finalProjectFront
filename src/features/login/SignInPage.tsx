import { useState } from "react"
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material"
import { Person, Visibility, VisibilityOff } from "@mui/icons-material"
import { translations } from "./lib/translations.ts"
import WrapperBox from "./lib/WrapperBox.tsx"
import { useFormik } from "formik"
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts"
import { loginAsync, selectError } from "./loginSlice.ts"
import { enqueueSnackbar } from "notistack"

export default function SignInPage() {
  const [lang, setLang] = useState<"ru" | "en">("ru")
  const [showPassword, setShowPassword] = useState(false)
  const t = translations[lang]

  const dispatch = useAppDispatch()
  const error = useAppSelector(selectError)

  const formikLogin = useFormik({
    validate: values => {
      if (!values.email) {
        return {
          email: "Email is required",
        }
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        return {
          email: "Invalid email address",
        }
      }
      if (!values.password) {
        return {
          password: "Password is required",
        }
      }
    },
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async values => {
      await dispatch(loginAsync(values))
    },
  })

  return (
    <WrapperBox>
      <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
        <Person sx={{ fontSize: 48, color: "#1976d2" }} />
        <Typography variant="h5" fontWeight={600} mt={1} mb={2}>
          {t.login}
        </Typography>
        <ToggleButtonGroup
          value={lang}
          exclusive
          onChange={(_, value) => value && setLang(value)}
          size="small"
          sx={{ mb: 1 }}
        >
          <ToggleButton value="ru">RU</ToggleButton>
          <ToggleButton value="en">EN</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Box component="form" onSubmit={formikLogin.handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label={t.email}
          placeholder={t.email}
          {...formikLogin.getFieldProps("email")}
        />
        {formikLogin.errors.email ? <div className='text-bg-info'>{formikLogin.errors.email}</div> : null}
        <TextField
          fullWidth
          margin="normal"
          label={t.password}
          placeholder={t.enterPassword}
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(v => !v)} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          {...formikLogin.getFieldProps("password")}
        />
        {formikLogin.errors.password ? <div className='text-bg-info'>{formikLogin.errors.password}</div> : null}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={() => enqueueSnackbar(error, {variant:'error'})}
        >
          {t.submit}
        </Button>
      </Box>
    </WrapperBox>
  )
}
