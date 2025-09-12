import SearchForm from "../SearchForm/SearchForm";

function SearchForm({ onSearch, isOpen, onClose, onSubmit, children }) {
  return (
    <form onSubmit={onSearch}>
      <input type="text" placeholder="Enter topic" />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchForm;
