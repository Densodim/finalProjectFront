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
    isRequired
  }: CreateQuestionType) {
    const promise = instance.post(
      `questions/forms/${formId}/questions`,
      {
        title,
        desctiption,
        type,
        order,
        isRequired
      },
      { headers: { Authorization: `Bearer ${token}` } },
    )
    return promise
  },
  getQuestions(token: string, formId: number) {
    const promise = instance.get(`questions/forms/${formId}/questions`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return promise
  },
  deleteQuestion(token: string, formId: number) {
    const promise = instance.delete(`questions/${formId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return promise
  },
}
