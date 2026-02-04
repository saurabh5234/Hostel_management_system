import { useEffect, useState } from "react";
import axios from "axios";

export default function StudentDashboard() {
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMyRoom = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/student/rooms/my-room",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRoom(res.data);
    } catch (err) {
      console.error("Error fetching room:", err);
      setRoom(null); // Ensure room is null if there's an error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyRoom();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (!room) {
    return <p>No room assigned yet.</p>;
  }

  return (
    <div>
      <h3>Welcome Student 👋</h3>

      <div className="student-cards">
        <div className="student-card">
          <h4>My Room</h4>
          <p>Room No: {room.number}</p>
        </div>

        <div className="student-card">
          <h4>Monthly Rent</h4>
          <p>₹{room.monthlyRent}</p>
        </div>

        <div className="student-card">
          <h4>Status</h4>
          <p>{room.status}</p>
        </div>
      </div>
    </div>
  );
}
