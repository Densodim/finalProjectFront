import "./App.css"
import { Provider } from "react-redux"
import { store } from "./app/store.ts"
import { SnackbarProvider } from "notistack"
import { ReactRouterAppProvider } from "@toolpad/core/react-router"
import { Outlet } from "react-router"
import AuthInitializer from "./features/login/components/AuthInitializer.tsx"
import { NAVIGATION } from "./router/NAVIGATION.tsx"
import AccountCustomSlotProps from "./features/login/components/AccountCustomSlotProps.tsx"

const BRANDING = {
  title: "Final Project clone Google form",
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
          <AccountCustomSlotProps>
            <ReactRouterAppProvider navigation={NAVIGATION} branding={BRANDING}>
              <AuthInitializer />
              <Outlet />
            </ReactRouterAppProvider>
          </AccountCustomSlotProps>
        </SnackbarProvider>
        {/*</PersistGate>*/}
      </Provider>
    </>
  )
}
