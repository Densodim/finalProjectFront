import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
} from "@mui/material"
import { useFormik } from "formik"
import { zodCreateForm } from "../lib/zodForms.ts"
import { toFormikValidationSchema } from "zod-formik-adapter"
import WrapperTextField from "../../login/components/WrapperTextField.tsx"
import { style } from "../../../utils/styleModal.ts"
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts"
import { selectCategories } from "../../categories/categoriesSlice.ts"
import { createFormThunk, getAllFormsThunk } from "../formsSlice.ts"
import { selectToken } from "../../login/authSlice.ts"

export default function CreateFormPage({ open, setOpen }: Props) {
  const dispatch = useAppDispatch()
  const categories = useAppSelector(selectCategories)
  const token = useAppSelector(selectToken)

  const formik = useFormik({
    validationSchema: toFormikValidationSchema(zodCreateForm),
    initialValues: {
      title: "",
      description: "",
      categoryId: "",
    },
    onSubmit: async values => {
      await dispatch(
        createFormThunk({
          token,
          title: values.title,
          description: values.description,
          categoryId: Number(values.categoryId),
        }),
      )
      setOpen(false)
      await dispatch(getAllFormsThunk(token))
    },
  })

  const handleClose = () => setOpen(false)

  return (
    <>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} onSubmit={formik.handleSubmit} component="form">
            <h3>Create FormPage</h3>
            <WrapperTextField
              fullWidth
              label={"title"}
              fieldProps={formik.getFieldProps("title")}
              placeholder={"Username"}
              error={formik.errors.title}
            />
            <WrapperTextField
              fullWidth
              label={"Description"}
              fieldProps={formik.getFieldProps("description")}
              placeholder={"Description"}
              error={formik.errors.description}
            />
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                labelId="category-label"
                name="categoryId"
                value={formik.values.categoryId}
                onChange={formik.handleChange}
                label="Select Category"
              >
                {categories.map(category => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Add Form
            </Button>
          </Box>
        </Modal>
      </div>
    </>
  )
}
//types
type Props = {
  open: boolean
  setOpen: (open: boolean) => void
}
