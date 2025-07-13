import { HttpStatusCode } from "axios";
import API from "./API";

export const getWebsiteData = () => {
  return API.get("/api/website")
    .then((response) => {
      if (response.status === HttpStatusCode.Ok) {
        return response.data;
      }

      console.error(
        "Something went wrong, return status is: " + response.status
      );
      return undefined;
    })
    .catch((error) => {
      console.error(error.data.errorCode);
      return undefined;
    });
};

export const updateWebsiteData = (websiteData) => {
  return API.post("/api/website", websiteData)
    .then((response) => {
      if (response.status === HttpStatusCode.Ok) {
        return true;
      }

      console.error(
        "Something went wrong, return status is: " + response.status
      );
      return false;
    })
    .catch((error) => {
      console.error(error.data.errorCode);
      return false;
    });
};
