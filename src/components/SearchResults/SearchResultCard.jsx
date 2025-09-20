import React from "react";
import "./SearchResultCard.css";

function SearchResultCard({ title, image, date, description, source }) {
  return (
    <div className="search-results__card">
      <img src={image} alt={title} className="search-results__card-image" />
      <div className="search-results__card-content">
        <div className="search-results__card-date">{date}</div>
        <h3 className="search-results__card-title">{title}</h3>
        <p className="search-results__card-description">{description}</p>
        <div className="search-results__card-source">{source}</div>
      </div>
    </div>
  );
}

export default SearchResultCard;
