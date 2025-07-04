import {
  Box,
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
import {
  createFormThunk,
  getAllFormsThunk,
  getUserFormThunk,
  selectMessageForms,
} from "../formsSlice.ts"
import { selectToken } from "../../login/authSlice.ts"
import ButtonSubmit from "../../../utils/ButtonSubmit.tsx"
import { enqueueSnackbar } from "notistack"
import { useState } from "react"
import { FilePond } from "react-filepond"
import type { FilePondFile } from "filepond"

// const MAX_SIZE = 500000 // 500KB
// const validateImage = (values: { file?: File | null }) => {
//   const errors: { file?: string } = {}
//
//   if (values.file && values.file.size > MAX_SIZE) {
//     errors.file = "Max file size exceeded."
//   }
//
//   return errors
// }

export default function CreateFormPage({
  open,
  setOpen,
  users = false,
}: Props) {
  const [files, setFiles] = useState<FilePondFile[]>([])

  const dispatch = useAppDispatch()
  const categories = useAppSelector(selectCategories)
  const token = useAppSelector(selectToken)
  const message = useAppSelector(selectMessageForms)

  const formik = useFormik({
    validationSchema: toFormikValidationSchema(zodCreateForm),
    initialValues: {
      title: "",
      description: "",
      categoryId: "",
      file: undefined,
    },
    // validate: validateImage,
    onSubmit: async values => {
      const file = files.length > 0 ? (files[0].file as File) : undefined
      await dispatch(
        createFormThunk({
          categoryId: Number(values.categoryId),
          description: values.description,
          title: values.title,
          token,
          file,
        }),
      )
      setOpen(false)
      if (!users) {
        await dispatch(getAllFormsThunk(token))
      } else {
        await dispatch(getUserFormThunk(token))
      }
      enqueueSnackbar(message, { variant: "success" })
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
              {/*<InputFileUpload*/}
              {/*  errors={formik.errors}*/}
              {/*  data={formik.values}*/}
              {/*  setFieldValue={formik.setFieldValue}*/}
              {/*/>*/}
              <div><p>Icon Image</p></div>
              <FilePond
                // files={files}
                allowReorder={true}
                allowMultiple={false}
                onupdatefiles={setFiles}
                labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                acceptedFileTypes={["image/*"]}
              />
            </FormControl>

            <ButtonSubmit>Add Form</ButtonSubmit>
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
  users?: boolean
}
