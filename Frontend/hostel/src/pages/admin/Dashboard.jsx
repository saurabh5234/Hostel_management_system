import { useEffect, useState } from "react";
import api from "../../services/api";
import QuickActions from "../../components/QuickActions";


export default function Dashboard() {
  const [rooms, setRooms] = useState([]);
  const [tenants, setTenants] = useState([]);

  const fetchDashboardData = async () => {
    try {
      const roomsRes = await api.get("/rooms");
      const tenantsRes = await api.get("/tenants");

      setRooms(roomsRes.data);
      setTenants(tenantsRes.data);
    } catch (error) {
      console.error("Error loading dashboard data", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchDashboardData();
    };
    fetchData();
  }, []);

  const totalRooms = rooms.length;
  const occupiedRooms = rooms.filter(r => r.status === "occupied").length;
  const vacantRooms = rooms.filter(r => r.status === "vacant").length;
  const totalTenants = tenants.length;

  return (
    <div className="dashboard-container">
      <h2>Admin Dashboard</h2>

      <div className="dashboard-cards">
        <DashboardCard title="Total Rooms" value={totalRooms} />
        <DashboardCard title="Occupied Rooms" value={occupiedRooms} />
        <DashboardCard title="Vacant Rooms" value={vacantRooms} />
        <DashboardCard title="Total Tenants" value={totalTenants} />
      </div>
      <QuickActions />
    </div>
    
  );
}

function DashboardCard({ title, value }) {
  return (
    <div className="dashboard-card">
      <h4>{title}</h4>
      <p>{value}</p>
    </div>
  );
}
