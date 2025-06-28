import WrapperTextField from "../../../login/components/WrapperTextField.tsx"
import { useFormik } from "formik"
import { registerAsync } from "../../../login/authSlice.ts"
import { useAppDispatch } from "../../../../app/hooks.ts"
import { Box, FormControl, FormLabel, MenuItem, Select } from "@mui/material"
import { useNavigate } from "react-router"
import type { UserRole } from "../../../../api/authAPI.ts"
import { toFormikValidationSchema } from "zod-formik-adapter"
import { zodAdminCreateUser } from "../../lib/zodUsers.ts"
import ButtonLink from "../../../../utils/ButtonLink.tsx"

export default function CreateUserPage() {
  const dispatch = useAppDispatch()
  const navitate = useNavigate()

  const formik = useFormik<formikProps>({
    validationSchema: toFormikValidationSchema(zodAdminCreateUser),
    initialValues: {
      email: "",
      password: "",
      name: "",
      role: "USER",
    },
    onSubmit: async values => {
      await dispatch(registerAsync(values))
      navitate("/admin/allUsers")
    },
  })

  const handleReturn = () => {
    navitate("/admin/allUsers")
  }
  return (
    <>
      <h2>Create User</h2>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{ width: "25ch" }}
        autoComplete="off"
      >
        <WrapperTextField
          label={"username"}
          fieldProps={formik.getFieldProps("name")}
          placeholder={"Username"}
          error={formik.errors.name}
        />
        <WrapperTextField
          label={"email"}
          fieldProps={formik.getFieldProps("email")}
          placeholder={"Email"}
          error={formik.errors.email}
        />
        <WrapperTextField
          label={"password"}
          fieldProps={formik.getFieldProps("password")}
          placeholder={"Password"}
          isPassword
          error={formik.errors.password}
        />
        <FormControl fullWidth>
          <FormLabel>Role</FormLabel>
          <Select
            label="Role"
            value={formik.values.role}
            onChange={e =>
              formik.setFieldValue("role", e.target.value as UserRole)
            }
          >
            <MenuItem value="USER">User</MenuItem>
            <MenuItem value="ADMIN">Admin</MenuItem>
            <MenuItem value="SUPER_ADMIN">Super Admin</MenuItem>
          </Select>
        </FormControl>
        <ButtonLink handleReturn={handleReturn} />
      </Box>
    </>
  )
}

//types
type formikProps = {
  email: string
  password: string
  name: string
  role: UserRole
}
