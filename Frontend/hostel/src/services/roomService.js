import api from "./api";

const getRooms = async () => {
  const res = await api.get("/rooms");
  return res.data;
};

const createRoom = async (data) => {
  const res = await api.post("/rooms", data);
  return res.data;
};

const updateRoom = async (id, data) => {
  const res = await api.put(`/rooms/${id}`, data);
  return res.data;
};

const deleteRoom = async (id) => {
  const res = await api.delete(`/rooms/${id}`);
  return res.data;
};

export default {
  getRooms,
  createRoom,
  updateRoom,
  deleteRoom,
};
