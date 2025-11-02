import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/styles.css"; // adjust path if needed
import KraubexLogo from "../assets/kraubex-logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faYoutube } from "@fortawesome/free-brands-svg-icons";

const Academy = () => {
  const [navActive, setNavActive] = useState(false);

  const toggleNav = () => {
    setNavActive(!navActive);
  };

  return (
    <>
      <header>
        <nav>
          <div className={`nav-left ${navActive ? "active" : ""}`} id="navLeft">
            <a href="/">
              <img src={KraubexLogo} alt="Kraubex Logo" height="48" />
            </a>

            <ul className="nav-links">
              <li><Link to="/product">Product</Link></li>
              <li><Link to="/academy">Academy</Link></li>
              <li><Link to="/pricing">Pricing</Link></li>
            </ul>
          </div>

          <div
            className="nav-toggle"
            id="navToggle"
            role="button"
            aria-label="Toggle navigation"
            aria-expanded={navActive}
            tabIndex="0"
            onClick={toggleNav}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleNav();
              }
            }}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className={`nav-right ${navActive ? "active" : ""}`} id="navRight">
            <a
              href="https://calendly.com/venugopal-achhe/kraubexai-demo"
              className="btn btn-secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a demo
            </a>
            <a href="#" className="btn btn-secondary">
              Sign in
            </a>
            <a href="#" className="btn btn-primary">
              Join Kraubex
            </a>
          </div>
        </nav>
      </header>

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
              It’s the place where one learns about modern Colloborative Procurment AI.
            </p>
          </div>
        </section>
      </main>

      <hr className="full-width-line" />

      <footer>
        <div className="footer-content">
          <div className="footer-left">
            <p>© 2025 Kraubex. All rights reserved.</p>
            <p>info@kraubex.de | +49 176 73550445 | Bielefeld, Germany</p>
          </div>
          <div className="footer-right">
            <form className="newsletter-form" aria-label="Subscribe to newsletter">
              <p style={{ marginBottom: "0.5rem" }}>Subscribe for smart procurement insights</p>
              <input type="email" placeholder="Your email address" required />
              <button type="submit" className="btn btn-orange">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <p>Made in Bielefeld, Germany.</p>
          <div style={{ marginTop: "1rem" }}>
            <a
              href="https://www.linkedin.com/company/kraubex/?viewAsMember=true"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Kraubex on LinkedIn"
              style={{ margin: "0 10px", color: "#0077b5", fontSize: "1.5rem", textDecoration: "none" }}
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a
              href="https://www.youtube.com/watch?v=CXYizymW5h8"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Kraubex on YouTube"
              style={{ margin: "0 10px", color: "#FF0000", fontSize: "1.5rem" }}
            >
              <FontAwesomeIcon icon={faYoutube} />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Academy;
