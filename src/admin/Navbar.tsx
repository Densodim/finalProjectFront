export default function Navbar() {
  return (
    <>
      <nav className="navbar navbar-dark bg-dark shadow-sm mb-3">
        <a className="navbar-brand d-flex align-items-center ms-3" href="#">
          <i className="bi bi-speedometer2 me-2"></i>
          <span style={{ fontWeight: 600, fontSize: "1.3rem" }}>
            Админ-панель
          </span>
        </a>
      </nav>
    </>
  );
}
