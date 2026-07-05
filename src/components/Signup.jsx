import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Auth.css';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters!');
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch('https://fitnova-backend-vv6q.onrender.com/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Signup failed');

      localStorage.setItem('userId', data.user._id);
      navigate('/profile-setup');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>FIT<span>NOVA</span></h1>
        
        {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
        
        <form onSubmit={handleSignup} className="auth-form">
          <input 
            type="text" 
            name="fullName" 
            placeholder="Full Name" 
            required 
            onChange={handleChange} 
            className="auth-input" 
          />
          <input 
            type="email" 
            name="email" 
            placeholder="Email" 
            required 
            onChange={handleChange} 
            className="auth-input" 
          />
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            required 
            onChange={handleChange} 
            className="auth-input" 
          />
          <button 
            type="submit" 
            className="auth-button" 
            disabled={loading}
          >
            {loading ? 'Processing...' : 'SIGN UP'}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Login Now</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;