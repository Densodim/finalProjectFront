import { useFormik } from "formik"
import { zodCreateCategory } from "../../login/lib/zodLogin.ts"
import { toFormikValidationSchema } from "zod-formik-adapter"
import { Box, Button, Modal } from "@mui/material"
import WrapperTextField from "../../login/components/WrapperTextField.tsx"
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts"
import { selectToken } from "../../login/authSlice.ts"
import {
  createCategoryThunk,
  getAllCategoriesThunk,
} from "../categoriesSlice.ts"
import { style } from "../../../utils/styleModal.ts"

export default function CreateCategories({ open, setOpen }: Props) {
  const dispatch = useAppDispatch()
  const token = useAppSelector(selectToken)

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: toFormikValidationSchema(zodCreateCategory),
    onSubmit: async values => {
      await dispatch(
        createCategoryThunk({
          token,
          name: values.name,
          description: values.description,
        }),
      )
      setOpen(false)
      await dispatch(getAllCategoriesThunk(token))
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
            <h3>Create Category</h3>
            <WrapperTextField
              label={"name"}
              fieldProps={formik.getFieldProps("name")}
              placeholder={"Category"}
              error={formik.errors.name}
            />
            <WrapperTextField
              label={"description"}
              fieldProps={formik.getFieldProps("description")}
              placeholder={"Category"}
              error={formik.errors.description}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Add Category
            </Button>
          </Box>
        </Modal>
      </div>
    </>
  )
}

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
}
