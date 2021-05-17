import axios, { AxiosError, AxiosResponse } from "axios";
import { TokenStorage } from "../core/tokenStorage";

const API_BASE_URL = `/`;

const http = axios.create({
  baseURL: API_BASE_URL,
});

export function createRestError(err: AxiosError) {
  if (!err.response) {
    return new Error("Unknown error");
  }

  const { status, data, config } = err.response as AxiosResponse;
  return new Error(data.message || err.message || "Unknown error");
}

async function onErrorInterceptor(e: AxiosError): Promise<AxiosResponse> {
  throw createRestError(e);
}

http.interceptors.request.use(function (config) {
  const token = TokenStorage.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

http.interceptors.response.use((response) => response, onErrorInterceptor);

export { http };
