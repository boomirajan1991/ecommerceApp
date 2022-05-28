import axios from "axios";
import { ApiUrl } from "../Constants/api";
const API = axios.create({
  baseURL: ApiUrl,
  headers: {},
  crossDomain: true,
});
API.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    config.headers.Authorization = token;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
API.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default API;
