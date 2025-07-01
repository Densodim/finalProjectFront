import { instance } from "./instance.ts"

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
  updateForm({
    id,
    token,
    title,
    description,
    categoryId,
    isPublished = true,
    isDeleted = false,
  }: UpdateFormType) {
    const promise = instance.patch(
      `form/${id}`,
      {
        title,
        description,
        categoryId,
        isPublished,
        isDeleted,
      },
      { headers: { Authorization: `Bearer ${token}` } },
    )
    return promise
  },
  getPublishedForm(token: string) {
    const promise = instance.get("form/publishedForm", {
      headers: { Authorization: `Bearer ${token}` },
    })
    return promise
  },

  fullTextSearch({ token, query }: FullTextSearchType) {
    const promise = instance.post(
      "form/search",
      { query },
      { headers: { Authorization: `Bearer ${token}` } },
    )
    return promise
  },
  getFormsOneUser(token: string) {
    const promise = instance.get("form/formsUser", {
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

export type UpdateFormType = CreateFormType & {
  id: number
  isPublished?: boolean
  isDeleted?: boolean
}
export type FullTextSearchType = {
  token: string
  query: string
}
