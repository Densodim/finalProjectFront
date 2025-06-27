import { Outlet } from "react-router"
import SurveyComponent from "./SurveyComponent.tsx"

export default function UserPage() {
  return (
    <>
      <Outlet />
      <SurveyComponent />
    </>
  )
}
