import { z } from "zod"

export const zodCategory = z.object({
  id: z.number({ required_error: "ID is required" }),
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Invalid type",
  }),
  description: z.string({
    required_error: "Description is required",
    invalid_type_error: "Invalid type",
  }),
  createdAt: z.string({
    required_error: "Creation date is required",
  }),
  updatedAt: z.string({
    required_error: "Update date is required",
  }),
  _count: z.object({
    forms: z.string({
      message: "how many times this category is used in forms",
    }),
  }),
})

export type CategoryTypeAPI = z.infer<typeof zodCategory>
