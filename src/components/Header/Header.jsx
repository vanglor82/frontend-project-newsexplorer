// react imports
import { useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Navigation from "../Navigation/Navigation";

// css imports
import "./Header.css";

// assets imports
import headerLogo from "../../assets/NewsExplorer.png";
import headerLogoBlack from "../../assets/NewsExplorer Black.png";

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
    </header>
  );
}

export default Header;
