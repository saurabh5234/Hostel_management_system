import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

api.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

    // disable cache
  req.headers["Cache-Control"] = "no-cache";
  req.headers["Pragma"] = "no-cache";
  req.headers["Expires"] = "0";

  return req;
});



export default api;
