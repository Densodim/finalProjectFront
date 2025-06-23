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
  deleteUser(token: string, id: number) {
    const promise = instance.delete(`users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return promise
  },
}
