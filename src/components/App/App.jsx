//react imports
import { act, use, useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";

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
import SearchResults from "../SearchResults/SearchResults";
import SearchResultCard from "../SearchResultCard/SearchResultCard";
import { APIkey } from "../../utils/constants";
import SavedArticles from "../SavedArticles/SavedArticles";

import "./App.css";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    try {
      return localStorage.getItem("isLoggedIn") === "true";
    } catch {
      return false;
    }
  });
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const stored = localStorage.getItem("currentUser");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [searchResults, setSearchResults] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [savedArticles, setSavedArticles] = useState(() => {
    try {
      const stored = localStorage.getItem("savedArticles");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const navigate = useNavigate();

  const handleLogin = () => setActiveModal("login");
  const handleRegister = () => setActiveModal("register");
  const closeModals = () => setActiveModal("");

  const handleLoginSubmit = ({ email, password }) => {
    // Mock login: set state and close modal
    setIsLoggedIn(true);
    setCurrentUser({ name: email.split("@")[0], email });
    try {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ name: email.split("@")[0], email })
      );
    } catch {}
    closeModals();
    navigate("/");
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
    try {
      localStorage.setItem("isLoggedIn", "false");
      localStorage.removeItem("currentUser");
      localStorage.removeItem("jwt");
    } catch {}
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

  const handleSearch = (query) => {
    setIsLoading(true);
    setHasSearched(true);
    fetch(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(
        query
      )}&apiKey=${APIkey}`
    )
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        setSearchResults(data.articles || []);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Search failed:", error);
      });
  };

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  // Save article handler
  const handleSaveArticle = (article) => {
    setSavedArticles((prev) => {
      if (prev.some((a) => a.url === article.url)) return prev;
      return [
        ...prev,
        {
          ...article,
          keyword: article.keyword || "General",
          date: article.publishedAt || article.date,
          image: article.urlToImage || article.image,
          source: article.source?.name || article.source,
        },
      ];
    });
  };

  // Remove article handler
  const handleRemoveArticle = (url) => {
    setSavedArticles((prev) => prev.filter((a) => a.url !== url));
  };

  // Persist saved articles to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("savedArticles", JSON.stringify(savedArticles));
    } catch {}
  }, [savedArticles]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <div className="app__content">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Header
                    isLoggedIn={isLoggedIn}
                    currentUser={currentUser}
                    onLoginClick={handleLogin}
                    onLogout={handleLogout}
                    onRegisterClick={handleRegister}
                  />
                  <Main searchForm={<SearchForm onSearch={handleSearch} />} />
                  {hasSearched && (
                    <SearchResults
                      onShowMore={handleShowMore}
                      isLoading={isLoading}
                      hasSearched={hasSearched}
                    >
                      {searchResults
                        .slice(0, visibleCount)
                        .map((article, idx) => (
                          <SearchResultCard
                            key={idx}
                            title={article.title}
                            image={article.urlToImage}
                            date={article.publishedAt}
                            description={article.description}
                            source={article.source?.name}
                            url={article.url}
                            onSave={
                              isLoggedIn
                                ? () => handleSaveArticle(article)
                                : undefined
                            }
                            isSaved={
                              !!savedArticles.find((a) => a.url === article.url)
                            }
                            isLoggedIn={isLoggedIn}
                          />
                        ))}
                    </SearchResults>
                  )}
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
                </>
              }
            />
            <Route
              path="/saved-articles"
              element={
                isLoggedIn ? (
                  <>
                    <Header
                      isLoggedIn={isLoggedIn}
                      currentUser={currentUser}
                      onLoginClick={handleLogin}
                      onLogout={handleLogout}
                      onRegisterClick={handleRegister}
                    />
                    <SavedArticles
                      articles={savedArticles}
                      onRemove={handleRemoveArticle}
                    />
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
                  </>
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
          </Routes>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
