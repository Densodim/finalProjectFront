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
  deleteForm({ id, token }: DeleteFormType) {
    const promise = instance.delete(`form/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return promise
  },
  getForm({ token, id }: GetOneFormType) {
    const promise = instance.get(`form/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
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
export type DeleteFormType = {
  token: string
  id: number
}
export type GetOneFormType = DeleteFormType
