import WrapperBox from "./lib/WrapperBox.tsx"
import { Box } from "@mui/material"
import HeaderForm from "./lib/HeaderForm.tsx"
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts"
import { registerAsync, selectLanguage } from "./authSlice.ts"
import { translations } from "./lib/translations.ts"
import { useFormik } from "formik"
import { formikValidation } from "./lib/formikValidation.ts"
import WrapperTextField from "./lib/WrapperTextField.tsx"

export default function RegisterPage() {
  const currentLanguage = useAppSelector(selectLanguage)
  const t = translations[currentLanguage]

  const dispatch = useAppDispatch()

  const formikRegister = useFormik({
    validate: values => {
      formikValidation(values)
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
          fieldProps={formikRegister.getFieldProps("username")}
          placeholder={t.username}
        />
      </Box>
    </WrapperBox>
  )
}
