import { instance } from "./instance.ts"

export const categoryAPI = {
  getCategories(token: string) {
    const promise = instance.get("categories", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return promise
  },
  createCategories({ token, name, description }: createCategoryProps) {
    const promise = instance.post(
      "categories",
      {
        name,
        description,
      },
      { headers: { Authorization: `Bearer ${token}` } },
    )
    return promise
  },
  deleteCategory({ token, id }: DeleteCategoryProps) {
    const promise = instance.delete(`categories/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return promise
  },
}

//types
export type createCategoryProps = {
  token: string
  name: string
  description: string
}
export type DeleteCategoryProps = {
  token: string
  id: number
}
