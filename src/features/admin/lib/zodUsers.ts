import { z } from "zod"

export const zodUsers = z.object({
  id: z.number(),
  email: z.string().email(),
  name: z.string().min(6),
  password: z.string().min(6),
  role: z.union([
    z.literal("USER"),
    z.literal("ADMIN"),
    z.literal("USER_ADMIN"),
  ]),
  isActive: z.boolean(),
  lastLoginAt: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export type UsersTypeAPI = z.infer<typeof zodUsers>
