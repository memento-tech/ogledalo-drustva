import { HttpStatusCode } from "axios";
import API from "./API";

export const login = (loginData) => {
  return API.post("/api/auth/login", loginData)
    .then((response) => {
      localStorage.setItem("token", response.data.token);
      return true;
    })
    .catch((error) => {
      console.error(error.data.errorCode);
      return false;
    });
};

export const checkLoggedIn = () => {
  return API.get("/api/auth/check")
    .then((response) => {
      if (response.status === HttpStatusCode.Ok) {
        return true;
      }
      logout();
      return false;
    })
    .catch((error) => {
      console.log("1233");
      logout();
      console.error(error.data.errorCode);
      return false;
    });
};

export const logout = () => {
  localStorage.removeItem("token");
  API.defaults.headers.common["Authorization"] = "";
};
