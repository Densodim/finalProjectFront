
import { instance } from "../instance.ts"

export const usersAPI = {
  getUsers() {
    const promise = instance.get("users")
    return promise
  },
}
