import WrapperBox from "./lib/components/WrapperBox.tsx"
import { Box } from "@mui/material"
import HeaderForm from "./lib/components/HeaderForm.tsx"
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts"
import { registerAsync, selectLanguage } from "./authSlice.ts"
import { translations } from "./lib/translations.ts"
import { useFormik } from "formik"
import WrapperTextField from "./lib/components/WrapperTextField.tsx"

export default function RegisterPage() {
  const currentLanguage = useAppSelector(selectLanguage)
  const t = translations[currentLanguage]

  const dispatch = useAppDispatch()
 debugger
  const formikRegister = useFormik({
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
      if (!values.name) {
        return {
          name: "Name is required",
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
          label={t.password}
          fieldProps={formikRegister.getFieldProps("password")}
          placeholder={t.password}
          isPassword
          error={formikRegister.errors.password}
        />
      </Box>
    </WrapperBox>
  )
}
