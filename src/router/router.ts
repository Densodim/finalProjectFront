import { createBrowserRouter } from "react-router"
import { App } from "../App.tsx"
import Layout from "../features/layouts/dashboard.tsx"

import UserPage from "../features/user/UserPage.tsx"
import AdminPage from "../features/admin/AdminPage.tsx"
import SignInPage from "../features/login/SignInPage.tsx"
import RegisterPage from "../features/login/RegisterPage.tsx"
import FormPage from "../features/forms/FormsPage.tsx"
import AllUsersPage from "../features/admin/components/users/AllUsersPage.tsx"
import CreateUserPage from "../features/admin/components/users/createUserPage.tsx"
import EditUserPage from "../features/admin/components/users/editUserPage.tsx"
import AllFormsPage from "../features/forms/components/AllFormsPage.tsx"
import CategoriesPage from "../features/categories/CategoriesPage.tsx"

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
                path: "allUsers",
                Component: AllUsersPage,
              },
              {
                path: "createUser",
                Component: CreateUserPage,
              },
              {
                path: `editUser/:id`,
                Component: EditUserPage,
              },
              {
                path: "allForms",
                Component: AllFormsPage,
              },
              {
                path: "categories",
                Component: CategoriesPage,
              },
            ],
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
