import React, { useState } from 'react'; // 1. useState add kiya
import { useNavigate } from 'react-router-dom';
import '../styles/Auth.css';

const Login = () => {
  const navigate = useNavigate();
  // 2. State banayi taaki input se naam pakad sakein
  const [email, setEmail] = useState('');

  // 3. Handle Login Function
  const handleLogin = (e) => {
  e.preventDefault();
  const nameFromEmail = email.split('@')[0]; 
  const finalName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);

  // Sirf ye ek line kafi hai sabke liye
  localStorage.setItem('userName', finalName); 
  
  navigate('/welcome');
};
  return (
    <div className="auth-page-container">
      <div className="auth-card">
        <h1 className="brand-name">FIT<span style={{color: '#8B2E2E'}}>NOVA</span></h1>
        <p style={{color: '#666', fontSize: '10px', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '40px'}}>
          WELCOME BACK
        </p>
        
        {/* 6. Form mein handleLogin function call kiya */}
        <form onSubmit={handleLogin}>
          <input 
            type="email" 
            placeholder="Email" 
            className="auth-input" 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Email update karne ke liye
          />
          <input type="password" placeholder="Password" className="auth-input" required />
          <button type="submit" className="auth-button">Login Now</button>
        </form>
        
        <p style={{marginTop: '30px', fontSize: '12px', color: '#888'}}>
          New here? <span style={{color: '#8B2E2E', cursor: 'pointer'}} onClick={() => navigate('/signup')}>Sign Up</span>
        </p>
      </div>
    </div>
  );
};

export default Login;