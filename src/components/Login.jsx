import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
    // Naya:
const response = await fetch('https://fitnova-backend-vv6q.onrender.com/api/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('userId', data.user.id);
        localStorage.setItem('userName', data.user.fullName);
        localStorage.setItem('userEmail', data.user.email);
        localStorage.setItem('profileComplete', String(data.user.profileComplete));

        if (data.user.profileComplete) {
          navigate('/dashboard');
        } else {
          navigate('/profile-setup');
        }
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Server se connect nahi ho paya. Backend check karo.');
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-card">
        <h1>
          <span style={{ color: '#f0e5e5' }}>FIT</span>
          <span style={{ color: '#8B2E2E' }}>NOVA</span>
        </h1>

        {error && <p style={{ color: 'red', fontSize: '12px' }}>{error}</p>}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="auth-input"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="auth-input"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="auth-button">
            Login Now
          </button>
          <p>Don't have an account? <Link to="/signup">Sign Up here</Link></p>
        </form>

        <p>
          Naye ho? <Link to="/signup">Signup karo</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;