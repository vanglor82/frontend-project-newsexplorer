import { checkResponse } from "./auth";

export const getNewsData = ({ query }, APIkey) => {
  const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${APIkey}`;

  return fetch(url)
    .then(checkResponse)
    .then((data) => {
      console.log("Fetched news data:", data);
      return data;
    })
    .catch((error) => {
      console.error("Error fetching news data:", error);
    });
};
