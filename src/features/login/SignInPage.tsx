import { Box, Button, Link } from "@mui/material"
import { translations } from "./lib/translations.ts"
import WrapperBox from "./components/WrapperBox.tsx"
import { useFormik } from "formik"
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts"
import { loginAsync, selectError, selectLanguage } from "./authSlice.ts"
import HeaderForm from "./components/HeaderForm.tsx"
import WrapperTextField from "./components/WrapperTextField.tsx"
import { useNavigate } from "react-router"
import { enqueueSnackbar } from "notistack"
import { zodUsers } from "../admin/lib/zodUsers.ts"
import { toFormikValidationSchema } from "zod-formik-adapter"

export default function SignInPage() {
  const currentLanguage = useAppSelector(selectLanguage)
  const t = translations[currentLanguage]

  const dispatch = useAppDispatch()
  const error = useAppSelector(selectError)
  const navigate = useNavigate()

  const formikLogin = useFormik({
    validationSchema:toFormikValidationSchema(zodUsers),
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async values => {
      const result = await dispatch(loginAsync(values))
      if (loginAsync.fulfilled.match(result)) {
        navigate("/")
      } else {
        enqueueSnackbar(error?.message, { variant: "error" })
      }
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
          fullWidth
        />
        <WrapperTextField
          label={t.password}
          fieldProps={formikLogin.getFieldProps("password")}
          placeholder={t.password}
          error={formikLogin.errors.password}
          isPassword
          fullWidth
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
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
