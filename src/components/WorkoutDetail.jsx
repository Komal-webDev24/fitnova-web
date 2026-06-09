import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, CheckCircle, X } from 'lucide-react';

const WorkoutDetail = () => {
  const [isTraining, setIsTraining] = useState(false);
  const [timeLeft, setTimeLeft] = useState(45); // 45 seconds ka timer
  const [showSuccess, setShowSuccess] = useState(false);

  // Timer Logic
  useEffect(() => {
    let timer;
    if (isTraining && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTraining(false);
      setShowSuccess(true);
    }
    return () => clearInterval(timer);
  }, [isTraining, timeLeft]);

  const startTask = () => {
    setTimeLeft(45);
    setIsTraining(true);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white p-6 relative overflow-hidden">
      <h1 className="text-2xl font-bold mb-6 text-center">TRAINING ZONE</h1>

      {/* Workout Card (Simplified for logic) */}
      <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center space-y-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-extrabold text-orange-500">Diamond Pushups</h2>
          <p className="text-gray-400 italic">"Do 15 reps in 45 seconds!"</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={startTask}
          className="bg-gradient-to-r from-orange-500 to-purple-500 px-8 py-4 rounded-2xl font-bold shadow-lg shadow-orange-500/20 flex items-center gap-3 mx-auto"
        >
          <Play size={20} fill="currentColor" /> Accept & Start
        </motion.button>
      </div>

      {/* --- OVERLAYS --- */}

      {/* 1. Active Timer Screen */}
      <AnimatePresence>
        {isTraining && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-center p-6"
          >
            <h2 className="text-orange-500 text-6xl font-black mb-4 tracking-tighter italic">GO! GO!</h2>
            <div className="relative flex items-center justify-center">
                {/* Circular Progress */}
              <div className="w-48 h-48 border-8 border-white/10 rounded-full flex items-center justify-center">
                <span className="text-7xl font-mono font-bold">{timeLeft}s</span>
              </div>
            </div>
            <p className="mt-8 text-gray-400 text-xl font-medium">Keep Pushing! You're doing great 🔥</p>
            
            <button 
              onClick={() => setIsTraining(false)}
              className="mt-12 text-gray-500 flex items-center gap-2 hover:text-white transition-colors"
            >
              <X size={20} /> Stop Session
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Success Screen */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-orange-500"
          >
            <div className="text-center space-y-6">
              <CheckCircle size={100} className="mx-auto text-white animate-bounce" />
              <h2 className="text-5xl font-black text-white">CHALLENGE DONE!</h2>
              <p className="text-white/80 text-xl font-medium">You just burned ~120 kcal. Incredible!</p>
              <button 
                onClick={() => setShowSuccess(false)}
                className="bg-white text-orange-500 px-10 py-4 rounded-2xl font-bold text-lg shadow-xl"
              >
                Back to Training
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WorkoutDetail;