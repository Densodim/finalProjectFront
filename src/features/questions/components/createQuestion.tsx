import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Modal,
  RadioGroup,
  Select,
} from "@mui/material"
import { style } from "../../../utils/styleModal.ts"
import { useFormik } from "formik"
import { toFormikValidationSchema } from "zod-formik-adapter"
import type { QuestionsTypeAPI } from "../lib/zodQuestions.ts"
import { questionTypeLiterals, zodCreateQuestion } from "../lib/zodQuestions.ts"
import WrapperTextField from "../../login/components/WrapperTextField.tsx"
import ButtonSubmit from "../../../utils/ButtonSubmit.tsx"
import Radio from "@mui/material/Radio"
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts"
import { createQuestionThunk, getQuestionsThunk } from "../questionsSlice.ts"
import { selectToken } from "../../login/authSlice.ts"

export default function CreateQuestion({ open, setOpen, formId }: Props) {
  const handleClose = () => setOpen(false)
  const dispatch = useAppDispatch()
  const token = useAppSelector(selectToken)

  const formik = useFormik<formikProps>({
    validationSchema: toFormikValidationSchema(zodCreateQuestion),
    initialValues: {
      title: "",
      desctiption: "",
      type: "text",
      isRequired: false,
      order: 0,
    },
    onSubmit: async values => {
      if (formId) {
        dispatch(
          createQuestionThunk({
            token,
            title: values.title,
            type: values.type,
            isRequired: values.isRequired,
            desctiption: values.desctiption,
            order: values.order,
            formId,
          }),
        )
        await dispatch(getQuestionsThunk({ token, id: formId }))
        setOpen(false)
      }
    },
  })
  return (
    <>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={style}
            onSubmit={formik.handleSubmit}
            component="form"
            autoComplete="on"
          >
            <h3>Question</h3>
            <WrapperTextField
              fullWidth
              label={"title"}
              fieldProps={formik.getFieldProps("title")}
              placeholder={"Title Question"}
              error={formik.errors.title}
            />
            <WrapperTextField
              fullWidth
              label={"Description"}
              fieldProps={formik.getFieldProps("desctiption")}
              placeholder={"Description"}
              error={formik.errors.desctiption}
            />
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                labelId="type-label"
                name="type"
                value={formik.values.type}
                onChange={formik.handleChange}
                label="Select Category"
              >
                {questionTypeLiterals.map(type => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <FormLabel>Active</FormLabel>
              <RadioGroup
                row
                name="isActive"
                value={formik.values.isRequired ? "true" : ""}
                onChange={e =>
                  formik.setFieldValue("isRequired", e.target.value === "true")
                }
              >
                <FormControlLabel
                  control={<Radio />}
                  label="Yes"
                  value="true"
                />
                <FormControlLabel control={<Radio />} label="No" value="" />
              </RadioGroup>
            </FormControl>
            <WrapperTextField
              fieldProps={formik.getFieldProps("order")}
              type="number"
              fullWidth
              error={formik.errors.order}
            />
            <ButtonSubmit>Add</ButtonSubmit>
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
  formId: number
}

type formikProps = {
  title: string
  desctiption: string
  type: QuestionsTypeAPI["type"]
  isRequired: boolean
  order: number
}
