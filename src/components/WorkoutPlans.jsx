// src/components/WorkoutPlans.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ExerciseModal from './ExerciseModal';
import '../styles/WorkoutPlans.css';

const GymExercises = [
  { id: 1, name: "Bench Press", target: "Chest", tip: "Keep elbows at 45 degrees, control the descent" },
  { id: 2, name: "Incline Dumbbell Press", target: "Chest", tip: "Set bench to 30-45 degrees for upper chest focus" },
  { id: 3, name: "Pull-ups", target: "Back", tip: "Full range of motion, chin over bar at top" },
  { id: 4, name: "Bent-Over Barbell Rows", target: "Back", tip: "Keep back flat, pull with elbows not hands" },
  { id: 5, name: "Barbell Squats", target: "Legs", tip: "Keep chest up, weight on heels, depth to parallel" },
  { id: 6, name: "Romanian Deadlifts", target: "Legs", tip: "Slight knee bend, hinge at hips, feel hamstring stretch" },
  { id: 7, name: "Overhead Barbell Press", target: "Shoulders", tip: "Core tight, press straight up, don't lean back" },
  { id: 8, name: "Dumbbell Lateral Raises", target: "Shoulders", tip: "Lead with elbows, control the descent" },
  { id: 9, name: "Barbell Curls", target: "Arms", tip: "Keep elbows stationary, squeeze at top" },
  { id: 10, name: "Tricep Dips", target: "Arms", tip: "Keep body upright, go deep for full range" },
  { id: 11, name: "Pushups", target: "Chest", tip: "Keep body straight, chest to floor" },
  { id: 12, name: "Cable Flyes", target: "Chest", tip: "Slight elbow bend, squeeze chest at center" },
  { id: 13, name: "Leg Press", target: "Legs", tip: "Feet shoulder-width, don't lock knees at top" },
  { id: 14, name: "Plank", target: "Core", tip: "Hold straight line, engage core, don't sag" }
];

const WorkoutCard = ({ exercise, isAnyWorkoutActive, onStart }) => {
  const isThisWorkoutActive = isAnyWorkoutActive;
  
  return (
    <div 
      className={`
        flex items-center justify-between 
        bg-white/10 backdrop-blur-md 
        border border-white/20 
        rounded-xl 
        p-4 
        transition-all duration-300
        ${isThisWorkoutActive ? 'border-red-500 shadow-lg shadow-red-500/30 opacity-75' : 'hover:bg-white/15'}
      `}
    >
      <div className="flex-1 pr-4">
        <h3 className="text-white font-semibold text-lg mb-1">
          {exercise.name}
        </h3>
        <p className="text-gray-300 text-sm mb-1">
          Target: {exercise.target}
        </p>
        <p className="text-gray-400 text-xs">
          💡 {exercise.tip}
        </p>
      </div>
      <button
        className={`
          font-semibold 
          px-4 py-2 
          rounded-lg 
          text-sm
          transition-all duration-200
          whitespace-nowrap
          ${isThisWorkoutActive 
            ? 'bg-gray-600 text-gray-400 cursor-not-allowed opacity-50' 
            : 'bg-red-500 hover:bg-red-600 text-white hover:scale-105'}
        `}
        onClick={() => onStart(exercise)}
        disabled={isThisWorkoutActive}
      >
        {isThisWorkoutActive ? 'RUNNING' : 'START'}
      </button>
    </div>
  );
};

const WorkoutPlans = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeWorkout, setActiveWorkout] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [workoutStarted, setWorkoutStarted] = useState(false);

  // Get userId from localStorage
  const userId = localStorage.getItem('userId') || '';

  const wpPageBgUrl = 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1600&q=80';

  // Async function to start workout
  const handleStartWorkout = async (exerciseName) => {
    if (!userId) {
      setError('User not logged in. Please login again.');
      setTimeout(() => navigate('/signup'), 2000);
      return;
    }

    setLoading(true);
    setError('');
    setWorkoutStarted(false);

    try {
      const response = await fetch('http://localhost:5000/api/start-workout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          exerciseName: exerciseName
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to start workout');
      }

      // Workout started successfully
      setWorkoutStarted(true);
      console.log('Workout started:', data);
      
      // You can optionally save workout ID to localStorage for tracking
      if (data.workout && data.workout._id) {
        localStorage.setItem('activeWorkoutId', data.workout._id);
      }
    } catch (err) {
      console.error('Error starting workout:', err);
      setError(err.message || 'Unable to start workout. Please try again.');
      
      // Continue opening modal even if API fails (fallback)
      setWorkoutStarted(true);
    } finally {
      setLoading(false);
    }
  };

  const handleStart = async (workout) => {
    // Prevent starting another workout if one is already active
    if (activeWorkout) {
      return;
    }

    // Call the async API function
    await handleStartWorkout(workout.name);

    // If no critical error, open modal
    if (!error) {
      setActiveWorkout(workout);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setActiveWorkout(null);
    setWorkoutStarted(false);
    setError('');
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${wpPageBgUrl})` }}
      />

      {/* Back Button - Absolute positioned top-left */}
      <button 
        className="absolute top-6 left-6 bg-white/10 backdrop-blur-md text-white text-sm px-3 py-1.5 rounded-lg hover:bg-white/20 transition-all z-20"
        onClick={() => navigate('/dashboard')}
      >
        ← BACK
      </button>

      {/* Error Banner */}
      {error && (
        <div className="absolute top-6 right-6 z-20 bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg max-w-md backdrop-blur-md">
          <span className="font-semibold">⚠️ </span>
          {error}
        </div>
      )}

      {/* Main Container */}
      <div className="relative z-10 px-8 max-w-5xl mx-auto pt-20">
        {/* Header - Centered */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-3">
            Gym Training 💪
          </h1>
          <p className="text-gray-300 text-sm tracking-widest uppercase">
            Choose Your Routine
          </p>
        </div>

        {/* Loading Indicator */}
        {loading && (
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 text-white/80">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span className="text-sm">Starting workout...</span>
            </div>
          </div>
        )}

        {/* Workout Started Success Indicator */}
        {workoutStarted && !loading && !error && (
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 text-green-400">
              <span className="text-xl">✓</span>
              <span className="text-sm font-semibold">Workout tracking started!</span>
            </div>
          </div>
        )}

        {/* Exercises Grid - 2 columns with better spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {GymExercises.map((exercise) => (
            <WorkoutCard
              key={exercise.id}
              exercise={exercise}
              isAnyWorkoutActive={activeWorkout !== null}
              onStart={handleStart}
            />
          ))}
        </div>

        {/* Exercise Modal */}
        {activeWorkout && isModalOpen && (
          <ExerciseModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            exerciseName={activeWorkout.name}
            targetMuscle={activeWorkout.target}
          />
        )}
      </div>
    </div>
  );
};

export default WorkoutPlans;