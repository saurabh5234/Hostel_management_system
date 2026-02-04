import { useEffect, useState } from "react";
import tenantService from "../services/tenantService";
import roomService from "../services/roomService";
import "./AddTenantModal.css";

export default function AddTenantModal({
  onClose,
  onTenantAdded,
  tenantData = null,
}) {
  const [rooms, setRooms] = useState([]);
  const [formData, setFormData] = useState(() => {
    if (tenantData) {
      return {
        name: tenantData.name || "",
        email: tenantData.email || "",
        phone: tenantData.phone || "",
        room: tenantData.room?._id || "",
        status: tenantData.status || "active",
      };
    }
    return {
      name: "",
      email: "",
      phone: "",
      room: "",
      status: "active",
    };
  });

  useEffect(() => {
    const fetchVacantRooms = async () => {
      const data = await roomService.getRooms();

      const filteredRooms = data.filter(
        (r) =>
          r.status === "vacant" ||
          r._id === tenantData?.room?._id
      );

      setRooms(filteredRooms);
    };

    fetchVacantRooms();
  }, [tenantData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (tenantData) {
        await tenantService.updateTenant(tenantData._id, formData);
      } else {
        await tenantService.createTenant(formData);
      }

      onTenantAdded();
      onClose();
    } catch {
      alert("Failed to save tenant");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h2>{tenantData ? "Edit Tenant" : "Add Tenant"}</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <select
            name="room"
            value={formData.room}
            onChange={handleChange}
            required
          >
            <option value="">Select Room</option>
            {rooms.map((room) => (
              <option key={room._id} value={room._id}>
                Room {room.number}
              </option>
            ))}
          </select>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-save">
              {tenantData ? "Update Tenant" : "Add Tenant"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
