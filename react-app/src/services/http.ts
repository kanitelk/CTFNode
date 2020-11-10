import axios from "axios";
import store from "../store";

const API_BASE_URL = `/api`;

const http = axios.create({
  baseURL: API_BASE_URL,
});

http.interceptors.request.use(function (config) {
  const token = store.getState().auth.token;
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export { http };
