import { Model, Survey } from "survey-react-ui"
import { useCallback, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts"
import { selectToken } from "../login/authSlice.ts"
import { useNavigate, useParams } from "react-router"
import ButtonLink from "../../utils/ButtonLink.tsx"
import { getOneFormThunk, selectOneForm } from "../forms/formsSlice.ts"

const surveyJson = {
  description: "DesriptionTest",
  title: "TitleTedst",
  pages: [
    {
      description: "PageTest",
      name: "page1",
      title: "PageTest",
      elements: [
        {
          name: "question1",
          title: "Q1111",
          type: "text",
        },
      ],
    },
  ],
}

export default function SurveyComponent() {
  const token = useAppSelector(selectToken)
  const navigate = useNavigate()
  const param = useParams()
  const dispatch = useAppDispatch()
  const form = useAppSelector(selectOneForm)
  console.log(form)

  useEffect(() => {
    if (param.id) {
      dispatch(getOneFormThunk({ id: Number(param.id), token }))
    }
  }, [param])

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
