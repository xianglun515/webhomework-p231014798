'use client';

import { useState, useEffect } from 'react';

const WakaTimeStats = () => {
  const [totalTime, setTotalTime] = useState('Loading...');

  useEffect(() => {
    // We now fetch from our own API route, which acts as a proxy
    fetch('/api/wakatime')
      .then(res => {
        if (!res.ok) {
          // Try to get a more specific error from the server response
          return res.json().then(errorData => {
            throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
          });
        }
        return res.json();
      })
      .then(data => {
        if (data && data.data && data.data.human_readable_total) {
          setTotalTime(data.data.human_readable_total);
        } else {
          setTotalTime('Could not parse WakaTime stats.');
        }
      })
      .catch(error => {
        console.error('Error fetching WakaTime stats:', error);
        setTotalTime(`Error: ${error.message}`);
      });
  }, []); // Empty dependency array, runs once on mount

  return (
    <footer style={{ textAlign: 'center', marginTop: '2rem', padding: '1rem', borderTop: '1px solid #eaeaea' }}>
      <p>Total Coding Time (Last 7 Days): {totalTime}</p>
    </footer>
  );
};

export default WakaTimeStats;