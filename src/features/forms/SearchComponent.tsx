import { useState } from "react"
import TextField from "@mui/material/TextField"
import { Autocomplete, Stack } from "@mui/material"
import CircularProgress from "@mui/material/CircularProgress"
import { ThemeSwitcher } from "@toolpad/core"
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts"
import {
  getPublishedFormThunk,
  searchThunks,
  selectAllForms,
} from "./formsSlice.ts"
import { selectToken } from "../login/authSlice.ts"
import type { FormTypeAPI } from "./lib/zodForms.ts"

export default function SearchComponent() {
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState<readonly FormTypeAPI[]>([])
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState<FormTypeAPI | null>(null)
  const forms = useAppSelector(selectAllForms)
  // const questions = useAppSelector(selectQuestions)
  const dispatch = useAppDispatch()
  const token = useAppSelector(selectToken)

  console.log(forms)

  const handleOpen = () => {
    setOpen(true)
    ;(async () => {
      setLoading(true)
      await dispatch(getPublishedFormThunk(token))
      setLoading(false)

      if (forms) {
        setOptions([...forms])
      }
    })()
  }

  const handleClose = () => {
    setOpen(false)
    setOptions([])
  }

  const handleChange = (newValue: FormTypeAPI | null) => {
    setValue(newValue)
    if (newValue) {
      dispatch(searchThunks({ token, query: newValue.title }))
    }
  }

  return (
    <Stack direction="row" spacing={2} sx={{ width: 300 }}>
      <Autocomplete
        sx={{ width: 300 }}
        clearOnEscape
        open={open}
        value={value}
        onChange={(_event: any, newValue: FormTypeAPI | null) =>
          handleChange(newValue)
        }
        onOpen={handleOpen}
        onClose={handleClose}
        isOptionEqualToValue={(option, value) => option.title === value.title}
        getOptionLabel={option => `${option.title} — ${option.description}`}
        options={options}
        loading={loading}
        renderInput={params => (
          <TextField
            {...params}
            label="Search with autocomplete"
            slotProps={{
              input: {
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              },
            }}
          />
        )}
      />
      <ThemeSwitcher />
    </Stack>
  )
}
