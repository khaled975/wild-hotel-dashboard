import axios from "axios";
import { API_KEY, BASE_URL } from "./api";

export const customAxios = axios.create({
  baseURL: `${BASE_URL}`,
  headers: {
    apiKey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
  },
});

export const authAxios = axios.create({
  //   baseURL: AUTH_URL,
  headers: {
    apiKey: API_KEY,
    "Content-Type": "application/json",
  },
});
