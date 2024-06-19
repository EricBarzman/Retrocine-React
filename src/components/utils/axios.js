import axiosApp from "axios";

const axios = axiosApp.create({
  baseURL: "http://localhost:8000/api/",
});

export default axios;