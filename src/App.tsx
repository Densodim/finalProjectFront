import "./App.css"
import AdminPage from "./admin/AdminPage.tsx"
import { useState } from "react"
import SignInPage from "./features/login/SignInPage.tsx"

export const App = () => {
  const [login, setLogin] = useState(true)
  if (login) {
    return <SignInPage />
  }
  return (
    <>
      <AdminPage />
    </>
  )
}
