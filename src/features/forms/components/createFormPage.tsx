import { Box } from "@mui/material"
import { useFormik } from "formik"
import { zodCreateForm } from "../lib/zodForms.ts"
import { toFormikValidationSchema } from "zod-formik-adapter"
import WrapperTextField from "../../login/components/WrapperTextField.tsx"
import ButtonLink from "../../../utils/ButtonLink.tsx"

export default function CreateFormPage() {
  const formik = useFormik({
    validationSchema: toFormikValidationSchema(zodCreateForm),
    initialValues: {
      title: "",
      description: "",
      categoryId: "",
    },
    onSubmit: async values => {
      console.log(values)
    },
  })

  const handleReturn = () => {
    console.log("return")
  }
  return (
    <>
      <h3>Create FormPage</h3>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{ width: "25ch" }}
        autoComplete="off"
      >
        <WrapperTextField
          label={"title"}
          fieldProps={formik.getFieldProps("title")}
          placeholder={"Username"}
          error={formik.errors.title}
        />
        <WrapperTextField
          label={"Description"}
          fieldProps={formik.getFieldProps("description")}
          placeholder={"Description"}
          error={formik.errors.description}
        />
        <ButtonLink handleReturn={handleReturn} />
      </Box>
    </>
  )
}
