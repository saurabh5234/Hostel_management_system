// Create file: src/services/complaintService.jsx
import api from "./api";

export const getMyComplaints = async () => {
  try {
    const res = await api.get("/student/complaints");
    return res.data;
  } catch (error) {
    console.error("Error fetching complaints:", error);
    throw error;
  }
};

export const createComplaint = async (data) => {
  try {
    const res = await api.post("/student/complaints", data);
    return res.data;
  } 
  catch (error) {
    console.error("Error creating complaint:", error);
    throw error;
  }
};

const complaintService = {
  getMyComplaints,
  createComplaint,
  getComplaints: async () => {
    const res = await api.get("/maintenance");
    return res.data;
  },
  updateComplaintStatus: async (id, status) => {
    const res = await api.put(`/maintenance/${id}`, { status });
    return res.data;
  }
};

export default complaintService;