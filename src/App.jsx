// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Signup from './components/Signup';
import WelcomeScreen from './components/WelcomeScreen';
import Dashboard from './components/Dashboard';
import WorkoutPlans from './components/WorkoutPlans';
import SportsActivity from './components/SportsActivity';
import DietPlanDashboard from './components/DietPlanDashboard';
import TrackProgress from './components/TrackProgress';
import ProfileSetup from './components/ProfileSetup';

// Protected Route Component
const ProtectedRoute = ({ children, requireProfileComplete = true }) => {
  const userId = localStorage.getItem('userId');
  const profileComplete = localStorage.getItem('profileComplete');

  // Check if user is logged in
  if (!userId) {
    return <Navigate to="/signup" replace />;
  }

  // Check if profile is complete (only for routes that require it)
  if (requireProfileComplete && profileComplete !== 'true') {
    return <Navigate to="/profile-setup" replace />;
  }

  return children;
};

// Public Route Component (for login/signup - redirect if already logged in)
const PublicRoute = ({ children }) => {
  const userId = localStorage.getItem('userId');

  if (userId) {
    const profileComplete = localStorage.getItem('profileComplete');
    return profileComplete === 'true' ? (
      <Navigate to="/dashboard" replace />
    ) : (
      <Navigate to="/profile-setup" replace />
    );
  }

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes - Accessible to everyone */}
        <Route path="/" element={<LandingPage />} />
        
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />

        {/* Welcome Screen - Public (users can access after signup before profile setup) */}
        <Route path="/welcome" element={<WelcomeScreen />} />

        {/* Profile Setup - Requires login but NOT profile completion */}
        <Route
          path="/profile-setup"
          element={
            <ProtectedRoute requireProfileComplete={false}>
              <ProfileSetup />
            </ProtectedRoute>
          }
        />

        {/* Protected Routes - Require login AND profile completion */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute requireProfileComplete={true}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Feature Routes - All protected, require profile completion */}
        <Route
          path="/workouts"
          element={
            <ProtectedRoute requireProfileComplete={true}>
              <WorkoutPlans />
            </ProtectedRoute>
          }
        />

        <Route
          path="/sports"
          element={
            <ProtectedRoute requireProfileComplete={true}>
              <SportsActivity />
            </ProtectedRoute>
          }
        />

        <Route
          path="/progress"
          element={
            <ProtectedRoute requireProfileComplete={true}>
              <TrackProgress />
            </ProtectedRoute>
          }
        />

        <Route
          path="/diet"
          element={
            <ProtectedRoute requireProfileComplete={true}>
              <DietPlanDashboard />
            </ProtectedRoute>
          }
        />

        {/* Catch-all: Redirect unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;