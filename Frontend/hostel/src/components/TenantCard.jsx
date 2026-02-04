import "./TenantCard.css";

export default function TenantCard({ tenant, onDelete, onEdit }) {
  return (
    <div className="tenant-card">
      <h3>{tenant.name}</h3>

      <p><b>Phone:</b> {tenant.phone}</p>
      <p><b>Email:</b> {tenant.email}</p>
      <p><b>Room:</b> {tenant.room?.number || "Not Assigned"}</p>
      <p><b>Status:</b> {tenant.status}</p>

      <div className="tenant-actions">
  <button onClick={() => onEdit(tenant)}>Edit</button>
  <button className="danger" onClick={() => onDelete(tenant._id)}>
    Delete
  </button>
</div>

    </div>
  );
}
