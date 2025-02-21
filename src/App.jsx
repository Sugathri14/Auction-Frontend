import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Dashboard from "./components/Dashboard";
import AuctionItem from "./components/AuctionItem";
import PostAuction from "./components/PostAuction";
import Landing from "./components/Landing";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ✅ Check localStorage for authentication when app loads
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(token === "true"); // Convert to boolean
  }, []);

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="app">
        <header>
          <h1>Auction App</h1>
          <nav>
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/signup" className="nav-link">Signup</Link>
            <Link to="/signin" className="nav-link">Signin</Link>
            {isAuthenticated && <Link to="/dashboard" className="nav-link">Dashboard</Link>}
            <Link to="/post-auction" className="nav-link">Post Auction</Link>
            {isAuthenticated && <button className="logout-button" onClick={handleLogout}>Logout</button>}
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/dashboard" element={<Dashboard isAuthenticated={isAuthenticated} />} />
            <Route path="/auction/:id" element={<AuctionItem />} />
            <Route path="/post-auction" element={isAuthenticated ? <PostAuction /> : <Signin />} />
          </Routes>
        </main>

        <footer>
          <p>&copy; 2024 Auction App. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
