import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/styles.css"; // adjust path if needed
import KraubexLogo from "../assets/kraubex-logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faYoutube } from "@fortawesome/free-brands-svg-icons";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Academy = () => {
  const [navActive, setNavActive] = useState(false);

  const toggleNav = () => {
    setNavActive(!navActive);
  };

  return (
    <>
      <Header />

      <hr className="full-width-line" />

      {/* Academy Section */}
      <main>
        <section
          className="Academy"
          style={{
            padding: "8rem 2rem",        // increased padding for more vertical space
            backgroundColor: "#f5f1e8",
            minHeight: "70vh",           // ensures body area feels spacious
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center"
          }}
        >
          <div>
            <h2
              style={{
                color: "#c04000",        // same color as used for h1 earlier
                fontSize: "2rem",      // larger heading size
                marginBottom: "1rem",
                fontWeight: "700",
              }}
            >
              Kraubex Academy Coming Soon
            </h2>
            <p
              style={{
                fontSize: "1.2rem",      // slightly larger text
                color: "#292d32",
                maxWidth: "700px",
                margin: "0 auto",
                lineHeight: "1.8",
              }}
            >
              It’s the place where one learns about modern Colloborative Procurement AI.
            </p>
          </div>
        </section>
      </main>

      <hr className="full-width-line" />

      <Footer />
    </>
  );
};

export default Academy;
