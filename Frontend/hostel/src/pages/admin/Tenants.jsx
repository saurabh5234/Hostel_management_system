import { useEffect, useState } from "react";
import tenantService from "../../services/tenantService";
import TenantCard from "../../components/TenantCard";
import AddTenantModal from "../../components/AddTenantModal";
import "./Tenants.css";

export default function Tenants() {
  const [tenants, setTenants] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState(null);
  

  const fetchTenants = async () => {
    const data = await tenantService.getTenants();
    setTenants(data);
  };

  useEffect(() => {
    (async () => {
      await fetchTenants();
    })();
  }, []);

  const handleDeleteTenant = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this tenant?"
    );
    if (!confirmDelete) return;

    try {
      await tenantService.deleteTenant(id);
      fetchTenants();
    } catch {
      alert("Failed to delete tenant");
    }
  };

  return (
    <div className="tenants-page">
      <h2>Tenant Management</h2>

      <div className="tenants-actions">
        <input type="text" placeholder="Search tenants..." />

        <select>
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="left">Left</option>
        </select>

        <button
          className="add-tenant-btn"
          onClick={() => {
            setSelectedTenant(null);
            setShowModal(true);
          }}
        >
          + Add Tenant
        </button>
      </div>

      <div className="tenants-grid">
        {tenants.length === 0 ? (
          <p>No tenants found.</p>
        ) : (
          tenants.map((tenant) => (
            <TenantCard
              key={tenant._id}
              tenant={tenant}
              onDelete={handleDeleteTenant}
              onEdit={(tenant) => {
                setSelectedTenant(tenant);
                setShowModal(true);
              }}
            />
          ))
        )}
      </div>

      {showModal && (
  <AddTenantModal
    onClose={() => {
      setShowModal(false);
      setSelectedTenant(null);
    }}
    onTenantAdded={fetchTenants}
    tenantData={selectedTenant}
  />
)}

    </div>
  );
}
