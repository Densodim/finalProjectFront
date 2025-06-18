import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import SettingsPage from "./SettingsPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function AdminPage() {
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
  );
}
