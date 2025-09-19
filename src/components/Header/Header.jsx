//react imports
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";

//component imports
import "./Header.css";
import headerLogo from "../../assets/NewsExplorer.png";
import headerLogoBlack from "../../assets/NewsExplorer Black.png";
import logoutImg from "../../assets/logout.png";
import logoutImgBlack from "../../assets/logout black.png";

function Header({ isLoggedIn, currentUser, onLoginClick, onLogout }) {
  const location = useLocation();
  return (
    <header
      className={`header${
        location.pathname === "/saved-articles" ? " header_saved-articles" : ""
      }`}
    >
      <Link to="/">
        <img
          src={
            location.pathname === "/saved-articles"
              ? headerLogoBlack
              : headerLogo
          }
          alt="News Explorer Logo"
          className="header__logo"
        />
      </Link>
      {isLoggedIn ? (
        <div className="header__nav-logged-in">
          <Link
            to="/"
            className={`header__nav-link${
              location.pathname === "/" ? " header__nav-link_active" : ""
            }${
              location.pathname === "/saved-articles"
                ? " header__nav-link_saved"
                : ""
            }`}
          >
            Home
          </Link>
          <Link
            to="/saved-articles"
            className={`header__nav-link${
              location.pathname === "/saved-articles"
                ? " header__nav-link_saved"
                : ""
            }`}
          >
            Saved articles
            {location.pathname === "/saved-articles" && (
              <div className="header__nav-link-underline"></div>
            )}
          </Link>
          <button
            className={`header__logout-btn${
              location.pathname === "/saved-articles"
                ? " header__logout-btn_saved"
                : ""
            }`}
            type="button"
            onClick={onLogout}
            aria-label="Logout"
          >
            <span className="header__logout-username">
              {currentUser?.name || "User"}
            </span>
            <img
              src={
                location.pathname === "/saved-articles"
                  ? logoutImgBlack
                  : logoutImg
              }
              alt="Logout"
              className="header__logout-img"
            />
          </button>
        </div>
      ) : (
        <div className="header__nav">
          <Link to="/">
            <button
              className={`header__home-btn${
                location.pathname === "/" ? " header__home-btn_active" : ""
              }`}
              type="button"
            >
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
      )}
    </header>
  );
}

export default Header;
