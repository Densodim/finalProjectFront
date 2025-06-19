import { Box, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material"
import { Person } from "@mui/icons-material"
import type { Language } from "./translations.ts"
import { translations } from "./translations.ts"
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts"
import { choosingLanguage, selectLanguage } from "../loginSlice.ts"

export default function HeaderForm() {
  const currentLanguage = useAppSelector(selectLanguage)
  const t = translations[currentLanguage]
  const dispatch = useAppDispatch()

  const handleChoosingLanguage = (value: Language) => {
    dispatch(choosingLanguage(value))
  }

  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
        <Person sx={{ fontSize: 48, color: "#1976d2" }} />
        <Typography variant="h5" fontWeight={600} mt={1} mb={2}>
          {t.login}
        </Typography>
        <ToggleButtonGroup
          value={currentLanguage}
          exclusive
          onChange={(_, value) => {
            if (value) handleChoosingLanguage(value as Language)
          }}
          size="small"
          sx={{ mb: 1 }}
        >
          <ToggleButton value="ru">RU</ToggleButton>
          <ToggleButton value="en">EN</ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </>
  )
}
