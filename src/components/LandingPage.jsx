import React from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen w-full overflow-hidden font-sans bg-black">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop')`, 
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center text-white">
        
        {/* NEW CLEAN LOGO (No "H" Error) */}
        <div className="flex flex-col items-center mb-10">
          <svg width="100" height="80" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="fitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7a1616" />
                <stop offset="100%" stopColor="#c5c5c5" />
              </linearGradient>
            </defs>
            <path 
              d="M35 25 H65 M35 25 V75 M35 50 H55" 
              stroke="url(#fitGradient)" 
              strokeWidth="10" 
              strokeLinecap="round" 
              fill="none" 
            />
            <path d="M25 85 Q50 75 75 85" stroke="#881f1f" strokeWidth="4" strokeLinecap="round" fill="none" />
          </svg>
          
          <h1 className="text-5xl font-extrabold tracking-tighter mt-2">
            Fit<span style={{ color: '#912b33f6' }}>Nova</span>
          </h1>
          <p className="text-gray-400 text-xs tracking-[0.3em] uppercase mt-2">
            AchieveMore | Your Personalized Health Guide
          </p>
        </div>

        {/* Text Section */}
        <div className="max-w-xl mb-12">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
            Transform Your <span className="text-orange-400">Body & Mind</span>
          </h2>
          <p className="text-gray-300 text-lg">
            Thousand of fitness classes, gyms, and wellness, all in one app.
          </p>
        </div>

        {/* Start Button */}
        <button 
          onClick={() => navigate('/login')}
          className="bg-white text-black font-extrabold py-4 px-12 rounded-full text-xl hover:bg-orange-500 hover:text-white transition-all shadow-xl"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

// YEH LINE SABSE ZARURI HAI (Missing thi isliye error aa raha tha)
export default LandingPage;