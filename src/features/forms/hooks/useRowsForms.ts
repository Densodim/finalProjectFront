import { useAppSelector } from "../../../app/hooks.ts"
import { selectAllForms } from "../formsSlice.ts"

export default function useRowsForms() {
  const forms = useAppSelector(selectAllForms)
  const rows = forms?.map(el => ({
    id: el.id,
    title: el.title,
    description: el.description,
    isPublished: el.isPublished,
    isDeleted: el.isDeleted,
    createdAt: el.createdAt,
    updatedAt: el.updatedAt,
    authorId: el.authorId,
    categoryId: el.categoryId,
  }))
  return rows
}
