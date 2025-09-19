import React, { useState } from "react";
import LikeFlag from "../../assets/Like Flag.png";
import LikedFlag from "../../assets/Liked Flag.png";
import "./SearchResultCard.css";

function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function SearchResultCard({
  title,
  image,
  date,
  description,
  source,
  url,
  onSave,
  isSaved,
  isLoggedIn,
}) {
  const [liked, setLiked] = useState(isLoggedIn && isSaved);
  React.useEffect(() => {
    setLiked(isLoggedIn && isSaved);
  }, [isSaved, isLoggedIn]);
  return (
    <a
      className="search__results-card"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: "none", color: "inherit", position: "relative" }}
    >
      <button
        className={`search__results-card_like-btn${
          liked ? " search__results-card_like-btn_active" : ""
        }`}
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (!liked && onSave && isLoggedIn) {
            onSave();
          }
          if (isLoggedIn) setLiked((l) => !l);
        }}
        aria-label={liked ? "Unlike" : "Like"}
        disabled={!isLoggedIn}
        style={!isLoggedIn ? { opacity: 0.5, cursor: "not-allowed" } : {}}
      >
        <img
          src={liked ? LikedFlag : LikeFlag}
          alt={liked ? "Liked flag" : "Like flag"}
        />
      </button>
      <img src={image} alt={title} className="search__results-card_image" />
      <div className="search__results-card_content">
        <div className="search__results-card_date">{formatDate(date)}</div>
        <h3 className="search__results-card_title">{title}</h3>
        <p className="search__results-card_description">{description}</p>
        <div className="search__results-card_source">{source}</div>
      </div>
    </a>
  );
}

export default SearchResultCard;
