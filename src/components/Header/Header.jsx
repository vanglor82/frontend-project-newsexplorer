//react imports
import { Link } from "react-router-dom";
import { useContext } from "react";

//component imports
import "./Header.css";
import headerLogo from "../../assets/NewsExplorer.png";

function Header({ onLoginClick }) {
  return (
    <header className="header">
      <Link to="/">
        <img
          src={headerLogo}
          alt="News Explorer Logo"
          className="header__logo"
        />
      </Link>
      <div className="header__nav">
        <Link to="/">
          <button className="header__home-btn" type="button">
            Home
          </button>
        </Link>
        <button
          className="header__signin-btn"
          type="button"
          onClick={onLoginClick}
        >
          Sign In
        </button>
      </div>
    </header>
  );
}

export default Header;
