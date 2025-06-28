import { Outlet } from "react-router"
import SurveyComponent from "../survey/SurveyComponent.tsx"

export default function UserPage() {
  return (
    <>
      <Outlet />
      <SurveyComponent />
    </>
  )
}
