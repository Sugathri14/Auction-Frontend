import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();

    // Store user data in localStorage
    localStorage.setItem("user", JSON.stringify({ username, password }));

    setMessage("✅ Signup successful! You can now sign in.");
    setTimeout(() => navigate("/signin"), 1500);
  };

  return (
    <div>
      <h2>Sign Up</h2>
      {message && <p style={{ color: "green" }}>{message}</p>}
      <form onSubmit={handleSignUp}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
