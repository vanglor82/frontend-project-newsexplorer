// react imports
import { Link, useLocation } from "react-router-dom";

// css imports
import "./Navigation.css";

// assets imports
import logoutImg from "../../assets/LogoutWhiteIcon.svg";
import logoutImgBlack from "../../assets/LogoutBlackIcon.svg";

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
      <div className="navigation">
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
              loc.pathname === "/saved-news"
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
          to="/saved-news"
          className={`navigation__link navigation__link-saved${
            loc.pathname === "/saved-news" ? " navigation__link_active" : ""
          }`}
        >
          Saved articles
          {loc.pathname === "/saved-news" && (
            <div className="navigation__link-underline"></div>
          )}
        </Link>
        <button
          className={`navigation__logout-btn${
            loc.pathname === "/saved-news"
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
            src={loc.pathname === "/saved-news" ? logoutImgBlack : logoutImg}
            alt="Logout"
            className="navigation__logout-img"
          />
        </button>
      </div>
    );
  }
  return (
    <div className="navigation">
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
