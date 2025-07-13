import API from "./API";

export const getProjectForId = (id) => {
  return API.get("/api/projects?id=" + id)
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

export const getProjects = (pageNumber, pageSize = 12) => {
  return API.get(
    "/api/projects/all?pageNumber=" + pageNumber + "&pageSize=" + pageSize
  )
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
