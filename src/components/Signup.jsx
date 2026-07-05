import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Auth.css';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long!');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://fitnova-backend-vv6q.onrender.com/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          email: formData.email.trim(),
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Signup failed. Please try again.');
      }

      // LocalStorage mein data sahi se store karein
      localStorage.setItem('userName', data.user.fullName);
      localStorage.setItem('userEmail', data.user.email);
      // Backend se jo id aati hai wo '_id' hoti hai
      localStorage.setItem('userId', data.user._id || data.user.id);
      localStorage.setItem('profileComplete', String(data.user.profileComplete || false));

      navigate('/profile-setup');
    } catch (err) {
      console.error('Signup error:', err);
      setError(err.message || 'Unable to connect to server. Please check your backend.');
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

        {error && <p style={{ color: 'red', fontSize: '12px' }}>{error}</p>}

        <form onSubmit={handleSignup}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            className="auth-input"
            required
            value={formData.fullName}
            onChange={handleChange}
          />

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
            placeholder="Password (Min 6 chars)"
            className="auth-input"
            required
            value={formData.password}
            onChange={handleChange}
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