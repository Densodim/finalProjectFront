import { instance } from "../instance.ts"

export const formsAPI = {
  createForm({ token, title, description, categoryId }: CreateFormType) {
    const promise = instance.post(
      "form",
      {
        title,
        description,
        categoryId,
      },
      { headers: { Authorization: `Bearer ${token}` } },
    )
    return promise
  },
}
//types
export type CreateFormType = {
  token: string
  title: string
  description: string
  categoryId: number
}
