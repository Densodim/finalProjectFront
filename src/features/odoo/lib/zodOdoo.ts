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

const zodImportForms = z.object({
  id: z.number(),
  title: z.string(),
  questionsCount: z.number(),
  odooId: z.number(),
})
export const zodOdooImportFromOdooAPI = z.object({
  importedCount: z.number(),
  forms: z.array(zodImportForms).optional(),
})
export type zodOdooImportFromOdooTypeAPI = z.infer<
  typeof zodOdooImportFromOdooAPI
>

export const zodExportToOdooAPI = z.object({
  odooSurveyId: z.number(),
  message: z.string(),
  formTitle: z.string(),
  questionsCount: z.number(),
  surveyLink: z.string(),
})
export type zodExportToOdooTypeAPI = z.infer<typeof zodExportToOdooAPI>

const zodResultDropbox = z.object({
  name: z.string(),
  path_lower: z.string(),
  path_display: z.string(),
  id: z.string(),
  client_modified: z.string(),
  server_modified: z.string(),
  rev: z.string(),
  size: z.number(),
  is_downloadable: z.boolean(),
  content_hash: z.string(),
})

const zodUserInput = z.object({
  id: z.string(),
  survey_id: z.array(z.number(), z.string()),
  state: z.string(),
  create_date: z.string(),
  partner_id: z.array(z.number(), z.string()),
})

const zodAnswers = z.object({
  id: z.number(),
  display_name:z.string(),
  skipped:z.boolean(),
  answer_type: z.string(),
  suggested_answer_id: z.array(z.number(), z.string()),
  create_date: z.string(),
  write_date: z.string(),
})
const zodResponse = z.object({
  userInput:zodUserInput,
  answers: z.array(zodAnswers)
})
export const zodResponseAPI = z.object({
  responses:z.array(zodResponse),
  dropbox:z.object({
    status:z.number(),
    headers:z.object({}),
    result: zodResultDropbox
  })
})

export type zodResponseTypeAPI = z.infer<typeof zodResponseAPI>