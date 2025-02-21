import React, { useEffect, useState } from "react";

const Dashboard = ({ isAuthenticated }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  if (!isAuthenticated) {
    return <h2>🔒 Access Denied. Please Sign In.</h2>;
  }

  return (
    <div>
      <h2>Welcome to the Dashboard</h2>
      {user ? <p>👋 Hello, {user.username}!</p> : <p>Loading...</p>}
    </div>
  );
};

export default Dashboard;
