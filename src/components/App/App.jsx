//react imports
import { act, use, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

//component imports
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import "./App.css";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [isLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const handleLogin = () => {
    setActiveModal("login");
  };

  const handleRegister = () => {
    setActiveModal("register");
  };

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
        navigate("/");
      })
      .catch((err) => {
        console.error("Login failed:", err);
      });
  };

  handleRegisterSubmit = ({ name, email, password }) => {
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

  const closeModals = () => {
    setActiveModal("");
  };

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          const user = res?.data || res;
          if (user && user.id) {
            setIsLoggedIn(true);
            setCurrentUser(user);
          }
        })
        .catch((err) => {
          console.error("Token validation failed:", err);
        });
    }
  }, []);

  useEffect(() => {
    if (activeModal) return;
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
          <Header isLoggedIn={isLoggedIn} onLoginClick={handleLogin} />
          <SearchForm onSearch={handleSearch} />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/saved" element={<SavedNews />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
