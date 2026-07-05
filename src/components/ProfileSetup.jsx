import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ProfileSetup.css';

const ProfileSetup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    weight: '',
    height: '',
    fitnessGoal: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (!userId) {
      navigate('/signup');
    }
  }, [userId, navigate]);

  const sanitizeInput = (value) => {
    return typeof value === 'string' ? value.trim().replace(/[<>]/g, '') : value;
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.weight || formData.weight <= 0) errors.weight = 'Weight must be greater than 0';
    if (!formData.height || formData.height <= 0) errors.height = 'Height must be greater than 0';
    if (!formData.fitnessGoal) errors.fitnessGoal = 'Please select a fitness goal';
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: sanitizeInput(value) }));
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError('');
    
    try {
      const storedUserId = localStorage.getItem('userId');
      if (!storedUserId) throw new Error("User session expired! Please login again.");

      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL || 'https://fitnova-backend-vv6q.onrender.com'}/api/profile-setup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: storedUserId,
          weight: parseFloat(formData.weight),
          height: parseFloat(formData.height),
          fitnessGoal: formData.fitnessGoal
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to setup profile');

      localStorage.setItem('userWeight', formData.weight);
      localStorage.setItem('profileComplete', 'true');
      setSuccess(true);
      
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-setup-container">
      <div className="profile-setup-card">
        <h1 className="setup-title">Set Your Fitness Goals</h1>
        <form onSubmit={handleSubmit} className="profile-setup-form">
          {error && <div className="error-banner">⚠️ {error}</div>}
          {success && <div className="success-banner">✓ Profile saved!</div>}
          
          <input type="number" name="weight" value={formData.weight} onChange={handleChange} placeholder="Weight (kg)" className="form-input" />
          {validationErrors.weight && <span>{validationErrors.weight}</span>}
          
          <input type="number" name="height" value={formData.height} onChange={handleChange} placeholder="Height (cm)" className="form-input" />
          {validationErrors.height && <span>{validationErrors.height}</span>}
          
          <select name="fitnessGoal" value={formData.fitnessGoal} onChange={handleChange} className="form-select">
            <option value="">Select your goal</option>
            <option value="Muscle Gain">Muscle Gain</option>
            <option value="Weight Loss">Weight Loss</option>
            <option value="Stay Fit">Stay Fit</option>
          </select>
          
          <button type="submit" disabled={loading}>{loading ? 'Saving...' : 'SAVE & CONTINUE →'}</button>
        </form>
      </div>
    </div>
  );
};

export default ProfileSetup;