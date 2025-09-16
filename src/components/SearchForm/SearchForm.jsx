import React, { useState } from "react";

import "./SearchForm.css";
import { APIkey } from "../../utils/constants";

function SearchForm() {
  const [query, setQuery] = useState("");
  const [articles, setArticles] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(
        query
      )}&apiKey=${APIkey}`
    )
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        setArticles(data.articles || []);
        console.log("Search results:", data.articles);
      })
      .catch((error) => {
        console.error("Search failed:", error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter topic"
        />
        <button type="submit">Search</button>
      </form>
      <ul>
        {articles.map((article, idx) => (
          <li key={idx}>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              {article.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchForm;
