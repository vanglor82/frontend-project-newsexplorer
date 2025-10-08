// css imports
import "./About.css";

// assets imports
import SmileyFasce from "../../assets/SmileyFaceIcon.svg";

function About() {
  return (
    <section className="about">
      <div className="about__image-placeholder">
        <span role="img" className="about__icon">
          <img src={SmileyFasce} alt="Smiley Face" />
        </span>
        <p>
          Placeholder image.
          <br />
          Put an image of yourself here.
        </p>
      </div>
      <div className="about__content">
        <h2>About the author</h2>
        <p>
          This block describes the project author. Here you should indicate your
          name, what you do, and which development technologies you know.
          <br />
          <br />
          You can also talk about your experience with TripleTen, what you
          learned there, and how you can help potential customers.
        </p>
      </div>
    </section>
  );
}

export default About;
