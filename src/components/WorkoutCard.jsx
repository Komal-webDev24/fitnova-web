// src/WorkoutCard.jsx
import React from "react";

const WorkoutCard = ({ exercise, onStart, isActive }) => {
  return (
    <div
      className="flex items-center justify-between rounded-xl bg-white/10 p-4 backdrop-blur-md transition hover:bg-white/15"
      style={{
        border: isActive ? "1px solid #EF4444" : "1px solid transparent",
      }}
    >
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{exercise.name}</h3>
        <p className="text-sm text-gray-300">
          Target: <span className="font-medium">{exercise.target}</span>
        </p>
        <p className="text-xs text-gray-400">Tip: {exercise.tip}</p>
      </div>

      <button
        className="ml-4 rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-lg transition hover:bg-red-600"
        onClick={onStart}
        disabled={isActive}
      >
        START
      </button>
    </div>
  );
};

export default WorkoutCard;