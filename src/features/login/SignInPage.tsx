import { Box, Button, Link } from "@mui/material"
import { translations } from "./lib/translations.ts"
import WrapperBox from "./lib/components/WrapperBox.tsx"
import { useFormik } from "formik"
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts"
import { loginAsync, selectError, selectLanguage } from "./authSlice.ts"
import { enqueueSnackbar } from "notistack"
import HeaderForm from "./lib/components/HeaderForm.tsx"
import WrapperTextField from "./lib/components/WrapperTextField.tsx"
import { useNavigate } from "react-router"

export default function SignInPage() {
  const currentLanguage = useAppSelector(selectLanguage)
  const t = translations[currentLanguage]

  const dispatch = useAppDispatch()
  const error = useAppSelector(selectError)
  const navigate = useNavigate()

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
          password: "The minimum foam length should be 6 chapters",
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

  const handleNavigateRegister = async () => {
    await navigate("/register")
  }
  return (
    <WrapperBox>
      <HeaderForm title={t.login} />
      <Box component="form" onSubmit={formikLogin.handleSubmit}>
        <WrapperTextField
          label={t.email}
          fieldProps={formikLogin.getFieldProps("email")}
          placeholder={t.email}
          error={formikLogin.errors.email}
        />
        <WrapperTextField
          label={t.password}
          fieldProps={formikLogin.getFieldProps("password")}
          placeholder={t.password}
          error={formikLogin.errors.password}
          isPassword
        />
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
        <Link
          component={"button"}
          variant={"body2"}
          onClick={handleNavigateRegister}
        >
          {t.submitRegister}
        </Link>
      </Box>
    </WrapperBox>
  )
}
