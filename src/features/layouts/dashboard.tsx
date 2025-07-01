import { Outlet } from "react-router"
import { DashboardLayout } from "@toolpad/core/DashboardLayout"
import { PageContainer } from "@toolpad/core/PageContainer"
import { useAppSelector } from "../../app/hooks.ts"
import { selectIsAuthLoaded } from "../login/authSlice.ts"
import { LinearProgress } from "@mui/material"
import SearchComponent from "../forms/SearchComponent.tsx"

export default function Layout() {
  const isLoaded = useAppSelector(selectIsAuthLoaded)

  if (!isLoaded) {
    return (
      <div style={{ width: "100%" }}>
        <LinearProgress />
      </div>
    )
  }

  return (
    <DashboardLayout
      slots={{
        toolbarActions: SearchComponent,
      }}
    >
      <PageContainer>
        <Outlet />
      </PageContainer>
    </DashboardLayout>
  )
}
