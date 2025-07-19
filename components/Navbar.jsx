import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="navbar-title">
        <span role="img" aria-label="app">📝</span> Comment Manager SPA
      </h1>
      <p className="navbar-subtitle">Powered by JSONPlaceholder API</p>
    </nav>
  );
};

export default Navbar;
