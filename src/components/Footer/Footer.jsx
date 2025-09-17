import "./Footer.css";
import githubLogo from "../../assets/Github.png";
import linkedinLogo from "../../assets/LinkedIn.png";

function Footer() {
  return (
    <footer>
      <p className="footer__text">© 2025 Supersite, Powerd by News API</p>
      <div className="footer__button-grp">
        <button className="footer__home-btn" type="button">
          Home
        </button>
        <button className="footer__TripleTen-btn" type="button">
          TripleTen
        </button>
        <button className="footer__Github-btn" type="button">
          <img src={githubLogo} alt="Github Logo" />
        </button>
        <button className="footer__LinkedIn-btn" type="button">
          <img src={linkedinLogo} alt="LinkedIn Logo" />
        </button>
      </div>
    </footer>
  );
}

export default Footer;
