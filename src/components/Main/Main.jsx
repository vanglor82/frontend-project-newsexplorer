import React from "react";
import "./Main.css";

function Main({ searchForm }) {
  return (
    <main>
      <section className="main">
        <div className="main__overlay">
          <h1 className="main__title">What's going on in the world?</h1>
          <p className="main__subtitle">
            Find the latest news on any topic and save them in your personal
            account.
          </p>
          {searchForm}
        </div>
      </section>
    </main>
  );
}

export default Main;
