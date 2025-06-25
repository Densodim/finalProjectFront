import { z } from "zod"

const zodForms = z.object({
  id: z.number({ message: "ID of the form" }),
  title: z.string({
    message: "Title of the form",
    required_error: "should be at least 6 signs long",
    invalid_type_error: "Invalid type",
  }),
  description: z.string({
    message: "Description of the form",
    required_error: "should be at least 6 signs",
    invalid_type_error: "Invalid type",
  }),
  isPublished: z.boolean({
    required_error: "isPublished can be true or false",
    invalid_type_error: "invalid_type_error",
  }),
  isDeleted: z.boolean({
    required_error: "isPublished can be true or false",
    invalid_type_error: "invalid_type_error",
  }),
  createdAt: z.string(),
  updatedAt: z.string(),
  authorId: z.number({
    message: "ID author who created the form ",
    required_error: "can be number",
    invalid_type_error: "Invalid type",
  }),
  categoryId: z.number({
    message: "ID category",
    required_error: "can be number",
    invalid_type_error: "Invalid type",
  }),
})

export type FormTypeAPI = z.infer<typeof zodForms>
export const zodCreateForm = zodForms.pick({
  title: true,
  description: true,
  categoryId: true,
})
