import { instance } from "./instance.ts"
import type { LoginApiType } from "../features/login/lib/zodLogin.ts"

export const authAPI = {
  getLogin(email: string, password: string) {
    const promise = instance.post<LoginApiType>("auth/login", {
      email,
      password,
    })
    return promise
  },
  getRegister(
    email: string,
    password: string,
    name: string,
    role: UserRole | undefined,
  ) {
    const promise = instance.post<LoginApiType>("auth/register", {
      email,
      password,
      name,
      role,
    })
    return promise
  },
  getCurrentUser(token: string) {
    const promise = instance.get("auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return promise
  },
}

//type
export type UserRole = LoginApiType["user"]["role"]
