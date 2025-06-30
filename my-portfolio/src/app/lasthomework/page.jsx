'use client';

import { useState, useEffect } from 'react';

export default function ClickButtonDemo() {
  const [clickCount, setClickCount] = useState(0);
  const [hearts, setHearts] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [buttonColor, setButtonColor] = useState('#ffb6c1');

  // 生成随机心形
  const createHeart = (x, y) => {
    const id = Date.now() + Math.random();
    const size = Math.random() * 30 + 10;
    const duration = Math.random() * 2 + 1;
    const left = x - size / 2;
    const top = y - size / 2;
    
    return {
      id,
      style: {
        position: 'absolute',
        left: `${left}px`,
        top: `${top}px`,
        fontSize: `${size}px`,
        color: getRandomColor(),
        opacity: 1,
        animation: `float ${duration}s ease-out forwards`,
        pointerEvents: 'none',
      }
    };
  };

  // 生成随机颜色
  const getRandomColor = () => {
    const colors = ['#ff69b4', '#ff1493', '#db7093', '#e91e63', '#ff6b81', '#ff4757'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // 处理点击事件
  const handleClick = (e) => {
    // 增加点击计数
    setClickCount(prev => prev + 1);
    
    // 生成随机心形
    const newHearts = [];
    for (let i = 0; i < 5; i++) {
      newHearts.push(createHeart(e.clientX, e.clientY));
    }
    setHearts([...hearts, ...newHearts]);
    
    // 显示消息
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 1500);
    
    // 随机改变按钮颜色
    setButtonColor(getRandomColor());
  };

  // 清理过期的心形
  useEffect(() => {
    if (hearts.length > 0) {
      const timer = setTimeout(() => {
        setHearts(hearts.slice(5));
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [hearts]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-pink-50 to-purple-50 p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i}
            className="absolute text-pink-200"
            style={{
              fontSize: `${Math.random() * 20 + 10}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.1,
              transform: `rotate(${Math.random() * 360}deg)`,
              animation: `float ${Math.random() * 10 + 5}s ease-in-out infinite`
            }}
          >
            ❤
          </div>
        ))}
      </div>
      
      <h1 className="text-3xl font-bold text-pink-500 mb-8 text-center relative z-10">
        点击我吧！
      </h1>
      
      <div className="relative mb-16">
        <button 
          onClick={handleClick}
          className="px-8 py-4 text-xl font-medium text-white rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-pink-300"
          style={{ backgroundColor: buttonColor }}
        >
          点击我吧
        </button>
        
        {showMessage && (
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 bg-white px-4 py-2 rounded-lg shadow-md text-pink-600 font-medium animate-bounce">
            我被点击了！
          </div>
        )}
      </div>
      
      <div className="text-center bg-white p-6 rounded-xl shadow-md max-w-md w-full relative z-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">点击统计</h2>
        <p className="text-gray-600 mb-4">你已经点击了按钮 <span className="font-bold text-pink-500 text-xl">{clickCount}</span> 次</p>
        
        <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-pink-400 to-purple-500 transition-all duration-500"
            style={{ width: `${Math.min(clickCount * 5, 100)}%` }}
          ></div>
        </div>
        
        <p className="mt-4 text-sm text-gray-500">
          {clickCount === 0 && "快来点击按钮吧！"}
          {clickCount > 0 && clickCount < 5 && "继续点击，看看会发生什么？"}
          {clickCount >= 5 && clickCount < 10 && "你很有耐心嘛！"}
          {clickCount >= 10 && clickCount < 20 && "哇！你真的很喜欢点击按钮！"}
          {clickCount >= 20 && "你是点击按钮的专家！"}
        </p>
      </div>
      
      {/* 动态生成的心形 */}
      {hearts.map(heart => (
        <div key={heart.id} style={heart.style}>❤</div>
      ))}

      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(-100px) rotate(20deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}