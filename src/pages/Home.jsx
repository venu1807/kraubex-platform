import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/styles.css"; // Adjust path if needed
import KraubexLogo from "../assets/kraubex-logo.png";

const Home = () => {
  const [navActive, setNavActive] = useState(false);

  const toggleNav = () => {
    setNavActive(!navActive);
  };

  return (
    <>
      <header>
        <nav>
          <div className={`nav-left ${navActive ? "active" : ""}`} id="navLeft">
            <img src={KraubexLogo} alt="Kraubex Logo" height="48" />

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

      <main>
        <section className="hero" aria-labelledby="hero-heading">
          <h1 id="hero-heading">
            Welcome to <span>Kraubex</span> – Your Smart AI Procurement Assistant
          </h1>
          <p>
            Kraubex helps small and medium-sized businesses buy smarter, faster,
            and with less effort. Our AI assistant helps you to find the right
            suppliers, compare prices, automate tasks, and understand your
            spending. Powered by collective intelligence and smart algorithms,
            Kraubex supports better decisions, reduces risks, and saves you
            time, money, and energy at every step of procurement.
          </p>

          <div className="features">
            <h2>Benefits of Usage</h2>
            <div className="features-grid">
              <div className="feature-card">
                <span className="feature-icon">
                  <i className="fas fa-search"></i>
                </span>
                <h3>Supplier Matching & Smart Pricing</h3>
                <p>
                  AI-powered algorithms match you with the best suppliers based
                  on your specific requirements.
                </p>
              </div>
              <div className="feature-card">
                <span className="feature-icon">
                  <i className="fas fa-chart-line"></i>
                </span>
                <h3>Spend Analytics & Risk Insights</h3>
                <p>
                  Gain deep insights into spending patterns and spot risks
                  before they hit.
                </p>
              </div>
              <div className="feature-card">
                <span className="feature-icon">
                  <i className="fas fa-robot"></i>
                </span>
                <h3>Workflow Automation</h3>
                <p>
                  Automate procurement tasks to reduce manual work and
                  accelerate decisions.
                </p>
              </div>
              <div className="feature-card">
                <span className="feature-icon">
                  <i className="fas fa-plug"></i>
                </span>
                <h3>ERP Integration</h3>
                <p>
                  Integrate easily with your ERP for a unified procurement
                  experience.
                </p>
              </div>
            </div>
          </div>

          <section className="media-section">
            <div className="media-item flow-container">
              <h2>How Kraubex Works</h2>
              <img
                src="assets/Kraubex_Flow9.png"
                alt="Kraubex Flow Diagram"
                loading="lazy"
              />
            </div>

            <div className="media-item video-container">
              <iframe
                src="https://www.youtube.com/embed/CXYizymW5h8"
                title="Kraubex Introduction Video"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </section>

          <div className="cta">
            <h2>Join the Kraubex Community Today</h2>
            <a href="#" className="btn btn-primary">
              Try Kraubex Free
            </a>
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
              <p style={{ marginBottom: "0.5rem" }}>
                Subscribe for smart procurement insights
              </p>
              <input type="email" placeholder="Your email address" required />
              <button type="submit" className="btn btn-orange">
                Subscribe
              </button>
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
              style={{
                margin: "0 10px",
                color: "#0077b5",
                fontSize: "1.5rem",
                textDecoration: "none",
              }}
            >
              <i className="fab fa-linkedin"></i>
            </a>
            <a
              href="https://www.youtube.com/watch?v=CXYizymW5h8"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Kraubex on YouTube"
              style={{
                margin: "0 10px",
                color: "#FF0000",
                fontSize: "1.5rem",
              }}
            >
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home;
