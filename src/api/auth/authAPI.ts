import { instance } from "../instance.ts"
import type { LoginApiType } from "../../features/login/lib/zodLogin.ts"

export const authAPI = {
  getLogin(email: string, password: string) {
    const promise = instance.post<LoginApiType>("auth/login", {
      email,
      password,
    })
    return promise
  },
}
