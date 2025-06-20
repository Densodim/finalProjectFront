import { useAppDispatch } from "../../../app/hooks.ts"
import { useEffect } from "react"
import { featchUserFromToken } from "../authSlice.ts"

export default function AuthInitializer() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      dispatch(featchUserFromToken(token))
    }
  }, [])

  return null
}
