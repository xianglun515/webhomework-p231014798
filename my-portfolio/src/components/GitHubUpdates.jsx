'use client';

import { useState } from 'react';
import GitHubCommits from './GitHubCommits';

export default function GitHubUpdates({ className }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // 默认样式（用于导航栏）和菜单样式（用于移动端菜单）
  const defaultClassName = "inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 transition-colors duration-200";
  const menuClassName = "w-full text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200";

  return (
    <>
      <button
        onClick={openModal}
        className={className || defaultClassName}
        title="查看GitHub更新记录"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
        更新记录
      </button>

      <GitHubCommits isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
} 