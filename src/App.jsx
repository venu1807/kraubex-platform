import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Pricing from "./pages/Pricing.jsx";
import Academy from "./pages/Academy.jsx";
import KraubexSidebar from "./pages/KraubexSidebar.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Core SPA routes */}
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/product" element={<KraubexSidebar />} />
        <Route path="/academy" element={<Academy />} />

        {/* 🔁 Redirect old .html URLs to SPA paths */}
        <Route path="/product.html" element={<Navigate to="/product" replace />} />
        <Route path="/academy.html" element={<Navigate to="/academy" replace />} />
        <Route path="/pricing.html" element={<Navigate to="/pricing" replace />} />

        {/* Optional: Catch-all route (redirects to home if unknown path) */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
