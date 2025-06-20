import { Navigate, Outlet, useLocation } from "react-router"
import { DashboardLayout } from "@toolpad/core/DashboardLayout"
import { PageContainer } from "@toolpad/core/PageContainer"
import { useAppSelector } from "../../app/hooks.ts"
import {
  selectIsAuthenticated,
  selectStatus,
  selectUserRole,
} from "../login/authSlice.ts"
import { LinearProgress } from "@mui/material"

export default function Layout() {
  const location = useLocation()
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const userRole = useAppSelector(selectUserRole)
  const status = useAppSelector(selectStatus)
  const path = location.pathname

  console.log("isAuthenticated:", isAuthenticated)
  console.log("userRole", userRole)

  if (status === "loading") {
    return (
      <div style={{ width: "100%" }}>
        <LinearProgress />
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  if (!isAuthenticated && path !== "/sign-in" && path !== "/register") {
    return <Navigate to={"/sign-in"} replace />
  }
  if (isAuthenticated && userRole === "USER" && path.startsWith("/admin")) {
    return <Navigate to={"/"} replace />
  }

  return (
    <DashboardLayout>
      <PageContainer>
        <Outlet />
      </PageContainer>
    </DashboardLayout>
  )
}
