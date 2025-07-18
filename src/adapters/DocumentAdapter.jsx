import { HttpStatusCode } from "axios";
import API from "./API";

export const saveDocument = (documentData) => {
  return API.post("/api/document/save", documentData)
    .then((response) => {
      if (response.data) {
        return response.data;
      }
      console.error("Something went wrong, document ID is not returned.");
    })
    .catch((error) => {
      console.error(error.data.errorCode);
    });
};

export const downloadPDFDocument = async (documentId) => {
  return API.get("/api/document/generatePDF?documentId=" + documentId, {
    responseType: "blob",
    headers: {
      Accept: "application/pdf",
    },
  })
    .then((response) => {
      if (response.data) {
        return response.data;
      }
      console.error("Something went wrong, document ID is not returned.");
      return undefined;
    })
    .catch((error) => {
      console.error(error.data.errorCode);
      return undefined;
    });
};

export const getAllDocuments = (pageNumber) => {
  return API.get("/api/document/all?pageNumber=" + pageNumber)
    .then((response) => {
      if (response.data) {
        return response.data;
      }
      console.error("Something went wrong, document ID is not returned.");
      return undefined;
    })
    .catch((error) => {
      console.error(error.data.errorCode);
      return undefined;
    });
};

export const getDocumentForId = (documentId) => {
  return API.get("/api/document?documentId=" + documentId)
    .then((response) => {
      if (response.data) {
        return response.data;
      }
      console.error("Something went wrong, document ID is not returned.");
      return undefined;
    })
    .catch((error) => {
      console.error(error.data.errorCode);
      return undefined;
    });
};

export const deleteDocument = (documentId) => {
  return API.get("/api/document/delete?documentId=" + documentId)
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

export const getDocumentUrlSegment = (title, id) => {
  const slug = slugify(title);
  const urlSegment = `${slug}_withId_${id}`;
  return urlSegment;
};

export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}
