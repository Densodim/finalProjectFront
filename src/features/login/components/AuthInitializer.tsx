import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts"
import { useEffect } from "react"
import {
  featchUserFromToken,
  selectBlocked,
  selectIsAuthenticated,
  selectIsAuthLoaded,
  selectUserRole,
  skipTokenCheck,
} from "../authSlice.ts"
import { Navigate, useLocation } from "react-router"

export default function AuthInitializer() {
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const location = useLocation()
  const path = location.pathname
  const userRole = useAppSelector(selectUserRole)
  const userBlocked = useAppSelector(selectBlocked)
  const isLoaded = useAppSelector(selectIsAuthLoaded)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      dispatch(featchUserFromToken(token))
    } else {
      dispatch(skipTokenCheck())
    }
  }, [])

  if (!isLoaded) {
    return null
  }

  if (!isAuthenticated && path !== "/sign-in" && path !== "/register") {
    return <Navigate to={"/sign-in"} replace />
  }
  if (isAuthenticated && userRole === "USER" && path.startsWith("/admin")) {
    return <Navigate to={"/"} replace />
  }

  if (isAuthenticated && (path === "/sign-in" || path === "/register")) {
    return <Navigate to={"/"} replace />
  }

  if (!isAuthenticated && userBlocked) {
    return <Navigate to={"/blocked"} replace />
  }

  return null
}
