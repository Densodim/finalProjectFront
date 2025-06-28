import type { ICreatorOptions } from "survey-creator-core"
import { useEffect, useState } from "react"
import { SurveyCreator, SurveyCreatorComponent } from "survey-creator-react"
import { Button, LinearProgress, Stack } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts"
import {
  getOneFormThunk,
  selectOneForm,
  selectStatusForm,
  updateFormThunk,
} from "../forms/formsSlice.ts"
import { selectToken } from "../login/authSlice.ts"
import { useNavigate, useParams } from "react-router"
import useSurveyJson from "./hooks/useSurveyJson.ts"
import { createQuestionThunk } from "../questions/questionsSlice.ts"

const defaultCreatorOptions: ICreatorOptions = {
  autoSaveEnabled: true,
}

export function SurveyCreatorWidget() {
  let [creator, setCreator] = useState<SurveyCreator>()

  const token = useAppSelector(selectToken)
  const param = useParams()
  const dispatch = useAppDispatch()
  const form = useAppSelector(selectOneForm)
  const navigate = useNavigate()
  const status = useAppSelector(selectStatusForm)

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
    if (form) {
      dispatch(
        updateFormThunk({
          id: form.id,
          token,
          description: parseCreator.desctiption && '',
          title: parseCreator.title,
          categoryId: Number(form?.categoryId),
        }),
      )
      parseCreator.pages.forEach(page =>
        page.elements.forEach((el, index) => {
          dispatch(
            createQuestionThunk({
              token,
              title: el.name,
              desctiption: el.name,
              formId: form.id,
              order: index,
              type: el.type
            }),
          )
        }),
      )
    }
  }

  creator.text = JSON.stringify(surveyJson)

  const handleBack = () => {
    navigate(-1)
  }

  if (status === "loading") {
    return (
      <div style={{ width: "100%" }}>
        <LinearProgress />
      </div>
    )
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
  desctiption: string
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
  type:
    | "text"
    | "comment"
    | "radiogroup"
    | "checkbox"
    | "email"
    | "number"
    | "file"
}
