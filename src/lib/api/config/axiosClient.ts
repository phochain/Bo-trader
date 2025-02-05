import axios from "axios";
import * as querystring from "querystring";
import {JWT_LOCAL_STORAGE_KEY} from "../../../constant";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (params) => querystring.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  const accessToken = window.localStorage.getItem(JWT_LOCAL_STORAGE_KEY);

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
})

axiosClient.interceptors.response.use((response) => {
  if (response && response.data) {
    return response.data;
  }

  return response;
},(error) => {
  // Handle errors
  const errorMessage = "Something went wrong!"

  if (error?.response?.data) {
    throw error.response.data;
  }
  throw errorMessage;
})

export default axiosClient