// src/components/streakService.js

export const updateStreak = () => {
  const today = new Date().toDateString();
  const lastDate = localStorage.getItem('lastActivityDate');
  let currentStreak = parseInt(localStorage.getItem('streakCount') || '0');

  if (lastDate !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (lastDate === yesterday.toDateString()) {
      currentStreak += 1;
    } else {
      currentStreak = 1;
    }
    
    localStorage.setItem('streakCount', currentStreak);
    localStorage.setItem('lastActivityDate', today);
  }
  return currentStreak;
};