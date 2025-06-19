import { useState } from "react"
import { Box, Button } from "@mui/material"
import { translations } from "./lib/translations.ts"
import WrapperBox from "./lib/WrapperBox.tsx"
import { useFormik } from "formik"
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts"
import { loginAsync, selectError, selectLanguage } from "./authSlice.ts"
import { enqueueSnackbar } from "notistack"
import ButtonLink from "../../utils/ButtonLink.tsx"
import RegisterPage from "./RegisterPage.tsx"
import HeaderForm from "./lib/HeaderForm.tsx"
import WrapperTextField from "./lib/WrapperTextField.tsx"

export default function SignInPage() {
  // const [showPassword, setShowPassword] = useState(false)
  const [register, setRegister] = useState(false)

  const currentLanguage = useAppSelector(selectLanguage)
  const t = translations[currentLanguage]

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
      } else if (values.password.length < 6) {
        return {
          password: "The minimum foam length should be 6",
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

  if (register) {
    return <RegisterPage />
  }

  return (
    <WrapperBox>
      <HeaderForm title={t.login} />
      <Box component="form" onSubmit={formikLogin.handleSubmit}>
        <WrapperTextField
          label={t.email}
          fieldProps={formikLogin.getFieldProps("email")}
          placeholder={t.email}
        />
        {formikLogin.errors.email ? (
          <div className="text-bg-info">{formikLogin.errors.email}</div>
        ) : null}
        <WrapperTextField
          label={t.password}
          fieldProps={formikLogin.getFieldProps("password")}
          placeholder={t.password}
          error={formikLogin.errors.password}
        />
        {formikLogin.errors.password ? (
          <div className="text-bg-info">{formikLogin.errors.password}</div>
        ) : null}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={() => enqueueSnackbar(error?.message, { variant: "error" })}
        >
          {t.submit}
        </Button>
        <ButtonLink
          value={t.register}
          onClick={() => {
            setRegister(true)
          }}
        />
      </Box>
    </WrapperBox>
  )
}
