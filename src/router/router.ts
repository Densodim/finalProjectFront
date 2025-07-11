import { createBrowserRouter } from "react-router"
import { App } from "../App.tsx"
import Layout from "../features/layouts/dashboard.tsx"

import HomePage from "../features/user/HomePage.tsx"
import AdminPage from "../features/admin/AdminPage.tsx"
import SignInPage from "../features/login/SignInPage.tsx"
import RegisterPage from "../features/login/RegisterPage.tsx"
import FormPage from "../features/forms/FormsPage.tsx"
import AllUsersPage from "../features/admin/components/users/AllUsersPage.tsx"
import CreateUserPage from "../features/admin/components/users/createUserPage.tsx"
import EditUserPage from "../features/admin/components/users/editUserPage.tsx"
import AllFormsPage from "../features/forms/components/AllFormsPage.tsx"
import CategoriesPage from "../features/categories/CategoriesPage.tsx"
import { SurveyCreatorWidget } from "../features/survey/SurveyCreator.tsx"
import QuestionsPage from "../features/questions/QuestionsPage.tsx"
import UpdateFormPage from "../features/forms/components/UpdateFormPage.tsx"
import UserPage from "../features/user/UserPage.tsx"
import SurveyComponent from "../features/survey/SurveyComponent.tsx"
import BlockedUserPage from "../features/user/BlockedUserPage.tsx"
import SalesforcePage from "../features/salesforce/SalesforcePage.tsx"

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
            Component: HomePage,
          },
          {
            path: "/forms",
            Component: FormPage,
            children: [
              {
                path: "createForm/:id",
                Component: SurveyCreatorWidget,
              },
              {
                path: "viewForm/:id",
                Component: SurveyComponent,
              },
              {
                path: "viewUserForm",
                Component: UserPage,
              },
              {
                path: "updateForm/:id",
                Component: UpdateFormPage,
              },
              {
                path: "questions/:id",
                Component: QuestionsPage,
              },
            ],
          },
          {
            path:"/salesforce",
            Component:SalesforcePage
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
      {
        path: "/blocked",
        Component: BlockedUserPage,
      },
    ],
  },
])
