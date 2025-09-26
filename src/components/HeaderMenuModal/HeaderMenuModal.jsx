import React from "react";
import "./HeaderMenuModal.css";
import { Link } from "react-router-dom";
import logo from "../../assets/NewsExplorer.png";
import mobileclose from "../../assets/Mobile Close.png";

function HeaderMenuModal({ isOpen, onClose, onHome, onSignIn }) {
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
        <button className="header__menu-signin_btn" onClick={onSignIn}>
          Sign In
        </button>
      </div>
    </div>
  );
}

export default HeaderMenuModal;
