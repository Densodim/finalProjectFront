import { createBrowserRouter } from "react-router"
import { App } from "../App.tsx"
import Layout from "../features/layouts/dashboard.tsx"

import UserPage from "../features/user/UserPage.tsx"
import AdminPage from "../features/admin/AdminPage.tsx"
import SignInPage from "../features/login/SignInPage.tsx"
import RegisterPage from "../features/login/RegisterPage.tsx"
import FormPage from "../features/forms/FormsPage.tsx"
import AllUsersPage from "../features/admin/AllUsersPage.tsx"

export const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: "/",
        Component: Layout,
        children: [
          {
            path: "/",
            Component: UserPage,
            children: [
              {
                path: "/forms",
                Component: FormPage,
              },
            ],
          },
          {
            path: "/admin",
            Component: AdminPage,
            children: [
              {
                path: 'allUsers',
                Component: AllUsersPage
              }
            ]
          },
        ],
      },
      {
        path: "/sign-in",
        Component: SignInPage,
      },
      {
        path: "/register",
        Component: RegisterPage,
      },
    ],
  },
])
