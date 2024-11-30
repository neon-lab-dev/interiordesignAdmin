import axios from "axios";

const api = axios.create({
  baseURL: "https://interior-design-backend-nine.vercel.app/api/v1", // Replace with your backend's base URL
  withCredentials: true, // This allows cookies to be sent and received
});

export default api;