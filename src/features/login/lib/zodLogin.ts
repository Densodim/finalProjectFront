import { z } from "zod"

export const zodLogin = z
  .object({
    user: z.object({
      id: z.number(),
      email: z
        .string({
          required_error: "Email is required",
          invalid_type_error: "Email must be a string",
        })
        .email({ message: "Invalid email format" })
        .describe("User's email address"),
      name: z
        .string({
          required_error: "Name is required",
          invalid_type_error: "Name must be a string",
        })
        .describe("Full name of the user"),
      password: z
        .string({
          required_error: "Password is required",
        })
        .describe("Password hash or raw password (usually not exposed)"),
      role: z
        .union(
          [
            z.literal("ADMIN").describe("Administrator role"),
            z.literal("USER").describe("Standard user role"),
            z.literal("SUPER_ADMIN").describe("Highest privilege role"),
          ],
          {
            invalid_type_error: "Role must be one of: ADMIN, USER, SUPER_ADMIN",
          },
        )
        .describe("User role within the system"),
      isActive: z
        .boolean({
          required_error: "isActive is required",
          invalid_type_error: "isActive must be true or false",
        })
        .describe("Whether the account is active"),
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
    }),
    token: z
      .string({
        required_error: "Token is required",
        invalid_type_error: "Token must be a string",
      })
      .describe("JWT token for authentication"),
  })
  .describe("Login API response schema")

export const zodSingIn = zodLogin.shape.user.pick({
  email: true,
  password: true,
})

export const zodRegister = zodLogin.shape.user.pick({
  email: true,
  password: true,
  name: true,
})
export type LoginApiType = z.infer<typeof zodLogin>
