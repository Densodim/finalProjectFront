import type { FormTypeAPI } from "../../forms/lib/zodForms.ts"
import type { QuestionsTypeAPI } from "../../questions/lib/zodQuestions.ts"

export default function useSurveyJson({ form, questions }: Props) {
  const surveyJson = {
    description: form?.description,
    title: form?.title,
    logo:form?.fileUrl,
    pages: [
      {
        // description: "PageTest",
        // name: "page1",
        // title: "PageTest",
        elements: questions?.map(element => ({
          name: element.desctiption,
          title: element.title,
          type: element.type
        })),
      },
    ],
  }
  return surveyJson
}

//types
type Props = {
  form?: FormTypeAPI | null
  questions?: QuestionsTypeAPI[] | null
}
