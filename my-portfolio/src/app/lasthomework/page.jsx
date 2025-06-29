'use client';

import { useState } from 'react';

export default function ClickButtonDemo() {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    alert('我被点击了');
  };

  return (
    <div style={{ 
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      margin: 0,
      fontFamily: 'Arial, sans-serif',
      background: 'linear-gradient(135deg, #fff0f5 0%, #ffe4e1 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ 
        position: 'absolute',
        fontSize: '20px',
        color: 'rgba(255,105,180,0.2)',
        animation: 'float 5s ease-in-out infinite'
      }}>
        ❤
      </div>
      
      <button 
        onClick={handleClick}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          backgroundColor: '#ffb6c1',
          color: 'white',
          border: 'none',
          borderRadius: '20px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          transition: 'all 0.3s ease'
        }}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = '#ff69b4';
          e.target.style.transform = 'scale(1.05)';
          e.target.style.boxShadow = '0 6px 12px rgba(0,0,0,0.15)';
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = '#ffb6c1';
          e.target.style.transform = 'scale(1)';
          e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
        }}
      >
        点击我吧
      </button>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
      `}</style>
    </div>
  );
}