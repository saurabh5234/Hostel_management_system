import { useState } from "react";
import roomService from "../services/roomService";
import "./AddRoomModal.css";

export default function AddRoomModal({ onClose, onRoomAdded, roomData = null }) {

  const [formData, setFormData] = useState({
    number: roomData?.number || "",
    type: roomData?.type || "single",
    floor: roomData?.floor || "",
    monthlyRent: roomData?.monthlyRent || "",
    securityDeposit: roomData?.securityDeposit || "",
    status: roomData?.status || "vacant",
    amenities: {
      wifi: roomData?.amenities?.wifi || false,
      ac: roomData?.amenities?.ac || false,
      tv: roomData?.amenities?.tv || false,
      parking: roomData?.amenities?.parking || false,
      food: roomData?.amenities?.food || false,
    },
    description: roomData?.description || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAmenityChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      amenities: { ...prev.amenities, [name]: checked },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (roomData) {
        await roomService.updateRoom(roomData._id, formData);
      } else {
        await roomService.createRoom(formData);
      }
      onRoomAdded();
      onClose();
    } catch {
      alert("Failed to save room");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h2>{roomData ? "Edit Room" : "Add New Room"}</h2>

        <form onSubmit={handleSubmit}>

          <div className="form-grid">

            <div className="form-group">
              <label>Room Number</label>
              <input name="number" value={formData.number} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Floor</label>
              <input name="floor" value={formData.floor} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Monthly Rent</label>
              <input name="monthlyRent" value={formData.monthlyRent} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Security Deposit</label>
              <input name="securityDeposit" value={formData.securityDeposit} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Room Type</label>
              <select name="type" value={formData.type} onChange={handleChange}>
                <option value="single">Single</option>
                <option value="double">Double</option>
              </select>
            </div>

            <div className="form-group">
              <label>Status</label>
              <select name="status" value={formData.status} onChange={handleChange}>
                <option value="vacant">Vacant</option>
                <option value="occupied">Occupied</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>

          </div>

          <div className="amenities-section">
            <h4>Amenities</h4>
            {["wifi", "ac", "tv", "parking", "food"].map(item => (
              <label key={item}>
                <input
                  type="checkbox"
                  name={item}
                  checked={formData.amenities[item]}
                  onChange={handleAmenityChange}
                />
                {item.toUpperCase()}
              </label>
            ))}
          </div>

          <div className="description-box">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-save">
              Save
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
