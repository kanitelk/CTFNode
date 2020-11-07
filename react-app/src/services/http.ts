import axios from "axios";

const API_BASE_URL = `/api`;

export const http = axios.create({
  baseURL: API_BASE_URL,
  timeout: 2000,
  headers: { "X-Custom-Header": "foobar", "Access-Control-Allow-Origin": "*" },
});
