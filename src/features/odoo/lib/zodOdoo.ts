import { z } from "zod"

const QuestionSchema = z.object({
  text: z.string(),
  type: z.string(),
  count: z.number(),
  topAnswers: z.array(z.any()),
})

export const zodOdoo = z.object({
  id: z.number({ required_error: "ID is required" }),
  title: z.string({
    required_error: "Title is required",
    invalid_type_error: "Title must be a string",
  }),
  description: z.string().optional(),
  questions: z.array(QuestionSchema),
})

export type zodOdooAPI = z.infer<typeof zodOdoo>

export const zodOdooFormAPI = zodOdoo.pick({
  id: true,
  title: true,
  description: true,
})
export type zodOdooFormTypeAPI = z.infer<typeof zodOdooFormAPI>

export const zodOdooQuestionType = zodOdoo.pick({
  questions: true,
})
export type zodOdooQuestionTypeAPI = z.infer<typeof zodOdooQuestionType>

export const zodOdooExternalResultAPI = zodOdoo.pick({
  id: true,
  title: true,
  questions: true,
})
export type zodOdooExternalResultTypeAPI = z.infer<
  typeof zodOdooExternalResultAPI
>

export const zodOdooSurveyID = z.object({
  surveyId: z.number(),
  survey: z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    user_id: z.array(z.number(), z.string()),
    create_date: z.string(),
  }),
})
export type zodOdooSurveyIDTypeAPI = z.infer<typeof zodOdooSurveyID>

export const zodLinkOdooAPI = z.object({
  surveyId: z.number(),
  surveyTitle: z.string(),
  surveyLink: z.string(),
  accessToken: z.string(),
})
export type zodLinkOdooTypeAPI = z.infer<typeof zodLinkOdooAPI>
