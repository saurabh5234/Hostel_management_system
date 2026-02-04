import { useNavigate } from "react-router-dom";
import "./Topbar.css";

function Topbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/admin/login");
  };

  return (
    <div className="topbar">
      <input
        type="text"
        placeholder="Search rooms, tenants, payments..."
        className="search-box"
      />

      <div className="profile">
        <span className="admin-name">Admin</span>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Topbar;
