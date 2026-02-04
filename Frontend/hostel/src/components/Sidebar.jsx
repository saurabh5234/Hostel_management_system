import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="logo">PG Manager</h2>

      <nav>
        <NavLink to="/admin/dashboard">Dashboard</NavLink>
        <NavLink to="/admin/rooms">Rooms</NavLink>
        <NavLink to="/admin/tenants">Tenants</NavLink>
        <NavLink to="/admin/payments">Payments</NavLink>
        <NavLink to="/admin/maintenance">Maintenance</NavLink>
        <NavLink to="/admin/expenses">Expenses</NavLink>
        <NavLink to="/admin/reports">Reports</NavLink>
        <NavLink to="/admin/settings">Settings</NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;
