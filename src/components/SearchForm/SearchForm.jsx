// react imports
import { useState } from "react";

// css imports
import "./SearchForm.css";

function SearchForm({ onSearch }) {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setError("Please enter a keyword");
      return;
    }
    setError("");
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <div className="search__form-container">
      <form onSubmit={handleSubmit} className="search__form">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={error ? error : "Enter topic"}
          className={
            error
              ? "search__form-input search__form-input_error"
              : "search__form-input"
          }
        />
        <button type="submit" className="search__form-button">
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchForm;
