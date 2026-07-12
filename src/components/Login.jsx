import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('https://fitnova-backend-vv6q.onrender.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email.trim(),
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      localStorage.setItem('userId', data.user._id);
      localStorage.setItem('userName', data.user.fullName);
      localStorage.setItem('userEmail', data.user.email);
      localStorage.setItem('profileComplete', String(data.user.profileComplete));

      if (data.user.profileComplete) {
        navigate('/dashboard');
      } else {
        navigate('/profile-setup');
      }
    } catch (err) {
      setError(err.message || 'Server error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container auth-page">
      <div className="auth-card">
        <h1>
          <span style={{ color: '#111827' }}>FIT</span>
          <span style={{ color: '#8B2E2E' }}>NOVA</span>
        </h1>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleLogin} className="auth-form">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="auth-input"
            required
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="auth-input"
            required
            value={formData.password}
            onChange={handleChange}
          />

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="auth-footer">
          Don&apos;t have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;