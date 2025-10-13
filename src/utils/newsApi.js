const newsApiBaseUrl =
  process.env.NODE_ENV === "production"
    ? "https://nomoreparties.co/news/v2/everything"
    : "https://newsapi.org/v2/everything";

export const getNewsData = ({ query }, APIkey) => {
  const to = new Date();
  const from = new Date();
  from.setDate(to.getDate() - 7);

  const url = `${newsApiBaseUrl}?q=${encodeURIComponent(
    query
  )}&apiKey=${APIkey}&from=${from.toISOString().slice(0, 10)}&to=${to
    .toISOString()
    .slice(0, 10)}&pageSize=100`;

  return fetch(url)
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .catch((error) => {
      console.error("Error fetching news data:", error);
    });
};
