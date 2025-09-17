//react imports
import { act, use, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

//component imports

import Header from "../Header/Header";
import Main from "../Main/Main";
import About from "../About/About";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import * as auth from "../../utils/auth";

import "./App.css";

function App() {
  const handleSearch = (query) => {
    console.log("Searching for:", query);
  };
  const [activeModal, setActiveModal] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const handleLogin = () => setActiveModal("login");
  const handleRegister = () => setActiveModal("register");
  const closeModals = () => setActiveModal("");

  const handleLoginSubmit = ({ email, password }) => {
    auth
      .signin({ email, password })
      .then((res) => {
        if (res && res.token) {
          localStorage.setItem("jwt", res.token);
          return auth.getUserData(res.token);
        }
        return Promise.reject("No token received");
      })
      .then((userData) => {
        setIsLoggedIn(true);
        setCurrentUser(userData);
        closeModals();
        navigate("/");
      })
      .catch((err) => {
        console.error("Login failed:", err);
      });
  };

  const handleRegisterSubmit = ({ name, email, password }) => {
    auth
      .signup({ name, email, password })
      .then(() => {
        handleLoginSubmit({ email, password });
      })
      .catch((err) => {
        console.error("Registration failed:", err);
      });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    localStorage.removeItem("jwt");
    navigate("/");
  };

  // useEffect(() => {
  //   const jwt = localStorage.getItem("jwt");
  //   if (jwt) {
  //     auth
  //       .checkToken(jwt)
  //       .then((res) => {
  //         const user = res?.data || res;
  //         if (user && user.id) {
  //           setIsLoggedIn(true);
  //           setCurrentUser(user);
  //         }
  //       })
  //       .catch((err) => {
  //         console.error("Token validation failed:", err);
  //       });
  //   }
  // }, []);

  useEffect(() => {
    if (!activeModal) return;
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeModals();
      }
    };
    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <div className="app__content">
          <Header
            isLoggedIn={isLoggedIn}
            onLoginClick={handleLogin}
            onRegisterClick={handleRegister}
          />
          <Main searchForm={<SearchForm />} />
          <About />
          <Footer />
          <LoginModal
            isOpen={activeModal === "login"}
            onClose={closeModals}
            onLogin={handleLoginSubmit}
            onSwitchToRegister={handleRegister}
          />
          <RegisterModal
            isOpen={activeModal === "register"}
            onClose={closeModals}
            onRegister={handleRegisterSubmit}
            onSwitchToLogin={handleLogin}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
