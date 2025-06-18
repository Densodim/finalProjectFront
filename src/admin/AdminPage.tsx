import Navbar from "./Navbar"
import Sidebar from "./Sidebar"
import MainContent from "./MainContent"
import SettingsPage from "./SettingsPage"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { usersAPI } from "../api/users/users-api.tsx"

export default function AdminPage() {
  const users = usersAPI.getUsers()
  console.log(users)
  return (
    <Router>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/admin" element={<MainContent />} />
            <Route path="/admin/settings" element={<SettingsPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}
