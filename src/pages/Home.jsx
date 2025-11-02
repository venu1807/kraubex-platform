import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/styles.css"; // Adjust path if needed
import KraubexLogo from "../assets/kraubex-logo.png";
import KraubexFlow from "../assets/Kraubex_Flow9.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { Search, BarChart2, Cpu, Plug, ChevronDown } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Home = () => {
  const [navActive, setNavActive] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);

  const toggleNav = () => {
    setNavActive(!navActive);
  };

  const faqs = [
    {
      question: "What is KraubexAI?",
      answer:
        "KraubexAI is an AI-powered procurement orchestration platform that helps MSMEs and local governments manage sourcing, supplier discovery, and purchasing with enterprise-level intelligence and transparency.",
    },
    {
      question: "Who is it for?",
      answer:
        "KraubexAI is built for micro, small, and medium-sized businesses, startups, and local government departments managing procurement for infrastructure, utilities, and services.",
    },
    {
      question: "Why is it needed?",
      answer:
        "Over 350 million MSMEs and thousands of city administrations still rely on manual or fragmented procurement tools. KraubexAI brings them modern, AI-driven sourcing intelligence that was once only available to large enterprises.",
    },
    {
      question: "How does Kraubex protect my business data?",
      answer: "We take data security seriously. Kraubex strictly follows ISO 27001 (information security management), SOC Type 2 (proven operational controls), GDPR (strict European data privacy), and ISO 42001 (responsible AI governance). This means your supplier relationships, contract terms, and spending patterns are protected with the same enterprise-grade security used by major corporations — giving you peace of mind to focus on smarter procurement, not data risks."
    },
    {
      question: "How does it work?",
      answer:
        "KraubexAI connects your procurement data, external supplier networks, and market insights through an AI layer that automates discovery, bid comparison, and collaboration — all within a single workspace.",
    },
    {
      question: "How can I get started?",
      answer: (
        <div className="space-y-4">
          <p className="text-gray-700">
            You can explore KraubexAI directly on our{" "}
            <a
              href="/product"
              className="font-medium"
              style={{ color: "#C04000" }}
              onMouseOver={(e) => (e.target.style.color = "#a33600")}
              onMouseOut={(e) => (e.target.style.color = "#C04000")}
            >
              Product
            </a>{" "}
            page to get hands-on experience, or{" "}
            <a
              href="https://calendly.com/venugopal-achhe/kraubexai-demo"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium"
              style={{ color: "#C04000" }}
              onMouseOver={(e) => (e.target.style.color = "#a33600")}
              onMouseOut={(e) => (e.target.style.color = "#C04000")}
            >
              Book a Demo
            </a>{" "}
            with our team to see how KraubexAI can transform your procurement workflows.
          </p>
        </div>
      ),
    }
  ];

  return (
    <>
      <Header />

      <hr className="full-width-line" />

      <main>
        <section className="hero" aria-labelledby="hero-heading">

          <h1 id="hero-heading" className="text-3xl font-bold leading-tight text-gray-900">
              Welcome to <span className="text-blue-600">Kraubex</span> – Your Smart AI Procurement Assistant
          </h1>

          <p>
            Kraubex helps small and medium-sized businesses buy smarter, faster,
            and with less effort. Our AI assistant helps you find the right suppliers,
            compare prices, automate tasks, and understand your spending. Powered by
            collective intelligence and smart algorithms, Kraubex supports better decisions,
            reduces risks, and saves you time, money, and energy at every step of procurement.
          </p>

          <div className="features">

              <h2 style={{ fontSize: "1.5rem", fontWeight: "700", textAlign: "center", color: "#2c3e50" }}>
                 Benefits of Usage
              </h2>
              <div className="features-grid">

                <div className="feature-card" style={{ textAlign: "center", padding: "2rem" }}>
                  <h3 style={{ display: "inline-flex", alignItems: "center" }}>
                    Supplier Matching & Smart Pricing
                    <Search size={30} style={{ marginLeft: "0.4rem" }} />
                  </h3>
                  <p>AI-powered algorithms match you with the best suppliers based on your specific requirements.</p>
                </div>

                <div className="feature-card" style={{ textAlign: "center", padding: "2rem" }}>
                  <h3 style={{ display: "inline-flex", alignItems: "center" }}>
                    Spend Analytics & Risk Insights
                    <BarChart2 size={30} style={{ marginLeft: "0.4rem" }} />
                  </h3>
                  <p>Gain deep insights into spending patterns and spot risks before they hit.</p>
                </div>

                <div className="feature-card" style={{ textAlign: "center", padding: "2rem" }}>
                  <h3 style={{ display: "inline-flex", alignItems: "center" }}>
                    Workflow Automation
                    <Cpu size={30} style={{ marginLeft: "0.4rem" }} />
                  </h3>
                  <p>Automate procurement tasks to reduce manual work and accelerate decisions.</p>
                </div>

                <div className="feature-card" style={{ textAlign: "center", padding: "2rem" }}>
                  <h3 style={{ display: "inline-flex", alignItems: "center" }}>
                    ERP Integration
                    <Plug size={30} style={{ marginLeft: "0.4rem" }} />
                  </h3>
                  <p>Integrate easily with your ERP for a unified procurement experience.</p>
                </div>
              </div>
          </div>


          <section className="media-section">
            <div className="media-item flow-container">
              <h2 style={{ fontSize: "1.5rem", fontWeight: "700", textAlign: "center", color: "#2c3e50" }}>
                 How Kraubex Works
              </h2>
              <img src={KraubexFlow} alt="Kraubex Flow Diagram" loading="lazy" />
            </div>

            <div className="media-item video-container">
              <iframe
                src="https://www.youtube.com/embed/oZwiUsd5Zvs"
                title="Kraubex Introduction Video"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </section>

          <div className="cta">
            <h2 style={{ fontSize: "1.5rem", fontWeight: "700", textAlign: "center", color: "#2c3e50" }}>
                 Join the Kraubex Community Today
            </h2>
            <Link to="/product" className="btn btn-primary">
                Try Kraubex Free
            </Link>
          </div>
        </section>
      </main>

      {/* --- FAQ SECTION --- */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-6">Frequently Asked Questions</h2>

        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
          KraubexAI empowers{" "}
          <span className="font-semibold text-gray-800">MSMEs</span> and{" "}
          <span className="font-semibold text-gray-800">Local Governments</span> to
          digitize and orchestrate their procurement workflows — from supplier discovery
          to compliance.
        </p>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-gray-200 rounded-2xl bg-white shadow-sm">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex justify-between items-center w-full px-5 py-4 text-left"
              >
                <span className="font-medium text-gray-900">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === i ? "max-h-60 px-5 pb-4" : "max-h-0"
                }`}
              >
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="full-width-line" />

      <Footer />
    </>
  );
};

export default Home;
