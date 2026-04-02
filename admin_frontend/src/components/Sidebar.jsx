import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h3 className="logo-text">ADMIN</h3>
      </div>

      <ul className="menu">
        <li>
          <NavLink to="/">
            <span className="icon">🏠</span>
            <span className="text">Dashboard</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/cars">
            <span className="icon">🚗</span>
            <span className="text">Cars</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/customers">
            <span className="icon">👤</span>
            <span className="text">Customers</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/appointments">
            <span className="icon">🗓️</span>
            <span className="text">Appointments</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/contacts">
            <span className="icon">📩</span>
            <span className="text">Contacts</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/Settings">
            <span className="icon">⚙</span>
            <span className="text">Settings</span>
          </NavLink>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;