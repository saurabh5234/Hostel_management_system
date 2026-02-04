import "./QuickActions.css";
import { useNavigate } from "react-router-dom";

export default function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="quick-actions">
      <h3>Quick Actions</h3>

      <div className="quick-actions-grid">
        <div
          className="quick-action-card"
          onClick={() => navigate("/admin/rooms")}
        >
          <div className="icon">🏠</div>
          <span>Add Room</span>
        </div>

        <div
          className="quick-action-card"
          onClick={() => navigate("/admin/tenants")}
        >
          <div className="icon">👤</div>
          <span>Add Tenant</span>
        </div>

        <div
          className="quick-action-card"
          onClick={() => navigate("/admin/payments")}
        >
          <div className="icon">💰</div>
          <span>Record Payment</span>
        </div>

        <div
          className="quick-action-card"
          onClick={() => navigate("/admin/maintenance")}
        >
          <div className="icon">🛠️</div>
          <span>Maintenance</span>
        </div>
      </div>
    </div>
  );
}
