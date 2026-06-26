import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Auth.css';

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      alert('Password must be at least 6 characters long!');
      return;
    }

    setLoading(true);

    try {
    // Purana: const response = await fetch('http://localhost:5000/api/register', ...
// Naya:
const response = await fetch('https://fitnova-backend-vv6q.onrender.com/api/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
});

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('userName', data.user.fullName);
        localStorage.setItem('userEmail', data.user.email);
        localStorage.setItem('userId', data.user.id);
        localStorage.setItem('profileComplete', String(data.user.profileComplete));

        navigate('/profile-setup');
      } else {
        alert(data.error || 'Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Unable to connect to server. Please check if your Backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-card">
        <h1 className="brand-name" style={{ fontSize: '32px', fontWeight: '900', letterSpacing: '1px' }}>
          FIT<span style={{ color: '#8B2E2E' }}>NOVA</span>
        </h1>

        <p style={{ color: '#666', fontSize: '10px', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '40px' }}>
          CREATE ACCOUNT
        </p>

        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Full Name"
            className="auth-input"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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
            placeholder="Password (Min 6 chars)"
            className="auth-input"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Creating Account...' : 'Get Started'}
          </button>
        </form>

        <p style={{ marginTop: '30px', fontSize: '12px', color: '#e0d1d1', fontWeight: 'bold' }}>
          Already have an account? <Link to="/login" style={{ color: '#ac5050' }}>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;