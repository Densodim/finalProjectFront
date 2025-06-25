import { instance } from "../instance.ts"

export const categoryApi = {
  getCategories(token: string) {
    const promise = instance.get("categories", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return promise
  },
}
