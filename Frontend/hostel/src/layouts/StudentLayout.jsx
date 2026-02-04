import { Outlet, Link, useNavigate } from "react-router-dom";
import "./StudentLayout.css";
export default function StudentLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any stored authentication data
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    // Redirect to home page
    navigate("/", { replace: true });
  };

  return (
<div className="student-layout">
  <header className="student-topbar">
    <h2>Student Portal</h2>

    <nav className="student-nav">
  <Link to="/student/dashboard">Dashboard</Link>
  <Link to="/student/payments">My Payments</Link>
  <Link to="/student/complaints">Complaints</Link>

  <button onClick={handleLogout} className="logout-btn">
    Logout
  </button>
</nav>

  </header>

  <main className="student-content">
    <Outlet />
  </main>
</div>

  );
}
