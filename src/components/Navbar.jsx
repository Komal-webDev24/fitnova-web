import React from 'react';
import '../styles/Navbar.css';

function Navbar({ email, onLogout }) {
  const displayName = email.split('@')[0];

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <div className="nav-logo-icon">🏃</div>
        <span className="nav-logo-text">FitNova</span>
      </div>
      <div className="nav-right">
        <span className="nav-greeting">Hey, {displayName} 👋</span>
        <button className="btn-logout" onClick={onLogout}>Sign out</button>
      </div>
    </nav>
  );
}

export default Navbar;