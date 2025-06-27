import type { FormTypeAPI } from "../../forms/lib/zodForms.ts"

export default function useSurveyJson({ form }: Props) {
  const surveyJson = {
    description: form?.description,
    title: form?.title,
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
  return surveyJson
}

//types
type Props = {
  form?: FormTypeAPI | null
}
