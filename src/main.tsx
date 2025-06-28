import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import 'survey-core/survey-core.css'
import "survey-creator-core/survey-creator-core.css"
import { RouterProvider } from "react-router"
import { router } from "./router/router.ts"

const container = document.getElementById("root")

if (container) {
  const root = createRoot(container)

  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
