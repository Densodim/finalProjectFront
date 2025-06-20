import WrapperBox from "./components/WrapperBox.tsx"
import { Box, Button, Stack } from "@mui/material"
import HeaderForm from "./components/HeaderForm.tsx"
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts"
import {
  registerAsync,
  selectError,
  selectLanguage,
  selectMessage,
} from "./authSlice.ts"
import { translations } from "./lib/translations.ts"
import { useFormik } from "formik"
import WrapperTextField from "./components/WrapperTextField.tsx"
import { enqueueSnackbar } from "notistack"
import { useNavigate } from "react-router"

export default function RegisterPage() {
  const currentLanguage = useAppSelector(selectLanguage)
  const t = translations[currentLanguage]
  const error = useAppSelector(selectError)
  const message = useAppSelector(selectMessage)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const formikRegister = useFormik({
    validate: values => {
      if (!values.name) {
        return {
          name: "Name is required",
        }
      }
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
      name: "",
    },
    onSubmit: async values => {
      await dispatch(registerAsync(values))
    },
  })

  const handleReturn = async () => {
    await navigate("/sign-in")
  }
  const handleSubmit = () => {
    enqueueSnackbar(error?.message, { variant: "error" })
    setTimeout(() => {
      navigate("/sign-in")
    }, 2000)
  }

  return (
    <WrapperBox>
      <Box component="form" onSubmit={formikRegister.handleSubmit}>
        <HeaderForm title={t.register} />
        <WrapperTextField
          label={t.username}
          fieldProps={formikRegister.getFieldProps("name")}
          placeholder={t.username}
          error={formikRegister.errors.name}
        />
        <WrapperTextField
          label={t.email}
          fieldProps={formikRegister.getFieldProps("email")}
          placeholder={t.email}
          error={formikRegister.errors.email}
        />
        <WrapperTextField
          label={t.password}
          fieldProps={formikRegister.getFieldProps("password")}
          placeholder={t.password}
          isPassword
          error={formikRegister.errors.password}
        />
        {message && <div className="text-bg-success">{message}</div>}
        <Stack spacing={2} direction={"row"}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleSubmit}
          >
            {t.submit}
          </Button>
          <Button
            type="submit"
            variant="outlined"
            color="primary"
            onClick={handleReturn}
          >
            {t.cancel}
          </Button>
        </Stack>
      </Box>
    </WrapperBox>
  )
}
