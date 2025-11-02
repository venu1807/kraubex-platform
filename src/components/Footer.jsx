import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faYoutube } from "@fortawesome/free-brands-svg-icons";

// Inside your footer JSX
<div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
  <a
    href="https://www.linkedin.com/company/kraubex/?viewAsMember=true"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Kraubex on LinkedIn"
    style={{ color: "#0077b5" }}
  >
    <FontAwesomeIcon icon={faLinkedin} size="2x" />
  </a>
  <a
    href="https://www.youtube.com/watch?v=CXYizymW5h8"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Kraubex on YouTube"
    style={{ color: "#FF0000" }}
  >
    <FontAwesomeIcon icon={faYoutube} size="2x" />
  </a>
</div>

const Footer = () => {
  const handleSubscribe = async (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbxZlvkn1wvasr7yipMXj8K2cjVZertFcU__KuUmaUiQeRRyknqB8dXbbrDmPx86F2jq7Q/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );
      alert("✅ Subscribed successfully!");
      e.target.reset();
    } catch (error) {
      console.error("Subscription error:", error);
      alert("❌ Failed to subscribe. Please try again.");
    }
  };

  return (
    <footer>
      <div className="footer-content">
        <div className="footer-left">
          <p>© 2025 Kraubex. All rights reserved.</p>
          <p>info@kraubex.de | +49 176 73550445 | Bielefeld, Germany</p>
        </div>

        <div className="footer-right">
          <form className="newsletter-form" aria-label="Subscribe to newsletter" onSubmit={handleSubscribe}>
            <p style={{ marginBottom: "0.5rem" }}>Subscribe for early access of KraubexAI</p>
            <input type="email" name="email" placeholder="Your email address" required />
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
            <FontAwesomeIcon icon={faLinkedin} size="1x" />
          </a>
          <a
            href="https://www.youtube.com/watch?v=CXYizymW5h8"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Kraubex on YouTube"
            style={{ margin: "0 10px", color: "#FF0000", fontSize: "1.5rem" }}
          >
            <FontAwesomeIcon icon={faYoutube} size="1x" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
