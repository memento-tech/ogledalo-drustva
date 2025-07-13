import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const axiosApiInstance = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
  timeout: 0,
});

axiosApiInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosApiInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      error.code === "ERR_NETWORK" ||
      (error.code === "ECONNABORTED" && error.message.includes("timeout"))
    ) {
      return Promise.reject({
        data: { errorCode: "error.connection.timeout" },
      });
    }

    if (error.response?.status === 404) {
      return Promise.reject({
        data: { errorCode: "error.not.found" },
      });
    }

    return Promise.reject(error.response);
  }
);

export default axiosApiInstance;
