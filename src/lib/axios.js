import axiosApp from "axios";

const axios = axiosApp.create({
  baseURL: "https://retrocine-django.vercel.app/api/",
  // baseURL: "http://localhost:8000/api/",
});

export default axios;