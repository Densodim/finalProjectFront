import {
  deleteFormThunk,
  getAllFormsThunk,
} from "../../features/forms/formsSlice.ts"
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts"
import { selectToken } from "../../features/login/authSlice.ts"

export function useDeleteItems(gridRowId: string[]) {
  const dispatch = useAppDispatch()
  const token = useAppSelector(selectToken)

  gridRowId.forEach(id => dispatch(deleteFormThunk({ token, id: Number(id) })))
  if (token) {
    dispatch(getAllFormsThunk(token))
  }
}
