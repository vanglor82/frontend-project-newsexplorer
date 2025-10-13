// react imports
import { useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Navigation from "../Navigation/Navigation";

// css imports
import "./Header.css";

// assets imports
import headerLogo from "../../assets/NewsExplorerWhite.svg";
import headerLogoBlack from "../../assets/NewsExplorerBlack.svg";

function Header({
  isLoggedIn,
  currentUser,
  onLoginClick,
  onLogout,
  onMenuClick,
  hideMenuBtn,
}) {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header
      className={`header${
        location.pathname === "/saved-news" ? " header_saved-articles" : ""
      }`}
    >
      <Link to="/">
        <img
          src={
            location.pathname === "/saved-news" ? headerLogoBlack : headerLogo
          }
          alt="News Explorer Logo"
          className="header__logo"
        />
      </Link>
      <nav>
        <Navigation
          isLoggedIn={isLoggedIn}
          currentUser={currentUser}
          onLoginClick={onLoginClick}
          onLogout={onLogout}
          onMenuClick={onMenuClick}
          hideMenuBtn={hideMenuBtn}
          isMobile={isMobile}
          location={location}
        />
      </nav>
    </header>
  );
}

export default Header;
