import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../constants";

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

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
  // why are we creating an instanse of FormData() ? because, we are uploading files. plain JavaScript can't handle this.
  if (!data.get("avatar")) {
    toast.error("Avatar is required");
    return;
  }
  formData.append("avatar", data.get("avatar"));
  if (data.get("coverImage")) {
    formData.append("coverImage", data.get("coverImage"));
  }
  formData.append("username", data.get("username"));
  formData.append("email", data.get("email"));
  formData.append("password", data.get("password"));
  formData.append("fullName", data.get("fullName"));
  try {
    const { data: responseData } = await API.post("/users/register", formData);
    // ye bas renaming hai. you can just use { data }.
    toast.success(responseData?.message);
    return responseData?.data;
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
