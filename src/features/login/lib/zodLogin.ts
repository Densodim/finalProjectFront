import { z } from "zod"

export const zodLogin = z.object({
  user: z.object({
    id: z.number(),
    email: z.string(),
    name: z.string(),
    password: z.string(),
    role: z.union([
      z.literal("ADMIN"),
      z.literal("USER"),
      z.literal("SUPER_ADMIN"),
    ]),
    isActive: z.boolean(),
    lastLoginAt: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
  token: z.string(),
})

export type LoginApiType = z.infer<typeof zodLogin>
