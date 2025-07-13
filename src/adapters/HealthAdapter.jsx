import { HttpStatusCode } from "axios";
import API from "./API";

export const checkHealth = () => {
  return API.get("/api/health", { cache: "no-store" })
    .then((response) => {
      return response.status === HttpStatusCode.Ok;
    })
    .catch((error) => {
      console.error(error.data.errorCode);
      return false;
    });
};
