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

const ProtectedRoute = ({ children, requireProfileComplete = true }) => {
  const userId = localStorage.getItem('userId');
  const profileComplete = localStorage.getItem('profileComplete');

  if (!userId) {
    return <Navigate to="/login" replace />;
  }

  if (requireProfileComplete && profileComplete !== 'true') {
    return <Navigate to="/profile-setup" replace />;
  }

  return children;
};

const PublicRoute = ({ children }) => {
  const userId = localStorage.getItem('userId');
  const profileComplete = localStorage.getItem('profileComplete');

  if (userId) {
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

        <Route path="/welcome" element={<WelcomeScreen />} />

        <Route
          path="/profile-setup"
          element={
            <ProtectedRoute requireProfileComplete={false}>
              <ProfileSetup />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute requireProfileComplete={true}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

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

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;