import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flame, Heart, Activity, Trophy } from 'lucide-react';
import { getActivityData } from './SportsActivity';

const TrackProgress = () => {
  const navigate = useNavigate();
  
  // State for real data
  const [activities, setActivities] = useState([]);
  const [todayCalories, setTodayCalories] = useState(0);
  const [weeklyCalories, setWeeklyCalories] = useState([]);
  const [currentWeekDays, setCurrentWeekDays] = useState([]);
  const [totalStreak, setTotalStreak] = useState(0);
  
  const DAILY_GOAL = 2000; // 2000 kcal daily goal

  // Load activity data from localStorage - runs on mount AND when manually triggered
  const loadActivities = () => {
    const data = getActivityData();
    setActivities(data);
    calculateStats(data);
    console.log('📊 Loaded activities:', data.length);
    console.log('🔥 Activities:', data);
  };

  useEffect(() => {
    loadActivities();
    
    // ALSO check for new data every 2 seconds (refresh while on page)
    const interval = setInterval(() => {
      const newData = getActivityData();
      if (newData.length !== activities.length) {
        console.log('🔄 New activity detected! Refreshing...');
        loadActivities();
      }
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  // Calculate consecutive streak with unique day logic
  const calculateConsecutiveStreak = (data) => {
    if (data.length === 0) return 0;
    
    // Get unique dates with activities (only 1 activity per day counts)
    const uniqueDates = [...new Set(data.map(act => act.date.split('T')[0]))]
      .sort()
      .reverse();
    
    console.log('📅 Unique dates:', uniqueDates);
    
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    
    // Get the most recent date with activity
    const lastActivityDate = uniqueDates[0];
    
    // Calculate yesterday's date
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    
    console.log('📍 Today:', todayStr);
    console.log('📍 Yesterday:', yesterdayStr);
    console.log('📍 Last activity:', lastActivityDate);
    
    // Check if streak is broken (no activity today AND no activity yesterday)
    if (lastActivityDate !== todayStr && lastActivityDate !== yesterdayStr) {
      console.log('❌ Streak broken - no activity today or yesterday');
      return 0;
    }
    
    // Count consecutive days backwards from the last activity date
    let streak = 0;
    let checkDate = new Date(lastActivityDate);
    
    while (true) {
      const dateStr = checkDate.toISOString().split('T')[0];
      
      if (uniqueDates.includes(dateStr)) {
        streak++;
        // Move to previous day
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        // Gap found - streak ends here
        break;
      }
      
      // Safety limit - don't check more than 365 days
      if (streak >= 365) break;
    }
    
    console.log('🔥 Calculated streak:', streak);
    return streak;
  };

  // Calculate current week (Monday to Sunday)
  const getCurrentWeekDays = () => {
    const today = new Date();
    const currentDay = today.getDay(); // 0 = Sunday, 1 = Monday
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    // Calculate Monday of current week
    const monday = new Date(today);
    monday.setDate(today.getDate() - (currentDay === 0 ? 6 : currentDay - 1));
    
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const dayDate = new Date(monday);
      dayDate.setDate(monday.getDate() + i);
      const dateStr = dayDate.toISOString().split('T')[0];
      
      weekDays.push({
        day: dayNames[dayDate.getDay()],
        date: dateStr,
        isToday: i === currentDay || (currentDay === 0 && i === 6)
      });
    }
    
    return weekDays;
  };

  // Calculate daily and weekly stats
  const calculateStats = (data) => {
    // Get today's date (YYYY-MM-DD)
    const today = new Date().toISOString().split('T')[0];
    
    // Filter today's activities
    const todayActivities = data.filter(act => 
      act.date.startsWith(today)
    );
    
    console.log('📅 Today activities:', todayActivities);
    
    // Calculate total calories today
    const totalToday = todayActivities.reduce((sum, act) => sum + act.calories, 0);
    setTodayCalories(totalToday);
    
    // Calculate current week days
    const weekDays = getCurrentWeekDays();
    setCurrentWeekDays(weekDays);
    
    // Calculate last 7 days calories for bar chart
    const last7Days = [];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const dayName = dayNames[date.getDay()];
      
      // Sum calories for this date
      const dayCalories = data
        .filter(act => act.date.startsWith(dateStr))
        .reduce((sum, act) => sum + act.calories, 0);
      
      last7Days.push({ day: dayName, calories: dayCalories });
    }
    
    setWeeklyCalories(last7Days);
    
    // Calculate consecutive streak (unique day logic)
    const streak = calculateConsecutiveStreak(data);
    setTotalStreak(streak);
  };

  // Calculate daily goals percentage
  const dailyGoalPercentage = Math.min(Math.round((todayCalories / DAILY_GOAL) * 100), 100);

  // Mock vitals (can be replaced with real data later)
  const bpm = 72;
  const oxygen = 98;

  // Pulse animation for vitals
  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(prev => !prev);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // Calculate max calories for bar chart scaling
  const maxCalories = Math.max(...weeklyCalories.map(d => d.calories), 1);

  // Check for milestone rewards
  const getMilestoneInfo = (streak) => {
    if (streak >= 100) {
      return { reached: true, icon: '🏆', color: 'text-yellow-400', message: '100-Day Legend!' };
    } else if (streak >= 60) {
      return { reached: true, icon: '🏆', color: 'text-orange-400', message: '60-Day Champion!' };
    } else if (streak >= 30) {
      return { reached: true, icon: '🏅', color: 'text-yellow-400', message: '30-Day Warrior!' };
    }
    return { reached: false, icon: '', color: '', message: '' };
  };

  const milestoneInfo = getMilestoneInfo(totalStreak);

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      {/* Back Button - FIXED: Navigate to /dashboard instead of / */}
      <button 
        className="absolute top-6 left-6 bg-white/5 backdrop-blur-md text-white text-sm px-4 py-2 rounded-lg hover:bg-white/10 transition-all border border-white/10"
        onClick={() => navigate('/dashboard')}
      >
        ← BACK TO DASHBOARD
      </button>

      {/* Main Container */}
      <div className="relative z-10 px-8 max-w-6xl mx-auto pt-20 pb-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-3">
            Track Progress 📊
          </h1>
          <p className="text-gray-400 text-sm tracking-widest uppercase">
            Your Fitness Journey
          </p>
        </div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: Daily Goals - Neon Cyan Glow */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 relative overflow-hidden group">
            {/* Neon Glow */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ 
                boxShadow: '0 0 40px rgba(6, 182, 212, 0.3)',
                background: 'radial-gradient(circle at center, rgba(6, 182, 212, 0.1) 0%, transparent 70%)'
              }}
            />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Daily Goals</h2>
                <Activity className="text-cyan-400 w-8 h-8" />
              </div>
              
              {/* Circular Progress Bar */}
              <div className="flex items-center justify-center mb-6">
                <div className="relative w-48 h-48">
                  {/* Background Circle */}
                  <svg className="w-48 h-48 transform -rotate-90">
                    <circle
                      cx="96"
                      cy="96"
                      r="88"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="12"
                      fill="none"
                    />
                    {/* Progress Circle with Neon Cyan */}
                    <circle
                      cx="96"
                      cy="96"
                      r="88"
                      stroke="#06b6d4"
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={2 * Math.PI * 88}
                      strokeDashoffset={2 * Math.PI * 88 * (1 - dailyGoalPercentage / 100)}
                      strokeLinecap="round"
                      className="transition-all duration-1000 ease-out"
                      style={{ 
                        filter: 'drop-shadow(0 0 8px rgba(6, 182, 212, 0.8))',
                        strokeLinejoin: 'round'
                      }}
                    />
                  </svg>
                  
                  {/* Center Text */}
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-5xl font-bold text-white">{dailyGoalPercentage}%</span>
                    <span className="text-gray-400 text-sm mt-2">Completed</span>
                  </div>
                </div>
              </div>
              
              {/* Real Stats */}
              <div className="text-center">
                <p className="text-3xl font-bold text-white mb-1">
                  {todayCalories} <span className="text-lg text-gray-400">kcal</span>
                </p>
                <p className="text-gray-300 text-lg">
                  of {DAILY_GOAL} kcal goal
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Vitals - Neon Pink Glow */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 relative overflow-hidden group">
            {/* Neon Glow */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ 
                boxShadow: '0 0 40px rgba(236, 72, 153, 0.3)',
                background: 'radial-gradient(circle at center, rgba(236, 72, 153, 0.1) 0%, transparent 70%)'
              }}
            />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Vitals</h2>
                <Heart className="text-pink-400 w-8 h-8" />
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                {/* BPM */}
                <div className="bg-white/5 rounded-xl p-6 text-center">
                  <div className={`mb-3 transition-all duration-500 ${pulse ? 'scale-110' : 'scale-100'}`}>
                    <Heart className={`w-10 h-10 mx-auto ${pulse ? 'text-red-500' : 'text-pink-400'}`}
                      style={{ filter: pulse ? 'drop-shadow(0 0 12px rgba(239, 68, 68, 0.8))' : 'none' }}
                    />
                  </div>
                  <p className="text-4xl font-bold text-white mb-1">{bpm}</p>
                  <p className="text-gray-400 text-xs uppercase tracking-wider">BPM</p>
                </div>
                
                {/* Oxygen */}
                <div className="bg-white/5 rounded-xl p-6 text-center">
                  <div className={`mb-3 transition-all duration-500 ${pulse ? 'scale-110' : 'scale-100'}`}>
                    <svg className={`w-10 h-10 mx-auto ${pulse ? 'text-cyan-500' : 'text-blue-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"
                      style={{ filter: pulse ? 'drop-shadow(0 0 12px rgba(6, 182, 212, 0.8))' : 'none' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <p className="text-4xl font-bold text-white mb-1">{oxygen}%</p>
                  <p className="text-gray-400 text-xs uppercase tracking-wider">Oxygen</p>
                </div>
              </div>
              
              <p className="text-center text-gray-300 text-lg mt-6">
                All vitals normal ✅
              </p>
            </div>
          </div>

          {/* Card 3: Consistency - Streak with Unique Day Logic */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 relative overflow-hidden group">
            {/* Neon Glow - Gold when milestone reached */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ 
                boxShadow: milestoneInfo.reached 
                  ? '0 0 40px rgba(250, 204, 21, 0.4)' 
                  : '0 0 40px rgba(220, 38, 38, 0.3)',
                background: milestoneInfo.reached
                  ? 'radial-gradient(circle at center, rgba(250, 204, 21, 0.15) 0%, transparent 70%)'
                  : 'radial-gradient(circle at center, rgba(220, 38, 38, 0.1) 0%, transparent 70%)'
              }}
            />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Consistency</h2>
                <div className="flex items-center gap-2">
                  {milestoneInfo.reached && (
                    <Trophy className={milestoneInfo.color} w-6 h-6 />
                  )}
                  <Flame 
                    className={`w-8 h-8 transition-all duration-300 ${milestoneInfo.color || 'text-red-500'}`} 
                    style={{ filter: 'drop-shadow(0 0 8px rgba(220, 38, 38, 0.8))' }} 
                  />
                </div>
              </div>
              
              {/* Total Streak Display */}
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <p className="text-6xl font-bold text-white">{totalStreak}</p>
                  {milestoneInfo.reached && (
                    <span className={`text-2xl ${milestoneInfo.color}`}>{milestoneInfo.icon}</span>
                  )}
                </div>
                <p className="text-2xl font-semibold text-red-400 mb-1">
                  Day Streak! 🔥
                </p>
                {milestoneInfo.reached && (
                  <p className={`text-lg font-bold ${milestoneInfo.color} mb-2`}>
                    {milestoneInfo.message}
                  </p>
                )}
                <p className="text-gray-400 text-sm">
                  {totalStreak === 0 
                    ? 'Complete your first activity to start!' 
                    : totalStreak >= 365 
                      ? 'UNSTOPPABLE! 🚀' 
                      : 'Keep the momentum going'}
                </p>
              </div>
              
              {/* Rolling 7-Day Week View (Monday to Sunday) */}
              <div className="flex items-center justify-between gap-2">
                {currentWeekDays.map((dayData, index) => {
                  const hasActivity = activities.some(act => 
                    act.date.startsWith(dayData.date)
                  );
                  
                  return (
                    <div key={index} className="flex flex-col items-center">
                      <div 
                        className={`
                          w-10 h-10 rounded-lg flex items-center justify-center mb-2 
                          transition-all duration-300
                          ${hasActivity 
                            ? 'bg-[#dc2626] shadow-lg' 
                            : 'bg-white/5'
                          }
                          ${hasActivity ? 'hover:scale-110' : ''}
                        `}
                        style={hasActivity ? { boxShadow: '0 0 12px rgba(220, 38, 38, 0.5)' } : {}}
                      >
                        {hasActivity ? (
                          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <span className="text-gray-600 text-xs font-semibold">{dayData.day}</span>
                        )}
                      </div>
                      <span className="text-gray-500 text-xs">{dayData.day}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Card 4: Activity Stats - Bar Chart with Solid Red #dc2626 */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 relative overflow-hidden group">
            {/* Neon Glow */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ 
                boxShadow: '0 0 40px rgba(220, 38, 38, 0.3)',
                background: 'radial-gradient(circle at center, rgba(220, 38, 38, 0.1) 0%, transparent 70%)'
              }}
            />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Activity Stats</h2>
                <Activity className="text-red-500 w-8 h-8" />
              </div>
              
              <p className="text-gray-400 text-sm mb-6">Calories Burned (Last 7 Days)</p>
              
              {/* Bar Chart - REAL DATA from localStorage */}
              <div className="flex items-end justify-between h-48 gap-2">
                {weeklyCalories.length > 0 ? weeklyCalories.map((data, index) => {
                  const barHeight = weeklyCalories.some(d => d.calories > 0) 
                    ? (data.calories / maxCalories) * 100 
                    : 0;
                  return (
                    <div key={index} className="flex-1 flex flex-col items-center gap-2">
                      {/* Bar */}
                      <div 
                        className="w-full bg-[#dc2626] rounded-t-lg transition-all duration-500 hover:opacity-80"
                        style={{ 
                          height: `${Math.max(barHeight, 2)}%`,
                          boxShadow: data.calories > 0 ? '0 0 12px rgba(220, 38, 38, 0.6)' : 'none',
                          opacity: data.calories > 0 ? 1 : 0.3
                        }}
                      />
                      {/* Day Label */}
                      <span className="text-gray-400 text-xs">{data.day}</span>
                      {/* Calorie Value */}
                      <span className="text-white text-xs font-semibold">{data.calories}</span>
                    </div>
                  );
                }) : (
                  // Empty state when no data
                  <div className="flex-1 flex flex-col items-center gap-2">
                    <div 
                      className="w-full bg-white/5 rounded-t-lg"
                      style={{ height: '5%' }}
                    />
                    <span className="text-gray-400 text-xs">No Data</span>
                  </div>
                )}
              </div>
              
              {/* Total Summary */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Weekly Total</span>
                  <span className="text-2xl font-bold text-white">
                    {weeklyCalories.reduce((acc, curr) => acc + curr.calories, 0).toLocaleString()} <span className="text-red-400 text-lg">kcal</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TrackProgress;