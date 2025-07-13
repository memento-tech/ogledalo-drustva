import API from "./API";

export const getNewsForId = (id) => {
  return API.get("/api/news?id=" + id)
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

export const getTopNews = () => {
  return API.get("/api/news/top-news")
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

export const getOtherNews = (
  pageNumber,
  pageSize = 12,
  includeTopNews = false,
  excludeNewsId = ""
) => {
  return API.get(
    "/api/news/other-news?pageNumber=" +
      pageNumber +
      "&pageSize=" +
      pageSize +
      "&includeTopNews=" +
      includeTopNews +
      "&excludeNewsId=" +
      excludeNewsId
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
