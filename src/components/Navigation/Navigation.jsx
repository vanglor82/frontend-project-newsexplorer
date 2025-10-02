// react imports
import { Link, useLocation } from "react-router-dom";

// css imports
import "./Navigation.css";

// assets imports
import logoutImg from "../../assets/logout.png";
import logoutImgBlack from "../../assets/logout black.png";


function Navigation({
  isLoggedIn,
  currentUser,
  onLoginClick,
  onLogout,
  onMenuClick,
  hideMenuBtn,
  isMobile,
  location,
}) {
  const loc = location || useLocation();
  if (isMobile) {
    return (
      <div className="navigation__nav">
        <Link to="/">
          <button
            className={`navigation__home-btn${
              loc.pathname === "/" ? " navigation__home-btn_active" : ""
            }`}
            type="button"
          >
            Home
          </button>
        </Link>
        {!hideMenuBtn && (
          <button
            className={`navigation__menu-btn${
              loc.pathname === "/saved-articles"
                ? " navigation__menu-btn_saved"
                : ""
            }`}
            type="button"
            onClick={onMenuClick}
          ></button>
        )}
      </div>
    );
  }
  if (isLoggedIn) {
    return (
      <div className="navigation__logged-in navigation__logged-in-saved">
        <Link
          to="/"
          className={`navigation__link navigation__link-home${
            loc.pathname === "/" ? " navigation__link_active" : ""
          }`}
        >
          Home
        </Link>
        <Link
          to="/saved-articles"
          className={`navigation__link navigation__link-saved${
            loc.pathname === "/saved-articles" ? " navigation__link_active" : ""
          }`}
        >
          Saved articles
          {loc.pathname === "/saved-articles" && (
            <div className="navigation__link-underline"></div>
          )}
        </Link>
        <button
          className={`navigation__logout-btn${
            loc.pathname === "/saved-articles"
              ? " navigation__logout-btn_saved"
              : ""
          }`}
          type="button"
          onClick={onLogout}
          id="navigation__logout-btn"
        >
          <span className="navigation__logout-username">
            {currentUser?.name || "User"}
          </span>
          <img
            src={
              loc.pathname === "/saved-articles" ? logoutImgBlack : logoutImg
            }
            alt="Logout"
            className="navigation__logout-img"
          />
        </button>
      </div>
    );
  }
  return (
    <div className="navigation__nav">
      <Link to="/">
        <button
          className={`navigation__home-btn${
            loc.pathname === "/" ? " navigation__home-btn_active" : ""
          }`}
          type="button"
        >
          Home
        </button>
      </Link>
      <button
        className="navigation__signin-btn"
        type="button"
        onClick={onLoginClick}
      >
        Sign In
      </button>
    </div>
  );
}

export default Navigation;
