import { useEffect, useState } from "react";
import tenantService from "../services/tenantService";
import paymentService from "../services/paymentService";
import "./AddPaymentModal.css";

export default function AddPaymentModal({ onClose, onPaymentAdded }) {
  const [tenants, setTenants] = useState([]);
  const [formData, setFormData] = useState({
    tenant: "",
    room: "",
    amount: "",
    mode: "cash",
  });

  useEffect(() => {
    const fetchTenants = async () => {
      const data = await tenantService.getTenants();
      setTenants(data.filter(t => t.room));
    };
    
    fetchTenants();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "tenant") {
      const selectedTenant = tenants.find(t => t._id === value);
      setFormData({
        ...formData,
        tenant: value,
        room: selectedTenant.room._id,
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await paymentService.createPayment({
        ...formData,
        status: "paid",
      });

      onPaymentAdded();
      onClose();
    } catch {
      alert("Failed to add payment");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h2>Add Payment</h2>

        <form onSubmit={handleSubmit}>
          <select name="tenant" onChange={handleChange} required>
            <option value="">Select Tenant</option>
            {tenants.map(t => (
              <option key={t._id} value={t._id}>
                {t.name} (Room {t.room.number})
              </option>
            ))}
          </select>

          <input
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />

          <select name="mode" onChange={handleChange}>
            <option value="cash">Cash</option>
            <option value="upi">UPI</option>
            <option value="bank">Bank Transfer</option>
          </select>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-save">
              Save Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
