import { Navigate, Outlet } from "react-router"
import { DashboardLayout } from "@toolpad/core/DashboardLayout"
import { PageContainer } from "@toolpad/core/PageContainer"

export default function Layout() {
  // const location = useLocation()
  const session = localStorage.getItem("token")

  if (session) {
    // Add the `callbackUrl` search parameter
    const redirectTo = `/sign-in`

    return <Navigate to={redirectTo} replace />
  }

  return (
    <DashboardLayout>
      <PageContainer>
        <Outlet />
      </PageContainer>
    </DashboardLayout>
  )
}
