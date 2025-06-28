import type { CreateQuestionType } from "../features/questions/lib/zodQuestions.ts"
import { instance } from "./instance.ts"

export const questionsAPI = {
  createQuestions({
    formId,
    token,
    title,
    desctiption,
    type,
    order,
  }: CreateQuestionType) {
    const promise = instance.post(
      `questions/forms/${formId}/questions`,
      {
        title,
        desctiption,
        type,
        order,
      },
      { headers: { Authorization: `Bearer ${token}` } },
    )
    return promise
  },
}
