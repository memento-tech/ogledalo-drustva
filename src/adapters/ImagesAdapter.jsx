import { HttpStatusCode } from "axios";
import API from "./API";

export const uploadImage = (imageData) => {
  return API.post("/api/images/save", imageData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
    .then((response) => {
      if (response.status === HttpStatusCode.Ok) {
        return true;
      }
      return false;
    })
    .catch((error) => {
      console.error(error.data.errorCode);
      return false;
    });
};

export const deleteImages = (imageIds) => {
  return API.post("/api/images/delete", imageIds)
    .then((response) => {
      if (response.status === HttpStatusCode.Ok) {
        return true;
      }
      return false;
    })
    .catch((error) => {
      console.error(error.data.errorCode);
      return false;
    });
};

export const getAllImages = () => {
  return API.get("/api/images/all")
    .then((response) => {
      if (response.status === HttpStatusCode.Ok) {
        return response.data;
      }

      console.error(
        "Something went wrong, return status is: " + response.status
      );
      return [];
    })
    .catch((error) => {
      console.error(error.data.errorCode);
      return [];
    });
};
