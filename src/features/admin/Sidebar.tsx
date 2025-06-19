import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <>
      <div
        className="d-flex flex-column flex-shrink-0 p-3 bg-dark text-white"
        style={{ width: "250px", minHeight: "100vh" }}
      >
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                "nav-link d-flex align-items-center text-white " +
                (isActive ? "active bg-primary" : "")
              }
              to="/admin"
            >
              <i className="bi bi-house-door me-2"></i>Главная
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                "nav-link d-flex align-items-center text-white " +
                (isActive ? "active bg-primary" : "")
              }
              to="/admin/settings"
            >
              <i className="bi bi-gear me-2"></i>Настройки
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}
