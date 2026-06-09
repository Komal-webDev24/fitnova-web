// src/components/MainLayout.jsx
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Dumbbell, Activity, User } from 'lucide-react';

const MainLayout = () => {
  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Home' },
    { path: '/workouts', icon: Dumbbell, label: 'Workouts' },
    { path: '/progress', icon: Activity, label: 'Progress' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0c]">
      {/* Main Content Area */}
      <div className="pb-20">
        <Outlet />
      </div>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50">
        <div className="backdrop-blur-xl bg-black/40 border-t border-white/10 shadow-2xl">
          <div className="flex items-center justify-around px-4 py-3">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex flex-col items-center gap-1 transition-all duration-300 ${
                    isActive
                      ? 'text-orange-500 scale-110'
                      : 'text-gray-400 hover:text-orange-400/70'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                    <span className="text-xs font-medium">{item.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="bottomNavIndicator"
                        className="absolute -top-3 w-8 h-0.5 bg-gradient-to-r from-orange-500 to-purple-500 rounded-full"
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default MainLayout;