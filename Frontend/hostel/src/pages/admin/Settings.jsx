import { useState } from "react";
import "./Settings.css";

export default function Settings() {
  const [settings, setSettings] = useState({
    hostelName: "",
    email: "",
    phone: "",
    address: "",
    rent: "",
    deposit: ""
  });

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert("Settings saved (UI only for now)");
  };

  return (
    <div className="settings-page">
      <h2>Settings</h2>

      {/* Hostel Info */}
      <div className="settings-card">
        <h3>Hostel Information</h3>

        <form onSubmit={handleSave} className="settings-form">
          <div className="form-grid">
            <input
              type="text"
              name="hostelName"
              placeholder="Hostel / PG Name"
              value={settings.hostelName}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Contact Email"
              value={settings.email}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={settings.phone}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="rent"
              placeholder="Default Monthly Rent"
              value={settings.rent}
              onChange={handleChange}
            />

            <input
              type="number"
              name="deposit"
              placeholder="Security Deposit"
              value={settings.deposit}
              onChange={handleChange}
            />

            <textarea
              name="address"
              placeholder="Hostel Address"
              value={settings.address}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="save-btn">
            Save Settings
          </button>
        </form>
      </div>
    </div>
  );
}
