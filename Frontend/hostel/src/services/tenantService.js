import api from "./api";

const getTenants = async () => {
  const res = await api.get("/tenants");
  return res.data;
};

const createTenant = async (data) => {
  const res = await api.post("/tenants", data);
  return res.data;
};

const updateTenant = async (id, data) => {
  const res = await api.put(`/tenants/${id}`, data);
  return res.data;
};

const deleteTenant = async (id) => {
  const res = await api.delete(`/tenants/${id}`);
  return res.data;
};

export default {
  getTenants,
  createTenant,
  updateTenant,
  deleteTenant,
};
