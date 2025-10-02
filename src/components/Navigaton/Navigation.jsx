// react imports
import { Routes, Route, Link } from "react-router-dom";

// css imports
import "./Navigation.css";

function Navigation() {
  return (
    <nav className="navigation">
      <ul className="navigation__list">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/saved-articles">Saved Articles</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="/about" element={<div>About Page</div>} />
        <Route
          path="/saved-articles"
          element={<div>Saved Articles Page</div>}
        />
      </Routes>
    </nav>
  );
}

export default Navigation;
