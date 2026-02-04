import { useEffect, useState } from "react";
import maintenanceService from "../../services/maintenanceService";

export default function Maintenance() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadComplaints = async () => {
    try {
      const data = await maintenanceService.getComplaints();
      setComplaints(data);
    } catch (err) {
      console.error(err);
      alert(`Failed to load complaints: ${err.response?.data?.error || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const markResolved = async (id) => {
    try {
      await maintenanceService.updateComplaintStatus(id, "resolved");
      loadComplaints(); // refresh list
    } catch (err) {
      console.error(err);
      alert("Failed to update complaint");
    }
  };

  useEffect(() => {
    loadComplaints();
  }, []);

  if (loading) return <p>Loading maintenance requests...</p>;

  return (
    <div className="admin-page">
      <h2>Maintenance Requests</h2>

      {complaints.length === 0 ? (
        <p>No maintenance requests found.</p>
      ) : (
        complaints.map((c) => (
          <div key={c._id} className="maintenance-card">
            <p><b>Title:</b> {c.title}</p>
            <p><b>Description:</b> {c.description}</p>
            <p>
              <b>Status:</b>{" "}
              <span className={c.status === "pending" ? "pending" : "resolved"}>
                {c.status}
              </span>
            </p>

            {c.status === "pending" && (
              <button onClick={() => markResolved(c._id)}>
                Mark Resolved
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}
