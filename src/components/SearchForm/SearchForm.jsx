// react imports
import { useState } from "react";

// css imports
import "./SearchForm.css";

function SearchForm({ onSearch }) {
  const [query, setQuery] = useState("");
  const [buttonHover, setButtonHover] = useState(false);
  const [buttonActive, setButtonActive] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };

  let formClass = "search__form";
  if (buttonHover) formClass += " search__form-button-hover";
  if (buttonActive) formClass += " search__form-button-active";

  return (
    <div>
      <form onSubmit={handleSubmit} className={formClass}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter topic"
        />
        <button
          type="submit"
          className="search__button"
          onMouseEnter={() => setButtonHover(true)}
          onMouseLeave={() => {
            setButtonHover(false);
            setButtonActive(false);
          }}
          onMouseDown={() => setButtonActive(true)}
          onMouseUp={() => setButtonActive(false)}
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchForm;
