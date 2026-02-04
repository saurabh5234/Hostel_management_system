import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import AdminLogin from "../pages/auth/AdminLogin";
import StudentLogin from "../pages/auth/StudentLogin";

/* Admin */
import AdminDashboard from "../pages/admin/Dashboard";
import Rooms from "../pages/admin/Rooms";
import Tenants from "../pages/admin/Tenants";
import Payments from "../pages/admin/Payments";
import Maintenance from "../pages/admin/Maintenance";
import Expenses from "../pages/admin/Expenses"; // ✅ IMPORTANT
import AdminLayout from "../layouts/AdminLayout";
import AdminProtectedRoute from "./AdminProtectedRoute";
import Reports from "../pages/admin/Reports";
import Settings from "../pages/admin/Settings";


/* Student */
import StudentLayout from "../layouts/StudentLayout";
import StudentDashboard from "../pages/student/Dashboard";
import StudentPayments from "../pages/student/StudentPayments";
import StudentComplaints from "../pages/student/Complaints";
import StudentProtectedRoute from "./StudentProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/student/login" element={<StudentLogin />} />

      {/* ================= ADMIN ROUTES ================= */}
      <Route
        path="/admin"
        element={
          <AdminProtectedRoute>
            <AdminLayout />
          </AdminProtectedRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="rooms" element={<Rooms />} />
        <Route path="tenants" element={<Tenants />} />
        <Route path="payments" element={<Payments />} />
        <Route path="maintenance" element={<Maintenance />} />
        <Route path="expenses" element={<Expenses />} /> {/* ✅ FIX */}
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* ================= STUDENT ROUTES ================= */}
      <Route
        path="/student"
        element={
          <StudentProtectedRoute>
            <StudentLayout />
          </StudentProtectedRoute>
        }
      >
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="payments" element={<StudentPayments />} />
        <Route path="complaints" element={<StudentComplaints />} />
      </Route>
    </Routes>
  );
}
