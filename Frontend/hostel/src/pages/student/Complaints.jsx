// pages/student/Complaints.jsx
import { useEffect, useState } from "react";
// Try dynamic import
const maintenanceService = await import("../../services/maintenanceService.jsx"); // Use new service
import "./StudentComplaints.css";

export default function StudentComplaints() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadComplaints = async () => {
    try {
      const data = await maintenanceService.getMyComplaints(); // Changed
      setComplaints(data);
    } catch (error) {
      console.error("Load complaints error:", error);
      alert("Failed to load complaints");
    } finally {
      setLoading(false);
    }
  };

  const submitComplaint = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      alert("Please fill all fields");
      return;
    }

    try {
      await maintenanceService.createComplaint({ title, description }); // Changed
      setTitle("");
      setDescription("");
      loadComplaints();
      alert("Complaint submitted successfully!");
    } catch (error) {
      console.error("Submit complaint error:", error);
      alert(`Failed to submit complaint: ${error.message}`);
    }
  };

  useEffect(() => {
    loadComplaints();
  }, []);

  return (
    <div className="complaint-page">
      <h2>Complaints & Maintenance</h2>

      {/* Raise Complaint */}
      <div className="complaint-card">
        <h3>Raise a Complaint</h3>

        <form onSubmit={submitComplaint} className="complaint-form">
          <input
            type="text"
            placeholder="Complaint Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Describe your issue..."
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button type="submit">Submit Complaint</button>
        </form>
      </div>

      {/* My Complaints */}
      <div className="complaint-card">
        <h3>My Complaints</h3>

        {loading ? (
          <p>Loading complaints...</p>
        ) : complaints.length === 0 ? (
          <p className="empty">No complaints raised yet.</p>
        ) : (
          complaints.map((c) => (
            <div key={c._id} className="complaint-item">
              <div>
                <strong>{c.title}</strong>
                <p>{c.description}</p>
              </div>

              <span className={`status ${c.status}`}>
                {c.status}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}