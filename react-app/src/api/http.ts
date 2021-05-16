import axios from "axios";
import { TokenStorage } from "../core/tokenStorage";

const API_BASE_URL = `/`;

const http = axios.create({
  baseURL: API_BASE_URL,
});

http.interceptors.request.use(function (config) {
  const token = TokenStorage.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { http };
