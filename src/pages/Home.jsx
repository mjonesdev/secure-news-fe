import React from "react";
import LinkButton from "../components/LinkButton";
import "./Home.css";

function Home() {
  return (
    <main>
      <section className="home__link-container">
        <LinkButton buttonType={"Articles"} />
        <LinkButton buttonType={"Account"} />
      </section>
    </main>
  );
}

export default Home;
