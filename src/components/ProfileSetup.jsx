// src/pages/ProfileSetup.jsx
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

  // Get userId from localStorage (set after login/signup)
  const userId = localStorage.getItem('userId') || '';

  // Redirect if user not logged in
  useEffect(() => {
    if (!userId) {
      navigate('/signup');
    }
  }, [userId, navigate]);

  // Input sanitization helper
  const sanitizeInput = (value) => {
    if (typeof value === 'string') {
      return value.trim().replace(/[<>]/g, ''); // Prevent XSS
    }
    return value;
  };

  // Validation helper
  const validateForm = () => {
    const errors = {};
    
    if (!formData.weight || formData.weight <= 0) {
      errors.weight = 'Weight must be greater than 0';
    } else if (formData.weight > 500) {
      errors.weight = 'Weight cannot exceed 500 kg';
    }
    
    if (!formData.height || formData.height <= 0) {
      errors.height = 'Height must be greater than 0';
    } else if (formData.height > 300) {
      errors.height = 'Height cannot exceed 300 cm';
    }
    
    if (!formData.fitnessGoal) {
      errors.fitnessGoal = 'Please select a fitness goal';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = sanitizeInput(value);
    
    setFormData(prev => ({
      ...prev,
      [name]: sanitizedValue
    }));
    
    // Clear error for this field
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('http://localhost:5000/api/profile-setup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: sanitizeInput(userId),
          weight: parseFloat(formData.weight),
          height: parseFloat(formData.height),
          fitnessGoal: sanitizeInput(formData.fitnessGoal)
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Failed to setup profile');
      }

      // Save to localStorage
      localStorage.setItem('userWeight', formData.weight);
      localStorage.setItem('userHeight', formData.height);
      localStorage.setItem('userGoal', formData.fitnessGoal);
      localStorage.setItem('profileComplete', 'true');
      
      setSuccess(true);
      
      // Redirect to dashboard after success
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (err) {
      setError(err.message || 'Unable to connect to server. Please try again.');
      console.error('Profile setup error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-setup-container">
      <div className="profile-setup-card">
        <div className="profile-setup-header">
          <div className="logo">🏋️</div>
          <h1 className="setup-title">Set Your Fitness Goals</h1>
          <p className="setup-subtitle">Personalize your journey with your body metrics</p>
        </div>

        <form onSubmit={handleSubmit} className="profile-setup-form">
          {error && (
            <div className="error-banner" role="alert">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}

          {success && (
            <div className="success-banner" role="alert">
              <span className="success-icon">✓</span>
              Profile saved successfully! Redirecting...
            </div>
          )}

          <div className="form-group">
            <label htmlFor="weight" className="form-label">
              Weight <span className="required">*</span>
            </label>
            <div className="input-wrapper">
              <input
                type="number"
                id="weight"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                placeholder="70"
                className={`form-input ${validationErrors.weight ? 'input-error' : ''}`}
                min="1"
                max="500"
                step="0.1"
                disabled={loading || success}
                aria-describedby={validationErrors.weight ? 'weight-error' : undefined}
              />
              <span className="input-unit">kg</span>
            </div>
            {validationErrors.weight && (
              <span className="field-error" id="weight-error">
                {validationErrors.weight}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="height" className="form-label">
              Height <span className="required">*</span>
            </label>
            <div className="input-wrapper">
              <input
                type="number"
                id="height"
                name="height"
                value={formData.height}
                onChange={handleChange}
                placeholder="175"
                className={`form-input ${validationErrors.height ? 'input-error' : ''}`}
                min="1"
                max="300"
                step="0.1"
                disabled={loading || success}
                aria-describedby={validationErrors.height ? 'height-error' : undefined}
              />
              <span className="input-unit">cm</span>
            </div>
            {validationErrors.height && (
              <span className="field-error" id="height-error">
                {validationErrors.height}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="fitnessGoal" className="form-label">
              Fitness Goal <span className="required">*</span>
            </label>
            <div className="select-wrapper">
              <select
                id="fitnessGoal"
                name="fitnessGoal"
                value={formData.fitnessGoal}
                onChange={handleChange}
                className={`form-select ${validationErrors.fitnessGoal ? 'input-error' : ''}`}
                disabled={loading || success}
                aria-describedby={validationErrors.fitnessGoal ? 'goal-error' : undefined}
              >
                <option value="">Select your goal</option>
                <option value="Muscle Gain">💪 Muscle Gain</option>
                <option value="Weight Loss">🔥 Weight Loss</option>
                <option value="Stay Fit">⚖️ Stay Fit</option>
              </select>
              <span className="select-arrow">▼</span>
            </div>
            {validationErrors.fitnessGoal && (
              <span className="field-error" id="goal-error">
                {validationErrors.fitnessGoal}
              </span>
            )}
          </div>

          <button 
            type="submit" 
            className={`submit-btn ${loading || success ? 'btn-disabled' : ''}`}
            disabled={loading || success}
          >
            {loading ? (
              <>
                <span className="loader"></span>
                Saving...
              </>
            ) : success ? (
              <>
                <span className="checkmark">✓</span>
                Saved!
              </>
            ) : (
              'SAVE & CONTINUE →'
            )}
          </button>
        </form>

        <div className="profile-setup-footer">
          <p>Already set up your profile? <a href="/dashboard">Go to Dashboard</a></p>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;