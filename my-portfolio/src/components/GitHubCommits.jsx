'use client';

import { useState, useEffect } from 'react';

export default function GitHubCommits({ isOpen, onClose }) {
  const [commits, setCommits] = useState([]);
  const [totalCommits, setTotalCommits] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [repoUrl, setRepoUrl] = useState('');

  useEffect(() => {
    if (isOpen) {
      fetchCommits();
    }
  }, [isOpen]);

  const fetchCommits = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/github');
      
      if (!response.ok) {
        throw new Error('获取GitHub数据失败');
      }
      
      const data = await response.json();
      setCommits(data.recent_commits || []);
      setTotalCommits(data.total_commits || 0);
      setRepoUrl(data.repo_url || '');
      setError(null);
    } catch (err) {
      setError('获取提交历史失败: ' + err.message);
      setCommits([]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">GitHub 更新记录</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-4 overflow-y-auto flex-grow">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 p-4">{error}</div>
          ) : (
            <>
              <div className="mb-4 text-center">
                <p className="text-lg font-medium">
                  总提交次数: <span className="text-blue-600 font-bold">{totalCommits}</span>
                </p>
                <a 
                  href={repoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline"
                >
                  查看完整提交历史 →
                </a>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">最近10次提交:</h3>
                {commits.map((commit) => (
                  <div key={commit.sha} className="border-b border-gray-100 pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{commit.message}</p>
                        <p className="text-sm text-gray-500">
                          {commit.author} · {new Date(commit.date).toLocaleString('zh-CN')}
                        </p>
                      </div>
                      <a 
                        href={commit.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 ml-2 flex-shrink-0"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        
        <div className="p-4 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  );
} 