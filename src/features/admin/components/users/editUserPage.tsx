import { useNavigate, useParams } from "react-router"
import { useFormik } from "formik"
import { zodAdminUpdateUser } from "../../lib/zodUsers.ts"
import { toFormikValidationSchema } from "zod-formik-adapter"
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  LinearProgress,
  MenuItem,
  RadioGroup,
  Select,
  Stack,
} from "@mui/material"
import WrapperTextField from "../../../login/components/WrapperTextField.tsx"
import type { UserRole } from "../../../../api/authAPI.ts"
import Radio from "@mui/material/Radio"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../../../app/hooks.ts"
import {
  fetchUserByIdThunk,
  selectMessageAdmin,
  selectStatusAdmin,
  selectUser,
  updateUserThunk,
} from "../../adminSlice.ts"
import { selectToken } from "../../../login/authSlice.ts"

export default function EditUserPage() {
  const param = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const token = useAppSelector(selectToken)
  const selectedUser = useAppSelector(selectUser)
  const status = useAppSelector(selectStatusAdmin)
  const message = useAppSelector(selectMessageAdmin)

  useEffect(() => {
    if (param.id) {
      dispatch(fetchUserByIdThunk({ id: Number(param.id), token }))
    }
  }, [])

  const formik = useFormik({
    validationSchema: toFormikValidationSchema(zodAdminUpdateUser),
    initialValues: {
      email: selectedUser?.email || "",
      name: selectedUser?.name || "",
      role: selectedUser?.role || "USER",
      isActive: selectedUser?.isActive || true,
    },
    onSubmit: async values => {
      if (selectedUser) {
        dispatch(
          updateUserThunk({
            id: selectedUser.id,
            token,
            role: values.role,
            name: values.name,
            email: values.email,
            isActive: values.isActive,
          }),
        )
        navigate('/admin/allUsers')
      }
      // console.log(values)
    },
  })

  useEffect(() => {
    if (selectedUser) {
      formik.setValues({
        name: selectedUser?.name || "",
        email: selectedUser?.email || "",
        role: selectedUser?.role || "USER",
        isActive: selectedUser?.isActive || true,
      })
    }
  }, [selectedUser])

  if (status === "loading") {
    return (
      <div style={{ width: "100%" }}>
        <LinearProgress />
      </div>
    )
  }

  return (
    <>
      <h2>Update</h2>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{ width: "25ch" }}
        autoComplete="off"
      >
        <WrapperTextField
          label={"User Name"}
          fieldProps={formik.getFieldProps("name")}
          error={formik.errors.name}
        />
        <WrapperTextField
          label={"Email"}
          fieldProps={formik.getFieldProps("email")}
          error={formik.errors.email}
        />
        <FormControl>
          <FormLabel>IsActive</FormLabel>
          <RadioGroup
            row
            name="isActive"
            value={formik.values.isActive ? "true" : ""}
            onChange={e=> formik.setFieldValue("isActive", e.target.value === 'true')}
          >
            <FormControlLabel control={<Radio />} label="Active" value="true" />
            <FormControlLabel control={<Radio />} label="Block" value="" />
          </RadioGroup>
        </FormControl>
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
        <Stack spacing={2} direction={"row"} margin={2}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            {"Submit"}
          </Button>
          <Button type="submit" variant="outlined" color="primary">
            {"Cancel"}
          </Button>
        </Stack>
        {message && <div>{message}</div>}
      </Box>
    </>
  )
}
