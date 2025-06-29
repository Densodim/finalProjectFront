import { useAppSelector } from "../../../app/hooks.ts"
import { selectQuestions } from "../questionsSlice.ts"

export default function useRowsQuestions() {
  const questions = useAppSelector(selectQuestions)

  const row = questions?.map(el => ({
    id: el.id,
    title: el.title,
    desctiption: el.desctiption,
    type: el.type,
    isRequired: el.isRequired,
    order: el.order,
    formId: el.formId,
    options: el.options,
    validation: el.validation,
  }))
  return row
}
