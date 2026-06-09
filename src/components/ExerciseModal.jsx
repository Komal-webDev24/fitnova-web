import React, { useState, useEffect } from 'react';

const ExerciseModal = ({ isOpen, onClose, exerciseName, targetMuscle }) => {
  const [modalState, setModalState] = useState('idle');
  const [countdown, setCountdown] = useState(3);
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    if (isOpen) {
      setModalState('idle');
      setCountdown(3);
      setTimer(60);
    }
  }, [isOpen]);

  // Countdown and Timer logic remains the same...
  useEffect(() => {
    let interval = null;
    if (modalState === 'countdown' && countdown > 0) {
      interval = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    } else if (modalState === 'countdown' && countdown === 0) {
      setModalState('timer');
    }
    return () => clearInterval(interval);
  }, [modalState, countdown]);

  useEffect(() => {
    let interval = null;
    if (modalState === 'timer' && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (modalState === 'timer' && timer === 0) {
      setModalState('completed');
    }
    return () => clearInterval(interval);
  }, [modalState, timer]);

  // --- NEW UPDATED HANDLE FINISH LOGIC ---
  const handleFinish = async () => {
    const workoutId = localStorage.getItem('activeWorkoutId');
    
    if (workoutId) {
      try {
      // Aise update karo:
const response = await fetch('http://localhost:5000/api/end-workout', { // yahan /api/end-workout likho
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
        userId: localStorage.getItem('userId'), // Backend ko ye zaroori hai
        workoutId: workoutId,                   // ID yahan bhejo
        duration: 60 - timer                    // duration yahan bhejo
    }),
});

        if (response.ok) {
          console.log("Workout successfully updated in MongoDB!");
        }
      } catch (err) {
        console.error("Error updating workout to database:", err);
      }
    }

    setModalState('idle');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 max-w-md w-full mx-4 text-center shadow-2xl">
        
        {/* State rendering (Countdown, Timer, Paused, Completed, Idle) */}
        {modalState === 'countdown' && (
          <div className="py-12">
            <h2 className="text-2xl font-bold text-white mb-8">Get Ready!</h2>
            <div className="text-9xl font-bold text-white animate-pulse">{countdown > 0 ? countdown : 'GO!'}</div>
          </div>
        )}

        {modalState === 'timer' && (
          <div className="py-8">
            <h2 className="text-3xl font-bold text-white mb-4">{exerciseName}</h2>
            <div className="text-7xl font-bold text-white font-mono mb-8">
              {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
            </div>
            <button className="bg-red-500 hover:bg-red-600 text-white font-bold px-8 py-3 rounded-lg w-full" onClick={() => setModalState('paused')}>Pause</button>
          </div>
        )}

        {modalState === 'paused' && (
          <div className="py-8">
            <h2 className="text-4xl font-bold text-yellow-400 mb-8">Paused</h2>
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-3 rounded-lg w-full" onClick={() => setModalState('timer')}>Resume</button>
          </div>
        )}

        {modalState === 'completed' && (
          <div className="py-8">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-4xl font-bold text-green-400 mb-4">Well Done!</h2>
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-3 rounded-lg" onClick={handleFinish}>Finish</button>
          </div>
        )}

        {modalState === 'idle' && (
          <div className="py-6">
            <h2 className="text-3xl font-bold text-white mb-4">Start {exerciseName}</h2>
            <button className="bg-red-500 text-white font-bold px-8 py-3 rounded-lg w-full mb-4" onClick={() => setModalState('countdown')}>Start Exercise</button>
            <button className="bg-white/20 text-white font-semibold px-8 py-3 rounded-lg w-full" onClick={onClose}>Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExerciseModal;