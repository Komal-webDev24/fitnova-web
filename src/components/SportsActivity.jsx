import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Helper function to save activity data to localStorage
export const saveActivityData = (activityName, calories, duration, bpm) => {
  const newActivity = {
    activityName,
    calories: parseFloat(calories.toFixed(1)),
    duration,
    bpm,
    date: new Date().toISOString()
  };

  // Get existing activities or initialize empty array
  const existingActivities = JSON.parse(localStorage.getItem('fitnova_activities') || '[]');
  
  // Add new activity to the array
  existingActivities.push(newActivity);
  
  // Save back to localStorage
  localStorage.setItem('fitnova_activities', JSON.stringify(existingActivities));
  
  console.log('✅ Activity saved to localStorage:', newActivity);
  console.log('📦 Total activities:', existingActivities.length);
  return newActivity;
};

// Helper function to get all activities from localStorage
export const getActivityData = () => {
  return JSON.parse(localStorage.getItem('fitnova_activities') || '[]');
};

const SportsActivities = [
  { id: 1, name: "Running", icon: "🏃", category: "Cardio" },
  { id: 2, name: "Cycling", icon: "🚴", category: "Cardio" },
  { id: 3, name: "Walking", icon: "🚶", category: "Cardio" },
  { id: 4, name: "Yoga", icon: "🧘", category: "Flexibility" },
  { id: 5, name: "Swimming", icon: "🏊", category: "Cardio" },
  { id: 6, name: "Climbing", icon: "🧗", category: "Strength" },
  { id: 7, name: "Basketball", icon: "🏀", category: "Sports" },
  { id: 8, name: "Football", icon: "⚽", category: "Sports" },
  { id: 9, name: "Badminton", icon: "🏸", category: "Sports" },
  { id: 10, name: "Rope Skipping", icon: "🪢", category: "Cardio" },
  // NEW: Strength Training Activities
  { id: 11, name: "Pull-ups", icon: "💪", category: "Strength" },
  { id: 12, name: "Push-ups", icon: "🤸", category: "Strength" },
  { id: 13, name: "Squats", icon: "🦵", category: "Strength" },
  { id: 14, name: "Deadlifts", icon: "🏋️", category: "Strength" },
  { id: 15, name: "Bench Press", icon: "🛌", category: "Strength" }
];

const ActivityCard = ({ activity, isAnyActivityActive, onStart }) => {
  const isThisActivityActive = isAnyActivityActive;
  
  return (
    <div 
      className={`
        flex items-center justify-between 
        bg-white/10 backdrop-blur-md 
        border border-white/20 
        rounded-xl 
        p-4
        transition-all duration-300
        ${isThisActivityActive ? 'border-red-500 shadow-lg shadow-red-500/30 opacity-75' : 'hover:bg-white/15'}
      `}
    >
      {/* Left Section */}
      <div className="flex items-center gap-4 flex-1">
        {/* Icon Badge */}
        <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl bg-red-500 shadow-lg">
          {activity.icon}
        </div>
        
        {/* Activity Info */}
        <div className="flex-1">
          <h3 className="text-white font-semibold text-lg mb-1">
            {activity.name}
          </h3>
          <p className="text-gray-300 text-sm mb-1">
            {activity.category}
          </p>
          
          {/* Stats Placeholder */}
          <div className="flex gap-3">
            <div className="bg-white/5 rounded-lg px-2 py-1">
              <p className="text-gray-500 text-xs">BPM</p>
              <p className="text-white text-sm font-semibold">--</p>
            </div>
            <div className="bg-white/5 rounded-lg px-2 py-1">
              <p className="text-gray-500 text-xs">Kcal</p>
              <p className="text-white text-sm font-semibold">--</p>
            </div>
            <div className="bg-white/5 rounded-lg px-2 py-1">
              <p className="text-gray-500 text-xs">Min</p>
              <p className="text-white text-sm font-semibold">--</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Track Button - EXACT RED #dc2626 as FitNova brand */}
      <button
        className={`
          font-semibold 
          px-4 py-2 
          rounded-lg 
          text-sm
          transition-all duration-200
          whitespace-nowrap
          ${isThisActivityActive 
            ? 'bg-gray-600 text-gray-400 cursor-not-allowed opacity-50' 
            : 'bg-[#dc2626] hover:bg-red-600 text-white hover:scale-105'}
        `}
        onClick={() => onStart(activity)}
        disabled={isThisActivityActive}
      >
        {isThisActivityActive ? 'TRACKING' : 'TRACK NOW'}
      </button>
    </div>
  );
};

const SportsActivityModal = ({ isOpen, onClose, activity }) => {
  const navigate = useNavigate();
  const [modalState, setModalState] = useState('idle');
  const [countdown, setCountdown] = useState(3);
  const [timer, setTimer] = useState(0);
  const [bpm, setBpm] = useState(0);
  const [kcal, setKcal] = useState(0);

  // Reset modal state when opened
  useEffect(() => {
    if (isOpen) {
      setModalState('idle');
      setCountdown(3);
      setTimer(0);
      setBpm(0);
      setKcal(0);
    }
  }, [isOpen]);

  // Countdown timer logic (3-2-1-GO!)
  useEffect(() => {
    let interval = null;
    if (modalState === 'countdown' && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (modalState === 'countdown' && countdown === 0) {
      setModalState('tracking');
    }
    return () => clearInterval(interval);
  }, [modalState, countdown]);

  // Timer and stats logic (only runs when tracking)
  useEffect(() => {
    let interval = null;
    if (modalState === 'tracking') {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
        setBpm((prev) => {
          const randomBpm = Math.floor(Math.random() * 20) + 120;
          return prev === 0 ? randomBpm : prev;
        });
        setKcal((prev) => prev + 0.1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [modalState]);

  const handleStartActivity = () => {
    setModalState('countdown');
    setCountdown(3);
  };

  const handlePause = () => {
    setModalState('paused');
  };

  const handleResume = () => {
    setModalState('tracking');
  };

  const handleFinish = () => {
    setModalState('completed');
  };

  const handleClose = () => {
    setModalState('idle');
    onClose();
  };

  if (!isOpen) return null;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = Math.min((timer / 60) * 100, 100);

  // FIXED: Handles saving data to localStorage before clearing states and navigating
  const handleDone = () => {
    console.log('🎯 Saving activity:', activity?.name);
    console.log('📊 Calories:', kcal);
    console.log('⏱️ Duration:', formatTime(timer));
    console.log('❤️ BPM:', bpm);
    
    // 1. Sabse pehle data ko save karo helper function ka use karke
    saveActivityData(
      activity?.name || 'Unknown',
      kcal,
      formatTime(timer),
      bpm || 0
    );
    
    // 2. Modal ki local state ko reset karo
    setModalState('idle');
    
    // 3. 100ms ka chhota sa delay do taaki safe navigation ho sake bina data lost huye
    setTimeout(() => {
      onClose(); // Parent state clear karega
      navigate('/dashboard'); // Dashboard par bhejega
    }, 100);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 max-w-md w-full mx-4 text-center shadow-2xl">
        
        {/* Countdown State - 3-2-1-GO! */}
        {modalState === 'countdown' && (
          <div className="py-12">
            <div className="text-6xl mb-6">{activity?.icon}</div>
            <h2 className="text-2xl font-bold text-white mb-2">Get Ready!</h2>
            <p className="text-gray-300 mb-8">{activity?.name}</p>
            <div className="text-9xl font-bold text-white animate-pulse">
              {countdown > 0 ? countdown : 'GO!'}
            </div>
          </div>
        )}

        {/* Tracking State - Live Stats with Pause button */}
        {modalState === 'tracking' && (
          <div className="py-6">
            <div className="text-6xl mb-4">{activity?.icon}</div>
            <h2 className="text-3xl font-bold text-white mb-4">{activity?.name}</h2>
            <p className="text-gray-300 mb-8">Target: {activity?.category}</p>
            
            {/* Timer Display */}
            <div className="text-7xl font-bold text-white font-mono mb-8">
              {formatTime(timer)}
            </div>
            
            {/* Live Stats Grid */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md">
                <p className="text-gray-400 text-xs mb-1">BPM</p>
                <p className="text-2xl font-bold text-white">{bpm > 0 ? bpm : '--'}</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md">
                <p className="text-gray-400 text-xs mb-1">Kcal</p>
                <p className="text-2xl font-bold text-white">{kcal > 0 ? kcal.toFixed(1) : '--'}</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md">
                <p className="text-gray-400 text-xs mb-1">Min</p>
                <p className="text-2xl font-bold text-white">{timer > 0 ? (timer / 60).toFixed(1) : '--'}</p>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-white/20 rounded-full h-3 mb-6 overflow-hidden">
              <div 
                className="bg-green-500 h-3 rounded-full transition-all duration-1000"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            
            {/* Pause Button - RED #dc2626 */}
            <button
              className="bg-[#dc2626] hover:bg-red-600 text-white font-bold px-8 py-3 rounded-lg text-lg transition-all hover:scale-105 w-full mb-3"
              onClick={handlePause}
            >
              Pause
            </button>
            
            {/* Finish Button */}
            <button
              className="bg-white/20 hover:bg-white/30 text-white font-semibold px-8 py-3 rounded-lg text-lg transition-all w-full"
              onClick={handleFinish}
            >
              Finish
            </button>
          </div>
        )}

        {/* Paused State */}
        {modalState === 'paused' && (
          <div className="py-6">
            <div className="text-6xl mb-4">{activity?.icon}</div>
            <h2 className="text-4xl font-bold text-yellow-400 mb-2">Paused</h2>
            <p className="text-gray-300 mb-6">{activity?.name}</p>
            
            {/* Timer Display (Frozen) */}
            <div className="text-7xl font-bold text-white font-mono mb-8">
              {formatTime(timer)}
            </div>
            
            {/* Stats (Frozen) */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md">
                <p className="text-gray-400 text-xs mb-1">BPM</p>
                <p className="text-2xl font-bold text-white">{bpm}</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md">
                <p className="text-gray-400 text-xs mb-1">Kcal</p>
                <p className="text-2xl font-bold text-white">{kcal.toFixed(1)}</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md">
                <p className="text-gray-400 text-xs mb-1">Min</p>
                <p className="text-2xl font-bold text-white">{(timer / 60).toFixed(1)}</p>
              </div>
            </div>
            
            {/* Progress Bar (Frozen) */}
            <div className="w-full bg-white/20 rounded-full h-3 mb-6 overflow-hidden">
              <div 
                className="bg-yellow-500 h-3 rounded-full"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            
            {/* Resume Button - GREEN */}
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-3 rounded-lg text-lg transition-all hover:scale-105 w-full mb-3"
              onClick={handleResume}
            >
              Resume
            </button>
            
            {/* Finish Button */}
            <button
              className="bg-white/20 hover:bg-white/30 text-white font-semibold px-8 py-3 rounded-lg text-lg transition-all w-full"
              onClick={handleFinish}
            >
              Finish
            </button>
          </div>
        )}

        {/* Completed State */}
        {modalState === 'completed' && (
          <div className="py-6">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-4xl font-bold text-green-400 mb-4">Well Done!</h2>
            <p className="text-xl text-white mb-2">{activity?.name}</p>
            <p className="text-gray-300 mb-8">You completed {formatTime(timer)}!</p>
            
            {/* Final Stats */}
            <div className="bg-white/10 rounded-xl p-6 mb-8 backdrop-blur-md">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-gray-400 text-xs mb-1">Duration</p>
                  <p className="text-2xl font-bold text-white">{formatTime(timer)}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-1">Kcal</p>
                  <p className="text-2xl font-bold text-white">{kcal.toFixed(1)}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-1">Avg BPM</p>
                  <p className="text-2xl font-bold text-white">{bpm}</p>
                </div>
              </div>
            </div>
            
            {/* Done Button - Saves Data to localStorage THEN navigates to dashboard */}
            <button
              className="bg-[#dc2626] hover:bg-red-600 text-white font-bold px-8 py-3 rounded-lg text-lg transition-all hover:scale-105 w-full"
              onClick={handleDone}
            >
              Done ✓
            </button>
          </div>
        )}

        {/* Idle State - Start Button */}
        {modalState === 'idle' && (
          <div className="py-6">
            <div className="text-7xl mb-6">{activity?.icon}</div>
            <h2 className="text-3xl font-bold text-white mb-4">Start Activity</h2>
            <p className="text-xl text-gray-300 mb-2">{activity?.name}</p>
            <p className="text-gray-400 mb-8">Category: {activity?.category}</p>
            
            <button
              className="bg-[#dc2626] hover:bg-red-600 text-white font-bold px-8 py-3 rounded-lg text-lg mb-4 transition-all hover:scale-105 w-full"
              onClick={handleStartActivity}
            >
              Start Activity
            </button>
            <button
              className="bg-white/20 hover:bg-white/30 text-white font-semibold px-8 py-3 rounded-lg text-lg transition-all w-full"
              onClick={handleClose}
            >
              Cancel
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

const SportsActivity = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeActivity, setActiveActivity] = useState(null);

  const wpPageBgUrl = 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1600&q=80';

  const handleStart = (activity) => {
    // Prevent starting another activity if one is already active
    if (activeActivity) {
      return;
    }
    
    setActiveActivity(activity);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setActiveActivity(null);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0a0a]">
      {/* Background Image - Same as Gym page with dark overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${wpPageBgUrl})` }}
      />
      
      {/* Dark overlay to match FitNova theme */}
      <div className="absolute inset-0 bg-[#0a0a0a]/80" />

      {/* Back Button - FIXED: Navigate to /dashboard instead of / */}
      <button 
        className="absolute top-6 left-6 bg-white/10 backdrop-blur-md text-white text-sm px-3 py-1.5 rounded-lg hover:bg-white/20 transition-all border border-white/10"
        onClick={() => navigate('/dashboard')}
      >
        ← BACK
      </button>

      {/* Main Container */}
      <div className="relative z-10 px-8 max-w-5xl mx-auto pt-20">
        {/* Header - Centered (same as Gym page) */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-3">
            Sports Activity 💪
          </h1>
          <p className="text-gray-300 text-sm tracking-widest uppercase">
            Choose Your Routine
          </p>
        </div>

        {/* Activities Grid - 2 columns (same as Gym page) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SportsActivities.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              isAnyActivityActive={activeActivity !== null}
              onStart={handleStart}
            />
          ))}
        </div>

        {/* Activity Modal */}
        {activeActivity && isModalOpen && (
          <SportsActivityModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            activity={activeActivity}
          />
        )}
      </div>
    </div>
  );
};

export default SportsActivity;