import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/styles.css"; // adjust path if needed
import KraubexLogo from "../assets/kraubex-logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faYoutube } from "@fortawesome/free-brands-svg-icons";

const Pricing = () => {
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

      {/* Pricing Section */}
      <main>
        <section className="pricing" style={{ padding: "4rem 2rem", backgroundColor: "#f5f1e8" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>

          <h2 style={{
            color: "#2c3e50",
            fontSize: "2rem",
            fontWeight: "bold",
            marginBottom: "1rem"
            }}>
            Kraubex Pricing Plans
          </h2>
            <p>Choose the plan that best fits your business needs.</p>
          </div>

          <div
            className="pricing-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "2rem",
            }}
          >
            {/* Individual Plan */}
            <div
              className="plan-card"
              style={{
                background: "#fff",
                borderRadius: "12px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                padding: "2rem",
                textAlign: "center",
              }}
            >
              <h3 style={{ color: "#b83e01" }}>Individual</h3>
              <p className="price" style={{ fontSize: "2rem", fontWeight: "bold", margin: "1rem 0" }}>
                Free
              </p>
              <ul style={{ textAlign: "left", listStyle: "disc inside", marginBottom: "1.5rem" }}>
                <li>AI-powered supplier matching</li>
                <li>Invoice Comparision & Contract Drafting</li>
                <li>
                  <span className="tooltip">
                    Multi-LLM
                    <span className="tooltiptext">
                      Multi Large Language Models – GPT, Claude, Mistral, Open-source models
                    </span>
                  </span>{" "}
                  support for smarter recommendations
                </li>
                <li>Spend analytics & risk insights</li>
                <li>Workflow automation & ERP integration</li>
                <li>
                  <span className="tooltip">
                    GDPR  {" "}
                    <span className="tooltiptext">EU General Data Protection Regulation compliance</span>
                  </span>, {" "}
                  <span className="tooltip">
                    ISO 27001 {" "}
                    <span className="tooltiptext">Information Security Management</span>
                  </span>, {" "}
                  <span className="tooltip">
                    SOC Type 2 {" "}
                    <span className="tooltiptext">Proven Operational Controls</span>
                  </span>, {" "}
                  <span className="tooltip">
                    ISO 42001 {" "}
                    <span className="tooltiptext">Responsible AI Governance</span>
                  </span> {" "}
                  - compliant data handling & cloud servers
                </li>
                <li>Secure access & encrypted storage</li>
              </ul>
              <a href="#" className="btn btn-primary">Get Started</a>
            </div>

            {/* Teams Plan */}
            <div
              className="plan-card"
              style={{
                background: "#fff",
                borderRadius: "12px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                padding: "2rem",
                textAlign: "center",
              }}
            >
              <h3 style={{ color: "#b83e01" }}>
                Teams{" "}
                <span
                  style={{
                    background: "#c4652d",
                    color: "#fff",
                    fontSize: "0.8rem",
                    padding: "2px 6px",
                    borderRadius: "4px",
                    marginLeft: "5px",
                  }}
                >
                  Most Popular
                </span>
              </h3>
              <p className="price" style={{ fontSize: "2rem", fontWeight: "bold", margin: "1rem 0" }}>
                €40/user/month
              </p>
              <ul style={{ textAlign: "left", listStyle: "disc inside", marginBottom: "1.5rem" }}>
                <li>All Individual features</li>
                <li>Team collaboration & approvals</li>
                <li>Admin dashboard & usage stats</li>
                <li>Centralized billing & user management</li>
                <li>Personalised procurement insights </li>
                <li>
                  Advanced security &{" "}
                  <span className="tooltip">
                    SAML
                    <span className="tooltiptext">Security Assertion Markup Language – Single Sign-On</span>
                  </span>
                  /
                  <span className="tooltip">
                    OIDC
                    <span className="tooltiptext">OpenID Connect – modern authentication protocol</span>
                  </span>{" "}
                  SSO
                </li>
              </ul>
              <a href="#" className="btn btn-primary">Get Started</a>
            </div>

            {/* Enterprise Plan */}
            <div
              className="plan-card"
              style={{
                background: "#fff",
                borderRadius: "12px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                padding: "2rem",
                textAlign: "center",
              }}
            >
              <h3 style={{ color: "#b83e01" }}>Enterprise</h3>
              <p className="price" style={{ fontSize: "2rem", fontWeight: "bold", margin: "1rem 0" }}>
                Custom pricing
              </p>
              <ul style={{ textAlign: "left", listStyle: "disc inside", marginBottom: "1.5rem" }}>
                <li>All Teams features</li>
                <li>
                  <span className="tooltip">
                    SCIM
                    <span className="tooltiptext">
                      System for Cross-domain Identity Management – automates provisioning
                    </span>
                  </span>{" "}
                  seat management & access control
                </li>
                <li>
                  Custom{" "}
                  <span className="tooltip">
                    Multi-LLM
                    <span className="tooltiptext">GPT, Claude, Mistral, Open-source models</span>
                  </span>{" "}
                  optimization for your procurement
                </li>

                <li>Priority support & account management</li>
                <li>Advanced security policies & encryption</li>
                <li>
                  Custom integrations &{" "}
                  <span className="tooltip">
                    SLA
                    <span className="tooltiptext">
                      Service Level Agreements – guaranteed uptime and support
                    </span>
                  </span>
                </li>
              </ul>
              <a href="#" className="btn btn-primary">Contact Us</a>
            </div>
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
            <a href="https://www.linkedin.com/company/kraubex/?viewAsMember=true" target="_blank" aria-label="Kraubex on LinkedIn" style={{ margin: "0 10px", color: "#0077b5", fontSize: "1.5rem", textDecoration: "none" }}>
              <FontAwesomeIcon icon={faLinkedin} size="1x" />
            </a>
            <a href="https://www.youtube.com/watch?v=CXYizymW5h8" target="_blank" aria-label="Kraubex on YouTube" style={{ margin: "0 10px", color: "#FF0000", fontSize: "1.5rem" }}>
              <FontAwesomeIcon icon={faYoutube} size="1x" />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Pricing;
