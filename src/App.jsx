import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Homepage";
import Kortex from "./pages/Kortex";
import "./Apps.css";

function App() {
  return (
    <div >
        <Router>
              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/Kortex" element={<Kortex />}></Route>
             </Routes>
          
        </Router>
      </div>
  );
}

export default App;
