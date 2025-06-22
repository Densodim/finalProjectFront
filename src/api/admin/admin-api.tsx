import { instance } from "../instance.ts"

export const adminApi = {
  getUsers(token: string) {
    const promise = instance.get("users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return promise
  },
}
