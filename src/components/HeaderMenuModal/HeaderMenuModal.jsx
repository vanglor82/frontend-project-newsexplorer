// css imports
import "./HeaderMenuModal.css";

// react imports
import { Link } from "react-router-dom";

// assets imports
import logo from "../../assets/NewsExplorerWhite.svg";
import mobileclose from "../../assets/MobileCloseIcon.svg";

function HeaderMenuModal({
  isOpen,
  onClose,
  onHome,
  onSignIn,
  onSavedArticles,
  onLogout,
  isLoggedIn,
}) {
  if (!isOpen) return null;
  return (
    <div className="header__menu-modal_overlay">
      <div className="header__menu-modal">
        <div className="header__menu-modal_top">
          <Link to="/">
            <img
              src={logo}
              alt="News Explorer Logo"
              className="header__menu-logo"
            />
          </Link>
          <button className="header__menu-close_btn" onClick={onClose}>
            <img src={mobileclose} alt="Close" />
          </button>
        </div>
        <button className="header__menu-home_btn" onClick={onHome}>
          Home
        </button>
        {isLoggedIn ? (
          <>
            <button
              className="header__menu-saved_btn"
              onClick={onSavedArticles}
            >
              Saved Articles
            </button>
            <button className="header__menu-logout_btn" onClick={onLogout}>
              Log Out
            </button>
          </>
        ) : (
          <button className="header__menu-signin_btn" onClick={onSignIn}>
            Sign In
          </button>
        )}
      </div>
    </div>
  );
}

export default HeaderMenuModal;
