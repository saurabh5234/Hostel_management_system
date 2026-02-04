import api from "./api";

const getPayments = async () => {
  const res = await api.get("/payments");
  return res.data;
};

const createPayment = async (data) => {
  const res = await api.post("/payments", data);
  return res.data;
};

export default {
  getPayments,
  createPayment,
};
