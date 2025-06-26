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
}

//types
export type createCategoryProps = {
  token: string
  name: string
  description: string
}
