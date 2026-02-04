import { useEffect, useState } from "react";
import api from "../../services/api";
import "./Reports.css";

export default function Reports() {
  const [report, setReport] = useState(null);

  useEffect(() => {
    const loadReport = async () => {
      try {
        const res = await api.get("/reports/admin");
        setReport(res.data);
      } catch (err) {
        console.error("Failed to load report", err);
        alert("Failed to load report");
      }
    };
    loadReport();
  }, []);

  if (!report) return <p>Loading report...</p>;

  return (
    <div className="reports-page">
      <h2>Admin Reports</h2>

      <div className="report-grid">
        <div className="report-card">Total Rooms: {report.totalRooms}</div>
        <div className="report-card">Occupied Rooms: {report.occupiedRooms}</div>
        <div className="report-card">Total Tenants: {report.totalTenants}</div>
        <div className="report-card">Income: ₹{report.totalIncome}</div>
        <div className="report-card">Expenses: ₹{report.totalExpenses}</div>
        <div className="report-card profit">
          Net Profit: ₹{report.profit}
        </div>
      </div>
    </div>
  );
}
