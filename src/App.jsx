import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Pricing from "./pages/Pricing.jsx";
import KraubexSidebar from "./pages/KraubexSidebar.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/product" element={<KraubexSidebar />} />
      </Routes>
    </Router>
  );
}
