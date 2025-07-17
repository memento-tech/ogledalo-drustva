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

export const updateImageDescription = (id, description) => {
  let s = {
    imageId: id + "",
    alt: description,
  };

  return API.post("/api/images/description", s)
    .then((response) => {
      if (response.status !== HttpStatusCode.Ok) {
        console.error(
          "Something went wrong, return status is: " + response.status
        );
        alert("Something went wrong, please try later.");
      }

      return response.data;
    })
    .catch((error) => {
      console.error(error.data.errorCode);
      alert("Something went wrong, please try later.");
    });
};
