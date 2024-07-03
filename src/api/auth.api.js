import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../constants";

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// API Interceptor (Allow you to run your code or modify the request/response before the request is sent or after the response is received.)
API.interceptors.response.use(
  (response) => response, 
  async (error) => {
    const originalRequest = error.config;
    if (
      error?.response?.data?.error === "jwt expired" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        console.log("this refresh access token called");
        const { accessToken } = await refreshAccessToken(); 
        API.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
        return API(originalRequest);
      } catch (refreshError) {
       
        return Promise.reject(refreshError);
      }
    }
  
    return Promise.reject(error);
  }
);

export const login = async (formData) => {
  try {
    const { data } = await API.post("/users/login", formData);
    toast.success(data?.message);
    return data?.data?.user;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error?.response?.data?.error;
  }
};

export const logout = async () => {
  try {
    const { data } = await API.post("/users/logout");
    toast.success(data?.message);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error?.response?.data?.error;
  }
};

export const getCurrentUser = async () => {
  try {
    const { data } = await API.get("/users/current-user");
    return data?.data?.user;
  } catch (error) {
    throw error?.response?.data?.error;
  }
};

export const registerUser = async (data) => {
  const formData = new FormData();

  if (!data.avatar) {
    toast.error("Avatar is required");
    return;
  }
  formData.append("avatar", data.avatar);
  if (data.coverImage) {
    formData.append("coverImage", data.coverImage);
  }
  formData.append("username", data.username);
  formData.append("email", data.email);
  formData.append("password", data.password);
  formData.append("fullName", data.fullName);
  try {
    const { data } = await API.post("/users/register", formData);
    toast.success(data?.message);
    return data?.data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error?.response?.data?.error;
  }
};

export const changePassword = async (newPassData) => {
  try {
    const { data } = await API.post("/users/change-password", newPassData);
    toast.success(data?.message);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error?.response?.data?.error;
  }
};

export const refreshAccessToken = async () => {
  try {
    const { data } = await API.post("/users/refresh-token");
    return data?.data;
  } catch (error) {
    throw error?.response?.data?.error;
  }
};