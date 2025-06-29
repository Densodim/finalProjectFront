import { z } from "zod"

export const questionTypeLiterals = [
  "text",
  "comment",
  "radiogroup",
  "checkbox",
  "email",
  "number",
  "file",
] as const

export const zodQuestions = z.object({
  id: z.number({ message: "ID of the question" }),
  title: z
    .string({
      message: "Title of the question",
      required_error: "should be at least 6 signs long",
      invalid_type_error: "Invalid type",
    })
    .min(6, "should be at least 6 signs long"),
  desctiption: z
    .string({
      message: "Description of the form",
      required_error: "should be at least 6 signs",
      invalid_type_error: "Invalid type",
    })
    .min(6, "should be at least 6 signs long"),
  type: z.enum(questionTypeLiterals, { required_error: "Type required" }),
  isRequired: z.boolean(),
  order: z.number({
    message: "Order order",
    required_error: "order can be number",
    invalid_type_error: "invalid type number",
  }),
  formId: z.number(),
  options: z.array(z.string(), { required_error: "Not an array!" }),
  validation: z.object({}).nullable(),
})

export const zodCreateQuestion = zodQuestions.pick({
  title: true,
  desctiption: true,
  type: true,
  order: true,
  isRequired: true,
})

export type QuestionsTypeAPI = z.infer<typeof zodQuestions>
export type CreateQuestionType = z.infer<typeof zodCreateQuestion> & {
  token: string
  formId: number
}
