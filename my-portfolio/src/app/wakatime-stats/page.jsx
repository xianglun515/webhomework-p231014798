'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function WakaTimeStatsPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWakaTimeStats = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/wakatime/details?t=${Date.now()}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching WakaTime stats:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWakaTimeStats();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 flex items-center">
        <Link href="/" className="text-blue-600 hover:text-blue-800 mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
        </Link>
        <h1 className="text-3xl font-bold text-gray-800">WakaTime 编码统计</h1>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600">加载数据失败: {error}</p>
          <p className="mt-2 text-gray-600">显示模拟数据以供参考</p>
          <div className="mt-6">
            {renderMockData()}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 总编码时间卡片 */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">总编码时间</h2>
            <div className="flex items-center">
              <div className="bg-blue-500 rounded-full p-3 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-800">
                  {stats?.data?.human_readable_total || '25 hrs 42 mins'}
                </p>
                <p className="text-sm text-gray-500">
                  过去 {stats?.data?.days_tracked || 30} 天
                </p>
              </div>
            </div>
          </div>

          {/* 日均编码时间卡片 */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">日均编码时间</h2>
            <div className="flex items-center">
              <div className="bg-green-500 rounded-full p-3 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-800">
                  {stats?.data?.human_readable_daily_average || '51 mins'}
                </p>
                <p className="text-sm text-gray-500">
                  平均每日编码时间
                </p>
              </div>
            </div>
          </div>

          {/* 编程语言分布 */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 md:col-span-2">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">编程语言分布</h2>
            <div className="space-y-4">
              {renderLanguages(stats?.data?.languages || getMockLanguages())}
            </div>
          </div>

          {/* 编辑器使用情况 */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">编辑器使用情况</h2>
            <div className="space-y-4">
              {renderEditors(stats?.data?.editors || getMockEditors())}
            </div>
          </div>

          {/* 项目分布 */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">项目分布</h2>
            <div className="space-y-4">
              {renderProjects(stats?.data?.projects || getMockProjects())}
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 text-center text-sm text-gray-500">
        <p>数据由 WakaTime API 提供，每小时更新一次</p>
        <p className="mt-1">
          <a 
            href="https://wakatime.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            了解更多关于 WakaTime
          </a>
        </p>
      </div>
    </div>
  );
}

function renderLanguages(languages) {
  return languages.map((lang, index) => (
    <div key={index} className="relative">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">{lang.name}</span>
        <span className="text-sm font-medium text-gray-500">{lang.percent}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="h-2.5 rounded-full" 
          style={{ 
            width: `${lang.percent}%`,
            backgroundColor: getColorForIndex(index)
          }}
        ></div>
      </div>
    </div>
  ));
}

function renderEditors(editors) {
  return editors.map((editor, index) => (
    <div key={index} className="relative">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">{editor.name}</span>
        <span className="text-sm font-medium text-gray-500">{editor.percent}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-purple-600 h-2.5 rounded-full" 
          style={{ width: `${editor.percent}%` }}
        ></div>
      </div>
    </div>
  ));
}

function renderProjects(projects) {
  return projects.map((project, index) => (
    <div key={index} className="relative">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">{project.name}</span>
        <span className="text-sm font-medium text-gray-500">{project.percent}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="h-2.5 rounded-full" 
          style={{ 
            width: `${project.percent}%`,
            backgroundColor: getColorForIndex(index + 5)
          }}
        ></div>
      </div>
    </div>
  ));
}

function renderMockData() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
        <h3 className="font-medium text-gray-800 mb-3">总编码时间</h3>
        <p className="text-2xl font-bold">25 hrs 42 mins</p>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
        <h3 className="font-medium text-gray-800 mb-3">日均编码时间</h3>
        <p className="text-2xl font-bold">51 mins</p>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
        <h3 className="font-medium text-gray-800 mb-3">最常用语言</h3>
        <p className="text-xl font-semibold">JavaScript (45%)</p>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
        <h3 className="font-medium text-gray-800 mb-3">最常用编辑器</h3>
        <p className="text-xl font-semibold">VS Code (98%)</p>
      </div>
    </div>
  );
}

function getMockLanguages() {
  return [
    { name: 'JavaScript', percent: 45 },
    { name: 'HTML', percent: 25 },
    { name: 'CSS', percent: 20 },
    { name: 'JSON', percent: 10 }
  ];
}

function getMockEditors() {
  return [
    { name: 'VS Code', percent: 98 },
    { name: 'Sublime Text', percent: 2 }
  ];
}

function getMockProjects() {
  return [
    { name: 'my-portfolio', percent: 65 },
    { name: 'jaychou', percent: 20 },
    { name: 'other-projects', percent: 15 }
  ];
}

function getColorForIndex(index) {
  const colors = [
    '#3b82f6', // blue-500
    '#10b981', // green-500
    '#f59e0b', // amber-500
    '#ef4444', // red-500
    '#8b5cf6', // violet-500
    '#ec4899', // pink-500
    '#06b6d4', // cyan-500
    '#f97316', // orange-500
    '#6366f1', // indigo-500
    '#14b8a6'  // teal-500
  ];
  
  return colors[index % colors.length];
} 