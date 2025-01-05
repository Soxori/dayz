import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./Pages/home/Home";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer";
import Mods from "./Pages/ModsPage/Mods";

function App() {
  return (
    <div className="App" style={{ marginTop: "10px" }}>
      <Navbar />
      <Routes>
        <Route path="*" element={<Navigate to="/about" replace />} />
        <Route path="/about" element={<Home />} />
        <Route path="/mods" element={<Mods />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
