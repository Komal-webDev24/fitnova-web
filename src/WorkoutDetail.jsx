import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Flame, Timer, Trophy, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const WorkoutCard = ({ title, icon, reps, cal, challenge, color, delay }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="relative h-48 w-full [perspective:1000px] mb-4">
      <motion.div
        className="relative h-full w-full transition-all duration-500 [transform-style:preserve-3d] cursor-pointer"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* FRONT SIDE */}
        <div className="absolute inset-0 h-full w-full rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl [backface-visibility:hidden]">
          <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-xl bg-${color}-500/20 text-${color}-400`}>
              {icon}
            </div>
            <span className="text-xs font-bold text-white/30 uppercase tracking-tighter">Tap to Flip</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
          <div className="flex gap-4 text-sm text-white/50">
            <span className="flex items-center gap-1"><Timer size={14} /> {reps}</span>
            <span className="flex items-center gap-1"><Flame size={14} /> {cal} kcal</span>
          </div>
        </div>

        {/* BACK SIDE (Mini Challenge) */}
        <div 
          className="absolute inset-0 h-full w-full rounded-2xl border-2 p-5 [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col justify-center items-center text-center"
          style={{ borderColor: color, background: `${color}11` }}
        >
          <Trophy className="mb-2" style={{ color: color }} />
          <h4 className="text-lg font-bold text-white mb-1">Mini Challenge!</h4>
          <p className="text-sm text-white/70 mb-4">{challenge}</p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="px-4 py-2 rounded-full text-xs font-bold text-black"
            style={{ backgroundColor: color }}
          >
            Accept & Start
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default function WorkoutDetail() {
  const navigate = useNavigate();

  const exercises = [
    { title: "Diamond Pushups", reps: "3 Sets x 12", cal: "120", challenge: "Do 15 reps in 45 seconds!", color: "#a78bfa", icon: "💪" },
    { title: "Morning Sprint", reps: "20 Mins", cal: "350", challenge: "Maintain 12km/h for 5 mins!", color: "#f97316", icon: "🏃" },
    { title: "Plank Hold", reps: "5 Mins", cal: "80", challenge: "Add 30s to your personal best!", color: "#38bdf8", icon: "🧘" }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0c] p-6 pb-24 font-sans text-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button onClick={() => navigate("/dashboard")} className="p-2 rounded-xl bg-white/5 border border-white/10 text-white/60">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-bold uppercase tracking-widest">Training Zone</h1>
        <div className="w-10" /> {/* Spacer */}
      </div>

      {/* Progress Section */}
      <div className="mb-8 p-6 rounded-3xl bg-gradient-to-br from-purple-500/20 to-orange-500/10 border border-white/10 relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-xs text-white/50 uppercase mb-1">Today's Intensity</p>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-4xl font-black italic">72%</span>
            <span className="text-sm text-green-400 font-bold">+5% from yesterday</span>
          </div>
          <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }} 
              animate={{ width: "72%" }} 
              transition={{ duration: 1.5 }}
              className="h-full bg-gradient-to-r from-purple-500 to-orange-500 shadow-[0_0_15px_rgba(167,139,250,0.5)]" 
            />
          </div>
        </div>
      </div>

      {/* Workout Cards */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-white/40 uppercase mb-4 tracking-widest">Selected Exercises</h2>
        {exercises.map((ex, i) => (
          <WorkoutCard key={i} {...ex} delay={i * 0.1} />
        ))}
      </div>

      {/* Complete Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="fixed bottom-8 left-6 right-6 py-4 rounded-2xl bg-white text-black font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(255,255,255,0.2)]"
      >
        <CheckCircle2 size={18} /> Finish Training
      </motion.button>
    </div>
  );
}