import type { ICreatorOptions } from "survey-creator-core"
import { useEffect, useState } from "react"
import { SurveyCreator, SurveyCreatorComponent } from "survey-creator-react"
import { Button, Stack } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts"
import {
  createFormThunk,
  getOneFormThunk,
  selectOneForm,
} from "../forms/formsSlice.ts"
import { selectToken } from "../login/authSlice.ts"
import { useNavigate, useParams } from "react-router"
import useSurveyJson from "./hooks/useSurveyJson.ts"

const defaultCreatorOptions: ICreatorOptions = {
  autoSaveEnabled: true,
  collapseOnDrag: true,
}

export function SurveyCreatorWidget() {
  let [creator, setCreator] = useState<SurveyCreator>()

  const token = useAppSelector(selectToken)
  const param = useParams()
  const dispatch = useAppDispatch()
  const form = useAppSelector(selectOneForm)
  const navigate = useNavigate()

  useEffect(() => {
    if (param.id) {
      dispatch(getOneFormThunk({ id: Number(param.id), token }))
    }
  }, [param])

  const surveyJson = useSurveyJson({ form })

  if (!creator) {
    creator = new SurveyCreator(defaultCreatorOptions)
    setCreator(creator)
  }

  creator.saveSurveyFunc = (
    saveNo: number,
    callback: (num: number, status: boolean) => void,
  ) => {
    const parseCreator: ParseCreatorType = JSON.parse(creator?.text)
    callback(saveNo, true)
    dispatch(
      createFormThunk({
        token,
        description: parseCreator.description,
        title: parseCreator.title,
        categoryId: Number(form?.categoryId),
      }),
    )
  }

  creator.text = JSON.stringify(surveyJson)

  const handleBack = () => {
    navigate(-1)
  }
  return (
    <>
      <Stack spacing={2}>
        <Button
          variant="outlined"
          sx={{ alignSelf: "flex-start" }}
          onClick={handleBack}
        >
          Back
        </Button>
      </Stack>
      <div style={{ height: "100vh", width: "100%" }}>
        <SurveyCreatorComponent creator={creator} />
      </div>
    </>
  )
}

//types
type ParseCreatorType = {
  description: string
  title: string
  pages: CreatorPageType[]
}
type CreatorPageType = {
  description: string
  name: string
  title: string
  elements: CreatorElementType[]
}
type CreatorElementType = {
  name: string
  title: string
  type: string
}
