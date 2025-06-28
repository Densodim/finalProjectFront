import { Model, Survey } from "survey-react-ui"
import { useCallback, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts"
import { selectToken } from "../login/authSlice.ts"
import { useNavigate, useParams } from "react-router"
import ButtonLink from "../../utils/ButtonLink.tsx"
import { getOneFormThunk, selectOneForm } from "../forms/formsSlice.ts"
import useSurveyJson from "./hooks/useSurveyJson.ts"
import {
  getQuestionsThunk,
  selectQuestions,
} from "../questions/questionsSlice.ts"

export default function SurveyComponent() {
  const token = useAppSelector(selectToken)
  const navigate = useNavigate()
  const param = useParams()
  const dispatch = useAppDispatch()
  const form = useAppSelector(selectOneForm)
  const questions = useAppSelector(selectQuestions)


  useEffect(() => {
    if (param.id) {
      dispatch(getOneFormThunk({ id: Number(param.id), token }))
    }
  }, [param, token])

  useEffect(() => {
    if (form) {
      dispatch(getQuestionsThunk({ token, id: form.id }))
    }
  }, [form, token])

  const surveyJson = useSurveyJson({ form, questions })

  const survey = new Model(surveyJson)

  const alertResults = useCallback((survey: Model) => {
    const results = JSON.stringify(survey.data)
    alert(results)
  }, [])

  survey.onComplete.add(alertResults)

  const handleReturn = () => {
    navigate(-1)
  }

  return (
    <>
      <ButtonLink handleReturn={handleReturn} />
      <div style={{ height: "100vh", width: "100%" }}>
        <Survey model={survey} />
      </div>
    </>
  )
}
