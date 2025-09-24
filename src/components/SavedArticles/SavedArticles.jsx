import React, { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./SavedArticles.css";
import trashIcon from "../../assets/trash icon.png";
import trashIconBlack from "../../assets/trash icon black.png";

function SavedArticles({ articles = [], onRemove }) {
  const currentUser = useContext(CurrentUserContext);
  const userName = currentUser?.name || "User";
  const articleCount = articles.length;
  const keywords = Array.from(new Set(articles.map((a) => a.keyword)));
  const topKeywords = keywords.slice(0, 2);
  const otherCount = keywords.length - topKeywords.length;
  return (
    <section className="saved__articles">
      <h2 className="saved__articles-title">Saved articles</h2>
      <h3 className="saved__articles-subtitle">
        {userName}, you have {articleCount} saved article
        {articleCount !== 1 ? "s" : ""}
      </h3>
      <p className="saved__articles-keywords">
        By keywords:{" "}
        {topKeywords
          .map((kw, i) => (
            <span key={kw} className="saved__articles-keyword">
              {kw}
            </span>
          ))
          .reduce(
            (prev, curr, i) =>
              prev === null ? (
                curr
              ) : (
                <>
                  {prev}, {curr}
                </>
              ),
            null
          )}
        {otherCount > 0 && (
          <>
            {" "}
            and{" "}
            <span className="saved__articles-keyword">{otherCount} other</span>
          </>
        )}
      </p>
      <div className="saved__articles-cards">
        <div className="saved__articles-grid">
          {articles.map((article) => (
            <SavedArticleCard
              key={article.url || article.id}
              article={article}
              trashIcon={trashIcon}
              trashIconBlack={trashIconBlack}
              onRemove={() => onRemove(article.url)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function SavedArticleCard({ article, trashIcon, trashIconBlack, onRemove }) {
  const handleCardClick = (e) => {
    // Prevent click if remove button is clicked
    if (e.target.closest(".saved__articles-remove-btn")) return;
    if (article.url) {
      window.open(article.url, "_blank", "noopener,noreferrer");
    }
  };
  return (
    <div
      className="saved__articles-card"
      style={{ cursor: article.url ? "pointer" : "default" }}
      onClick={handleCardClick}
    >
      <div className="saved__articles-image-wrapper">
        <img
          src={article.image}
          alt={article.title}
          className="saved__articles-image"
        />
        <span className="saved__articles-keyword-tag">{article.keyword}</span>
        <button
          className="saved__articles-remove-btn"
          title="Remove from saved"
          onClick={onRemove}
        >
          <span className="saved__articles-remove-icon" />
        </button>
      </div>
      <div className="saved__articles-card-content">
        <span className="saved__articles-date">{formatDate(article.date)}</span>
        <h4 className="saved__articles-card-title">{article.title}</h4>
        <p className="saved__articles-card-desc">{article.description}</p>
        <span className="saved__articles-source">{article.source}</span>
      </div>
    </div>
  );
}

export default SavedArticles;
