// react imports
import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";

// css imports
import "./App.css";

// component imports
import Header from "../Header/Header";
import Main from "../Main/Main";
import About from "../About/About";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import SearchResults from "../SearchResults/SearchResults";
import SearchResultCard from "../SearchResultCard/SearchResultCard";
import { APIkey } from "../../utils/constants";
import SavedArticles from "../SavedArticles/SavedArticles";
import SuccessModal from "../SuccessModal/SuccessModal";
import HeaderMenuModal from "../HeaderMenuModal/HeaderMenuModal";

function App() {
  const [isHeaderMenuOpen, setIsHeaderMenuOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
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
  const [searchResults, setSearchResults] = useState(() => {
    try {
      const stored = localStorage.getItem("searchResults");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  // Show 4 cards at a time in mobile view, otherwise default to 3
  const getInitialVisibleCount = () => (window.innerWidth <= 320 ? 4 : 3);
  const [visibleCount, setVisibleCount] = useState(getInitialVisibleCount());
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(() => {
    try {
      const stored = localStorage.getItem("searchResults");
      return stored && JSON.parse(stored).length > 0;
    } catch {
      return false;
    }
  });
  const [savedArticles, setSavedArticles] = useState(() => {
    try {
      const stored = localStorage.getItem("savedArticles");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const navigate = useNavigate();

  const closeModals = () => {
    setActiveModal("");
    setShowSuccessModal(false);
    setIsHeaderMenuOpen(false);
  };

  const handleLogin = () => {
    closeModals();
    setActiveModal("login");
  };

  const handleRegister = () => {
    closeModals();
    setActiveModal("register");
  };

  const handleHeaderMenuOpen = () => {
    closeModals();
    setIsHeaderMenuOpen(true);
  };

  const handleHeaderMenuClose = () => {
    setIsHeaderMenuOpen(false);
  };

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleLoginSubmit = ({ email, password }) => {
    setIsLoggedIn(true);
    setCurrentUser({ name: email.split("@")[0], email });
    setLoginForm({ email: "", password: "" });
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
    setShowSuccessModal(true);
    setActiveModal("");
    setRegisterForm({ email: "", password: "", name: "" });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setSearchResults([]);
    setHasSearched(false);
    try {
      localStorage.setItem("isLoggedIn", "false");
      localStorage.removeItem("currentUser");
      localStorage.removeItem("jwt");
      localStorage.removeItem("searchResults");
    } catch {}
    navigate("/");
  };

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
        try {
          localStorage.setItem(
            "searchResults",
            JSON.stringify(data.articles || [])
          );
        } catch {}
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Search failed:", error);
      });
  };

  const handleShowMore = () => {
    if (window.innerWidth <= 320) {
      setVisibleCount((prev) => prev + 4);
    } else {
      setVisibleCount((prev) => prev + 3);
    }
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

  // Persist search results to localStorage when changed (for manual changes)
  useEffect(() => {
    try {
      localStorage.setItem("searchResults", JSON.stringify(searchResults));
    } catch {}
  }, [searchResults]);

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
                    onMenuClick={handleHeaderMenuOpen}
                    hideMenuBtn={!!activeModal}
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
                    form={loginForm}
                    setForm={setLoginForm}
                  />
                  <RegisterModal
                    isOpen={activeModal === "register"}
                    onClose={closeModals}
                    onRegister={handleRegisterSubmit}
                    onSwitchToLogin={handleLogin}
                    form={registerForm}
                    setForm={setRegisterForm}
                  />
                  <SuccessModal
                    isOpen={showSuccessModal}
                    onClose={() => setShowSuccessModal(false)}
                    onSignIn={() => {
                      setShowSuccessModal(false);
                      setActiveModal("login");
                    }}
                  />
                  <HeaderMenuModal
                    isOpen={isHeaderMenuOpen}
                    onClose={handleHeaderMenuClose}
                    onHome={() => {
                      handleHeaderMenuClose();
                      navigate("/");
                    }}
                    onSignIn={() => {
                      handleHeaderMenuClose();
                      setActiveModal("login");
                    }}
                    onSavedArticles={() => {
                      handleHeaderMenuClose();
                      navigate("/saved-articles");
                    }}
                    onLogout={() => {
                      handleHeaderMenuClose();
                      handleLogout();
                    }}
                    isLoggedIn={isLoggedIn}
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
                      onMenuClick={handleHeaderMenuOpen}
                      hideMenuBtn={!!activeModal}
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
                      form={loginForm}
                      setForm={setLoginForm}
                    />
                    <RegisterModal
                      isOpen={activeModal === "register"}
                      onClose={closeModals}
                      onRegister={handleRegisterSubmit}
                      form={registerForm}
                      setForm={setRegisterForm}
                      onSwitchToLogin={handleLogin}
                    />
                    <HeaderMenuModal
                      isOpen={isHeaderMenuOpen}
                      onClose={handleHeaderMenuClose}
                      onHome={() => {
                        handleHeaderMenuClose();
                        navigate("/");
                      }}
                      onSignIn={() => {
                        handleHeaderMenuClose();
                        setActiveModal("login");
                      }}
                      onSavedArticles={() => {
                        handleHeaderMenuClose();
                        navigate("/saved-articles");
                      }}
                      onLogout={() => {
                        handleHeaderMenuClose();
                        handleLogout();
                      }}
                      isLoggedIn={isLoggedIn}
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
