import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ProfileSetup.css';

const ProfileSetup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ weight: '', height: '', fitnessGoal: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  // Fix: Initial load par check karein ki user logged in hai ya nahi
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    // Agar userId null hai, "undefined" string hai, ya empty hai, toh redirect karein
    if (!userId || userId === "undefined" || userId === "" || userId === "null") {
      navigate('/signup');
    }
  }, [navigate]);

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
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const userId = localStorage.getItem('userId');
    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://fitnova-backend-vv6q.onrender.com/api/profile-setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userId,
          weight: parseFloat(formData.weight),
          height: parseFloat(formData.height),
          fitnessGoal: formData.fitnessGoal
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to setup profile');
      }

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
          {error && <div className="error-banner" style={{color: 'red'}}>⚠️ {error}</div>}
          {success && <div className="success-banner" style={{color: 'green'}}>✓ Profile saved!</div>}
          
          <input type="number" name="weight" value={formData.weight} onChange={handleChange} placeholder="Weight (kg)" className="form-input" />
          {validationErrors.weight && <span style={{color: 'red', fontSize: '10px'}}>{validationErrors.weight}</span>}
          
          <input type="number" name="height" value={formData.height} onChange={handleChange} placeholder="Height (cm)" className="form-input" />
          {validationErrors.height && <span style={{color: 'red', fontSize: '10px'}}>{validationErrors.height}</span>}
          
          <select name="fitnessGoal" value={formData.fitnessGoal} onChange={handleChange} className="form-select">
            <option value="">Select your goal</option>
            <option value="Muscle Gain">Muscle Gain</option>
            <option value="Weight Loss">Weight Loss</option>
            <option value="Stay Fit">Stay Fit</option>
          </select>
          {validationErrors.fitnessGoal && <span style={{color: 'red', fontSize: '10px'}}>{validationErrors.fitnessGoal}</span>}
          
          <button type="submit" disabled={loading} className="auth-button">
            {loading ? 'Saving...' : 'SAVE & CONTINUE →'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileSetup;