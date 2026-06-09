// src/components/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  
  // User data state
  const [userName, setUserName] = useState('User');
  const [userStats, setUserStats] = useState({
    weight: null,
    height: null,
    fitnessGoal: null,
    bmi: null
  });
  
  // Loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statsError, setStatsError] = useState('');

  // Get userId from localStorage
  const userId = localStorage.getItem('userId') || '';

  // Fetch user data from API
  useEffect(() => {
    if (!userId) {
      navigate('/signup');
      return;
    }

    const fetchUserData = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await fetch(`http://localhost:5000/api/user/${userId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        
        // Set user name
        if (data.user && data.user.fullName) {
          setUserName(data.user.fullName);
          localStorage.setItem('userName', data.user.fullName);
        }

        // Set user stats
        if (data.user) {
          setUserStats({
            weight: data.user.weight,
            height: data.user.height,
            fitnessGoal: data.user.fitnessGoal,
            bmi: data.user.bmi || calculateBMI(data.user.weight, data.user.height)
          });
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Unable to load user data. Showing cached values.');
        
        // Fallback: Use localStorage values
        const cachedWeight = localStorage.getItem('userWeight');
        const cachedHeight = localStorage.getItem('userHeight');
        const cachedGoal = localStorage.getItem('userGoal');
        const cachedName = localStorage.getItem('userName');

        if (cachedName) setUserName(cachedName);
        if (cachedWeight || cachedHeight) {
          setUserStats({
            weight: cachedWeight ? parseFloat(cachedWeight) : null,
            height: cachedHeight ? parseFloat(cachedHeight) : null,
            fitnessGoal: cachedGoal || null,
            bmi: calculateBMI(cachedWeight ? parseFloat(cachedWeight) : null, cachedHeight ? parseFloat(cachedHeight) : null)
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId, navigate]);

  // Calculate BMI helper
  const calculateBMI = (weight, height) => {
    if (!weight || !height) return null;
    
    // Height in meters
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    return bmi.toFixed(1);
  };

  // Get BMI category
  const getBMICategory = (bmi) => {
    if (!bmi) return null;
    
    const bmiValue = parseFloat(bmi);
    if (bmiValue < 18.5) return { text: 'Underweight', color: '#ffc107' };
    if (bmiValue < 25) return { text: 'Normal', color: '#00db8b' };
    if (bmiValue < 30) return { text: 'Overweight', color: '#ff9800' };
    return { text: 'Obese', color: '#ff4757' };
  };

  // Get greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'GOOD MORNING';
    if (hour < 18) return 'GOOD AFTERNOON';
    return 'GOOD EVENING';
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  // Dashboard sections
  const dashboardSections = [
    { 
      id: 1, 
      icon: '💪', 
      title: 'Workout Plans', 
      desc: 'Pushups, Strength & More', 
      path: '/workouts',
      bgImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: 2, 
      icon: '📈', 
      title: 'Track Progress', 
      desc: 'Calories & Weekly Goals', 
      path: '/progress',
      bgImage: 'https://images.unsplash.com/photo-1596357395104-ba989e72b5ec?auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: 3, 
      icon: '⚽', 
      title: 'Sports Activity', 
      desc: 'Football, Yoga, Cycling', 
      path: '/sports',
      bgImage: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: 4, 
      icon: '🍎', 
      title: 'Diet & Meal', 
      desc: 'Meal Plans & Hydration', 
      path: '/diet',
      bgImage: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80'
    },
  ];

  const bmiCategory = getBMICategory(userStats.bmi);

  return (
    <div className="dashboard-container">
      {/* Header Area */}
      <div className="dashboard-header">
        <div className="header-content">
          <p className="greeting">{getGreeting()}</p>
          <h1 className="user-name">{userName.toUpperCase()} 👋</h1>
        </div>
        <button 
          onClick={handleLogout}
          className="logout-btn"
        >
          LOGOUT
        </button>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="error-banner" role="alert">
          <span className="error-icon">⚠️</span>
          {error}
        </div>
      )}

      {/* User Stats Block */}
      <div className="stats-card">
        <div className="stats-header">
          <h2 className="stats-title">Your Stats</h2>
          {loading && <span className="loading-text">Loading...</span>}
        </div>
        
        {loading ? (
          <div className="stats-loading">
            <div className="skeleton-loader"></div>
            <div className="skeleton-loader"></div>
            <div className="skeleton-loader"></div>
          </div>
        ) : (
          <div className="stats-grid">
            {/* Weight Card */}
            <div className="stat-card">
              <div className="stat-icon">⚖️</div>
              <div className="stat-info">
                <p className="stat-label">Weight</p>
                <p className="stat-value">
                  {userStats.weight ? `${userStats.weight} kg` : 'Not set'}
                </p>
              </div>
            </div>

            {/* Height Card */}
            <div className="stat-card">
              <div className="stat-icon">📏</div>
              <div className="stat-info">
                <p className="stat-label">Height</p>
                <p className="stat-value">
                  {userStats.height ? `${userStats.height} cm` : 'Not set'}
                </p>
              </div>
            </div>

            {/* BMI Card */}
            <div className="stat-card">
              <div className="stat-icon">📊</div>
              <div className="stat-info">
                <p className="stat-label">BMI</p>
                <p className="stat-value" style={{ color: bmiCategory?.color || '#888' }}>
                  {userStats.bmi ? userStats.bmi : 'N/A'}
                </p>
                {bmiCategory && (
                  <p className="stat-subtext" style={{ color: bmiCategory.color }}>
                    {bmiCategory.text}
                  </p>
                )}
              </div>
            </div>

            {/* Goal Card */}
            <div className="stat-card">
              <div className="stat-icon">🎯</div>
              <div className="stat-info">
                <p className="stat-label">Goal</p>
                <p className="stat-value">
                  {userStats.fitnessGoal || 'Not set'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2x2 Grid Area */}
      <div className="dashboard-grid">
        {dashboardSections.map((section) => (
          <div 
            key={section.id} 
            className="dashboard-card"
            onClick={() => navigate(section.path)}
          >
            <div 
              className="card-background"
              style={{ backgroundImage: `url(${section.bgImage})` }}
            />
            <div className="card-content">
              <div className="card-icon">{section.icon}</div>
              <div className="card-text">
                <h3 className="card-title">{section.title}</h3>
                <p className="card-desc">{section.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;