// react imports
import { Link } from "react-router-dom";

// css imports
import "./Footer.css";

// assets imports
import githubLogo from "../../assets/Github.png";
import linkedinLogo from "../../assets/LinkedIn.png";

function Footer() {
  return (
    <footer>
      <p className="footer__text">© 2025 Supersite, Powerd by News API</p>
      <div className="footer__button-grp">
        <div className="footer__button-grp-col">
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <button className="footer__home-btn" type="button">
              Home
            </button>
          </Link>
          <a
            href="https://tripleten.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="footer__tripleten-btn" type="button">
              TripleTen
            </button>
          </a>
        </div>
        <div className="footer__button-grp-col">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="footer__github-btn" type="button">
              <img src={githubLogo} alt="Github Logo" />
            </button>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="footer__linkedin-btn" type="button">
              <img src={linkedinLogo} alt="LinkedIn Logo" />
            </button>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
