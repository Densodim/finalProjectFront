import { useNavigate, useParams } from "react-router"
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts"
import {
  getAllCategoriesThunk,
  selectCategories,
  selectStatusCategories,
} from "../../categories/categoriesSlice.ts"
import { selectToken } from "../../login/authSlice.ts"
import { useFormik } from "formik"
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  LinearProgress,
  MenuItem,
  RadioGroup,
  Select,
} from "@mui/material"
import WrapperTextField from "../../login/components/WrapperTextField.tsx"
import Radio from "@mui/material/Radio"
import ButtonLink from "../../../utils/ButtonLink.tsx"
import { useEffect } from "react"
import { zodUpdateForm } from "../lib/zodForms.ts"
import { toFormikValidationSchema } from "zod-formik-adapter"
import {
  getOneFormThunk,
  selectOneForm,
  selectStatusForm,
  updateFormThunk,
} from "../formsSlice.ts"

export default function UpdateFormPage() {
  const params = useParams()
  const navigate = useNavigate()

  const dispatch = useAppDispatch()
  const categories = useAppSelector(selectCategories)
  const form = useAppSelector(selectOneForm)
  const statusCategories = useAppSelector(selectStatusCategories)
  const statusForm = useAppSelector(selectStatusForm)
  const token = useAppSelector(selectToken)

  useEffect(() => {
    dispatch(getAllCategoriesThunk(token))
    dispatch(getOneFormThunk({ token, id: Number(params.id) }))
  }, [])

  useEffect(() => {
    if (form) {
      formik.setValues({
        title: form.title,
        description: form.description,
        isPublished: form.isPublished,
        isDeleted: form.isDeleted,
        categoryId: form.categoryId.toString(),
      })
    }
  }, [form])

  const formik = useFormik({
    validationSchema: toFormikValidationSchema(zodUpdateForm),
    initialValues: {
      title: "",
      description: "",
      isPublished: false,
      categoryId: "",
      isDeleted: false,
    },
    onSubmit: async values => {
      if (form) {
        dispatch(
          updateFormThunk({
            token,
            id: form.id,
            title: values.title,
            description: values.description,
            isDeleted: values.isDeleted,
            isPublished: values.isPublished,
            categoryId: Number(values.categoryId),
          }),
        )
        navigate(-1)
      }
    },
  })

  const handleReturn = () => {
    navigate(-1)
  }
  if (statusCategories === "loading" && statusForm === "loading") {
    return (
      <div style={{ width: "100%" }}>
        <LinearProgress />
      </div>
    )
  }

  return (
    <>
      <h3>Update Form {params.id}</h3>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{ width: "25ch" }}
        autoComplete="off"
      >
        <WrapperTextField
          label={"Title"}
          fieldProps={formik.getFieldProps("title")}
          error={formik.errors.title}
        />
        <WrapperTextField
          label={"Description"}
          fieldProps={formik.getFieldProps("description")}
          error={formik.errors.description}
        />
        <FormControl>
          <FormLabel>Published</FormLabel>
          <RadioGroup
            row
            name="isPublished"
            value={formik.values.isPublished ? "true" : ""}
            onChange={e =>
              formik.setFieldValue("isPublished", e.target.value === "true")
            }
          >
            <FormControlLabel control={<Radio />} label="Yes" value="true" />
            <FormControlLabel control={<Radio />} label="No" value="" />
          </RadioGroup>
        </FormControl>
        <FormControl>
          <FormLabel>Deleted</FormLabel>
          <RadioGroup
            row
            name="isDeleted"
            value={formik.values.isDeleted ? "true" : ""}
            onChange={e =>
              formik.setFieldValue("isDeleted", e.target.value === "true")
            }
          >
            <FormControlLabel control={<Radio />} label="Yes" value="true" />
            <FormControlLabel control={<Radio />} label="No" value="" />
          </RadioGroup>
        </FormControl>
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
        <ButtonLink handleReturn={handleReturn} />
      </Box>
    </>
  )
}

//types
