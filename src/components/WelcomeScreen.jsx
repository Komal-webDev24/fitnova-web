import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomeScreen = () => {
  const [userName, setUserName] = useState('User');
  const navigate = useNavigate();

  useEffect(() => {
    const savedName = localStorage.getItem('userName');
    if (savedName) {
      setUserName(savedName);
    }
  }, []);

  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      // Wahi dark background aur overlay
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      margin: 0,
      padding: 0,
      overflow: 'hidden'
    }}>
      
      <div style={{ 
        textAlign: 'center',
        color: '#fff',
        zIndex: 10,
        width: '90%',
        maxWidth: '450px'
      }}>
        {/* Fire Icon hatane ke baad text thoda aur prominent lagega */}
        <h1 style={{ 
          fontSize: '34px', 
          fontWeight: '900', 
          margin: '0',
          textTransform: 'uppercase',
          letterSpacing: '1.5px'
        }}>
          WELCOME TO <br />
          <span style={{ color: '#8B2E2E' }}>FITNOVA</span> <br />
          <span style={{ color: '#fff' }}>{userName.toUpperCase()}</span>
        </h1>
        
        <p style={{ 
          margin: '20px auto', 
          color: '#ddd', 
          fontSize: '15px',
          maxWidth: '300px',
          lineHeight: '1.6'
        }}>
          Push your limits and build your <br /> power with every workout.
        </p>

        <button 
          onClick={() => navigate('/dashboard')} 
          style={{
            marginTop: '30px', 
            width: '220px',
            padding: '16px',
            borderRadius: '30px',
            border: 'none',
            backgroundColor: '#8B2E2E', // Fitnova Red
            color: '#fff',
            fontSize: '17px',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 8px 20px rgba(139, 46, 46, 0.4)',
            transition: '0.3s'
          }}
          onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
        >
          LET'S GO!
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;