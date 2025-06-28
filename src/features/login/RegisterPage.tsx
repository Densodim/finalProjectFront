import WrapperBox from "./components/WrapperBox.tsx"
import { Button, LinearProgress, Stack } from "@mui/material"
import HeaderForm from "./components/HeaderForm.tsx"
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts"
import {
  registerAsync,
  selectError,
  selectLanguage,
  selectMessage,
  selectStatus,
} from "./authSlice.ts"
import { translations } from "./lib/translations.ts"
import { useFormik } from "formik"
import WrapperTextField from "./components/WrapperTextField.tsx"
import { enqueueSnackbar } from "notistack"
import { useNavigate } from "react-router"
import { toFormikValidationSchema } from "zod-formik-adapter"
import { zodRegister } from "./lib/zodLogin.ts"

export default function RegisterPage() {
  const currentLanguage = useAppSelector(selectLanguage)
  const t = translations[currentLanguage]
  const error = useAppSelector(selectError)
  const message = useAppSelector(selectMessage)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isLoading = useAppSelector(selectStatus)

  const formikRegister = useFormik({
    validationSchema: toFormikValidationSchema(zodRegister),
    initialValues: {
      email: "",
      password: "",
      name: "",
    },
    onSubmit: async values => {
      await dispatch(registerAsync(values))
      navigate("/")
    },
  })
  const handleSubmit = () => {
    enqueueSnackbar(error?.message, { variant: "error" })
    setTimeout(() => {
      navigate("/sign-in")
    }, 2000)
  }

  if (isLoading === "loading") {
    return (
      <div style={{ width: "100%" }}>
        <LinearProgress />
      </div>
    )
  }

  return (
    <WrapperBox>
      <Stack
        component="form"
        sx={{ width: "50ch" }}
        spacing={2}
        noValidate
        autoComplete="on"
        onSubmit={formikRegister.handleSubmit}
      >
        <HeaderForm title={t.register} />
        <WrapperTextField
          label={t.username}
          fieldProps={formikRegister.getFieldProps("name")}
          placeholder={t.username}
          error={formikRegister.errors.name}
          fullWidth
        />
        <WrapperTextField
          label={t.email}
          fieldProps={formikRegister.getFieldProps("email")}
          placeholder={t.email}
          error={formikRegister.errors.email}
          fullWidth
        />
        <WrapperTextField
          label={t.password}
          fieldProps={formikRegister.getFieldProps("password")}
          placeholder={t.password}
          isPassword
          fullWidth
          error={formikRegister.errors.password}
        />
        {message && <div className="text-danger">{message}</div>}
        <Stack spacing={2} direction={"row"}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleSubmit}
          >
            {t.submitRegister}
          </Button>
          <Button type="submit" variant="outlined" color="primary">
            {t.cancel}
          </Button>
        </Stack>
      </Stack>
    </WrapperBox>
  )
}
