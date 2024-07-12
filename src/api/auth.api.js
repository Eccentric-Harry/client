import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../constants";

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Interceptor to add Authorization header
API.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor to handle token refresh
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
        localStorage.setItem('accessToken', accessToken);
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

// Login function
export const login = async (formData) => {
  try {
    const { data } = await API.post("/users/login", formData);
    localStorage.setItem('accessToken', data.data.accessToken);
    API.defaults.headers.common["Authorization"] = `Bearer ${data.data.accessToken}`;
    toast.success(data?.message);
    return data?.data?.user;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error?.response?.data?.error;
  }
};

// Logout function
export const logout = async () => {
  try {
    const { data } = await API.post("/users/logout");
    localStorage.removeItem('accessToken');
    delete API.defaults.headers.common["Authorization"];
    toast.success(data?.message);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error?.response?.data?.error;
  }
};

// Get current user function
export const getCurrentUser = async () => {
  try {
    const { data } = await API.get("/users/current-user");
    return data?.data?.user;
  } catch (error) {
    throw error?.response?.data?.error;
  }
};

// Register user function
export const registerUser = async (data) => {
  const formData = new FormData();
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
    toast.success(responseData?.message);
    return responseData?.data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error?.response?.data?.error;
  }
};

// Change password function
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

// Refresh access token function
export const refreshAccessToken = async () => {
  try {
    const { data } = await API.post("/users/refresh-token");
    return data?.data;
  } catch (error) {
    throw error?.response?.data?.error;
  }
};
