import { useAppSelector } from "../../../app/hooks.ts"
import { selectCategories } from "../categoriesSlice.ts"

export default function useRowsCategories() {
  const categories = useAppSelector(selectCategories)

  const rows = categories?.map(el => ({
    id: el.id,
    name: el.name,
    description: el.description,
    createdAt: el.createdAt,
    updatedAt: el.updatedAt,
    count: el._count.forms,
  }))
  return rows
}
