import React, { useState } from "react";
import { Link } from "react-router-dom";
import KraubexLogo from "../assets/kraubex-logo.png"; // adjust path

const Header = () => {
  const [navActive, setNavActive] = useState(false);

  const toggleNav = () => {
    setNavActive(!navActive);
  };

  return (
    <header>
      <nav>
        <div className={`nav-left ${navActive ? "active" : ""}`} id="navLeft">
          <Link to="/">
             <img src={KraubexLogo} alt="Kraubex Logo" height="48" />
          </Link>
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
          <Link to="/signin" className="btn btn-secondary">
            Sign in
          </Link>
          <Link to="/signup" className="btn btn-primary">
            Join Kraubex
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
