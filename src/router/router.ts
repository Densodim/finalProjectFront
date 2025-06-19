import { createBrowserRouter } from "react-router"
import { App } from "../App.tsx"
import Layout from "../features/layouts/dashboard.tsx"

import DashboardPage from "../features/layouts"
import AdminPage from "../features/admin/AdminPage.tsx"
import SignInPage from "../features/login/SignInPage.tsx"
import RegisterPage from "../features/login/RegisterPage.tsx"

export const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: '/',
        Component: Layout,
        children: [
          {
            path: '/',
            Component: DashboardPage,
          },
          {
            path: '/admin',
            Component: AdminPage,
          },
        ],
      },
      {
        path: '/sign-in',
        Component: SignInPage,
      },
      {
        path:'/register',
        Component:RegisterPage
      }
    ],
  },
]);