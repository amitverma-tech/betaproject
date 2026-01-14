import axios from "axios";

export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:2008";

const api = axios.create({
  baseURL: API_URL,
  // include credentials if your backend uses cookies/sessions
  withCredentials: false,
});

export const getImageUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${API_URL.replace(/\/$/, "")}${path.startsWith("/") ? "" : "/"}${path}`;
};

export default api;
