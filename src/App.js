import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/home/Home";
import Navbar from "./Components/Navbar/Navbar";

function App() {
  return (
    <div className="App" style={{ marginTop: "10px" }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
