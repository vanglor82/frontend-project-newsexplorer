// css imports
import "./SearchResults.css";

// assets imports
import NotFoundImg from "../../assets/not-found_v1.svg";

// component imports
import Preloader from "../Preloader/Preloader";

function SearchResults({ children, onShowMore, isLoading, hasSearched }) {
  const nothingFound =
    hasSearched && !isLoading && (!children || children.length === 0);
  return (
    <section className="search__results">
      {!nothingFound && (
        <h2 className="search__results-title">Search results</h2>
      )}
      {isLoading && (
        <div className="search__results-loading">
          <Preloader />
          <div className="search__results-loading-text">
            Searching for news...
          </div>
        </div>
      )}
      <div className="search__results-cards">
        {!isLoading && !nothingFound && children}
      </div>
      {nothingFound && (
        <div className="search__results-not-found">
          <img
            src={NotFoundImg}
            alt="Nothing found"
            className="search__results-not-found-img"
          />
          <div className="search__results-not-found-title">Nothing found</div>
          <div className="search__results-not-found-desc">
            Sorry, but nothing matched your search terms.
          </div>
        </div>
      )}
      {children && children.length > 0 && !isLoading && (
        <button
          className="search__results-show-more"
          type="button"
          onClick={onShowMore}
        >
          Show more
        </button>
      )}
    </section>
  );
}

export default SearchResults;
