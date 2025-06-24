import { z } from "zod"

export const zodUsers = z.object({
  id: z.number({ required_error: "ID is required" }),
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email({ message: "Invalid email address" }),
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Email must be a string",
    })
    .min(6, {
      message: "The name must be at least 6 characters long",
    }),
  password: z.string({ required_error: "Password is required" }).min(6, {
    message: "The password must be at least 6 characters long",
  }),
  role: z.union(
    [z.literal("USER"), z.literal("ADMIN"), z.literal("USER_ADMIN")],
    {
      invalid_type_error: "Role must be one of: USER, ADMIN, USER_ADMIN",
    },
  ),
  isActive: z.boolean({
    required_error: "Active status is required",
    invalid_type_error: "isActive must be true or false",
  }),
  lastLoginAt: z
    .string({
      invalid_type_error: "Last login must be a string or null",
    })
    .nullable(),
  createdAt: z.string({
    required_error: "Creation date is required",
  }),
  updatedAt: z.string({
    required_error: "Update date is required",
  }),
})

export type UsersTypeAPI = z.infer<typeof zodUsers>
