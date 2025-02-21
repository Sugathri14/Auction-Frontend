import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signin = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();

    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      setMessage("❌ No user found. Please sign up first.");
      return;
    }

    const { username: savedUsername, password: savedPassword } = JSON.parse(storedUser);

    if (savedUsername.toLowerCase() === username.toLowerCase() && savedPassword === password) {
      setMessage("✅ Login successful!");

      // ✅ Store auth state in localStorage
      localStorage.setItem("authToken", "true");

      // ✅ Update authentication state in App
      setIsAuthenticated(true);

      // ✅ Redirect to dashboard immediately
      navigate("/dashboard");
    } else {
      setMessage("❌ Invalid credentials. Please try again.");
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      {message && <p style={{ color: message.includes("❌") ? "red" : "green" }}>{message}</p>}
      <form onSubmit={handleSignIn}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default Signin;
