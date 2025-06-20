import { useAppDispatch } from "../../../app/hooks.ts"
import { useEffect } from "react"
import { featchUserFromToken, skipTokenCheck } from "../authSlice.ts"

export default function AuthInitializer() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      dispatch(featchUserFromToken(token))
    } else {
      dispatch(skipTokenCheck())
    }
  }, [])

  return null
}
