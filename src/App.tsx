import "./App.css"
import { Provider } from "react-redux"
import { store } from "./app/store.ts"
import { SnackbarProvider } from "notistack"
import { ReactRouterAppProvider } from "@toolpad/core/react-router"
import type { Navigation } from "@toolpad/core/AppProvider"
import DashboardIcon from "@mui/icons-material/Dashboard"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import { Outlet } from "react-router"
import AuthInitializer from "./features/login/components/AuthInitializer.tsx"

const NAVIGATION: Navigation = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "orders",
    title: "Orders",
    icon: <ShoppingCartIcon />,
  },
]

const BRANDING = {
  title: "My Toolpad Core App",
}

export const App = () => {
  return (
    <>
      <Provider store={store}>
        {/*<PersistGate persistor={persist} loading={null}>*/}
        <SnackbarProvider
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <ReactRouterAppProvider navigation={NAVIGATION} branding={BRANDING}>
            <AuthInitializer />
            <Outlet />
          </ReactRouterAppProvider>
        </SnackbarProvider>
        {/*</PersistGate>*/}
      </Provider>
    </>
  )
}
