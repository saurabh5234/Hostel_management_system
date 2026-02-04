import api from "./api";

const studentService = {
  getMyRoom: async () => {
    const res = await api.get("/student/room");
    return res.data;
  }
};

export const getComplaints = () =>
  api.get("/student/complaints").then(res => res.data);

export const addComplaint = (data) =>
  api.post("/student/complaints", data);

export default studentService;
