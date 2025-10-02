// react imports
import { useState } from "react";

// css imports
import "./SearchForm.css";

function SearchForm({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="search__form">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter topic"
        />
        <button type="submit" className="search__button">
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchForm;
