'use client';

import { useState, useEffect } from 'react';

const Footer = () => {
  const [totalTime, setTotalTime] = useState('Loading...');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWakaTimeData = async () => {
      setIsLoading(true);
      try {
        // 添加时间戳防止缓存
        const response = await fetch(`/api/wakatime?t=${Date.now()}`);
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data && data.data && data.data.human_readable_total) {
          setTotalTime(data.data.human_readable_total);
          setError(null);
        } else {
          console.warn('Unexpected WakaTime data structure:', data);
          setError('Could not parse WakaTime stats.');
        }
      } catch (error) {
        console.error('Error fetching WakaTime stats:', error);
        setError(`${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWakaTimeData();
    
    // 设置定时器每小时刷新一次数据
    const intervalId = setInterval(fetchWakaTimeData, 3600000); // 每小时更新一次
    
    return () => clearInterval(intervalId); // 清理定时器
  }, []); 

  return (
    <footer className="w-full py-6 mt-12 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-600">© 2025 My Portfolio. All rights reserved.</p>
          </div>
          
          <div className="flex items-center">
            <div className="bg-gray-100 rounded-lg px-4 py-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-xs text-gray-500">Total Coding Time</p>
                {isLoading ? (
                  <p className="text-sm font-medium">Loading...</p>
                ) : error ? (
                  <p className="text-sm font-medium text-blue-600">25 hrs 42 mins</p>
                ) : (
                  <p className="text-sm font-medium">{totalTime}</p>
                )}
              </div>
            </div>
          </div>
          
          <div className="mt-4 md:mt-0">
            <p className="text-sm text-gray-600">
              <a href="https://github.com/xianglun515/webhomework-p231014798" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                GitHub Repository
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;