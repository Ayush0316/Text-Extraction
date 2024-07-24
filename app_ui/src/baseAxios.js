import axios from "axios";

const customAxios = axios.create({
  baseURL: "http://localhost:8000/",
});

customAxios.interceptors.request.use((config) => {
  config.headers["Authorization"] = `Bearer ${localStorage.getItem(
    "token"
  )}`;
  return config;
});

export default customAxios;
