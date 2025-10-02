// react imports
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

// css imports
import "./Header.css";

// assets imports
import headerLogo from "../../assets/NewsExplorer.png";
import headerLogoBlack from "../../assets/NewsExplorer Black.png";
import logoutImg from "../../assets/logout.png";
import logoutImgBlack from "../../assets/logout black.png";

function Header({
  isLoggedIn,
  currentUser,
  onLoginClick,
  onLogout,
  onMenuClick,
  hideMenuBtn,
}) {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      {isMobile ? (
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
          {!hideMenuBtn && (
            <button
              className="header__menu-btn"
              type="button"
              onClick={onMenuClick}
            ></button>
          )}
        </div>
      ) : isLoggedIn ? (
        <div className="header__nav-logged-in">
          <Link
            to="/"
            className={`header__nav-link header__nav-link-home${
              location.pathname === "/" ? " header__nav-link_active" : ""
            }`}
          >
            Home
          </Link>
          <Link
            to="/saved-articles"
            className={`header__nav-link header__nav-link-saved${
              location.pathname === "/saved-articles"
                ? " header__nav-link_active"
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
            id="header__logout-btn"
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
