'use client';

import { useState } from 'react';

export default function CssFlexboxDemo() {
  const [flexDirection, setFlexDirection] = useState('row');
  const [justifyContent, setJustifyContent] = useState('flex-start');
  const [alignItems, setAlignItems] = useState('stretch');
  const [flexWrap, setFlexWrap] = useState('nowrap');
  const [gap, setGap] = useState('0');

  const flexContainerStyle = {
    display: 'flex',
    flexDirection,
    justifyContent,
    alignItems,
    flexWrap,
    gap: `${gap}px`,
    minHeight: '300px',
    padding: '1rem',
    backgroundColor: '#f0f4f8',
    border: '2px dashed #a0aec0',
    borderRadius: '0.5rem',
  };

  const items = [1, 2, 3, 4, 5];

  const getItemColor = (index) => {
    const colors = ['#4299e1', '#48bb78', '#ed8936', '#9f7aea', '#f56565'];
    return colors[index % colors.length];
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">CSS Flexbox 布局演示</h1>
          <p className="text-gray-600 mb-8">
            Flexbox 是一种一维布局模型，可以轻松实现灵活的页面布局。通过以下控制选项，尝试不同的 Flexbox 设置来了解它的工作原理。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                flex-direction:
                <select
                  value={flexDirection}
                  onChange={(e) => setFlexDirection(e.target.value)}
                  className="ml-2 border border-gray-300 rounded px-3 py-1"
                >
                  <option value="row">row</option>
                  <option value="row-reverse">row-reverse</option>
                  <option value="column">column</option>
                  <option value="column-reverse">column-reverse</option>
                </select>
              </label>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                justify-content:
                <select
                  value={justifyContent}
                  onChange={(e) => setJustifyContent(e.target.value)}
                  className="ml-2 border border-gray-300 rounded px-3 py-1"
                >
                  <option value="flex-start">flex-start</option>
                  <option value="flex-end">flex-end</option>
                  <option value="center">center</option>
                  <option value="space-between">space-between</option>
                  <option value="space-around">space-around</option>
                  <option value="space-evenly">space-evenly</option>
                </select>
              </label>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                align-items:
                <select
                  value={alignItems}
                  onChange={(e) => setAlignItems(e.target.value)}
                  className="ml-2 border border-gray-300 rounded px-3 py-1"
                >
                  <option value="stretch">stretch</option>
                  <option value="flex-start">flex-start</option>
                  <option value="flex-end">flex-end</option>
                  <option value="center">center</option>
                  <option value="baseline">baseline</option>
                </select>
              </label>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                flex-wrap:
                <select
                  value={flexWrap}
                  onChange={(e) => setFlexWrap(e.target.value)}
                  className="ml-2 border border-gray-300 rounded px-3 py-1"
                >
                  <option value="nowrap">nowrap</option>
                  <option value="wrap">wrap</option>
                  <option value="wrap-reverse">wrap-reverse</option>
                </select>
              </label>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                gap:
                <input
                  type="range"
                  min="0"
                  max="40"
                  value={gap}
                  onChange={(e) => setGap(e.target.value)}
                  className="ml-2 w-32"
                />
                <span className="ml-2">{gap}px</span>
              </label>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-3">预览:</h2>
            <div style={flexContainerStyle}>
              {items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center font-bold text-white"
                  style={{
                    backgroundColor: getItemColor(index),
                    minWidth: '80px',
                    minHeight: '80px',
                    padding: '1rem',
                    borderRadius: '0.5rem',
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 border-l-4 border-blue-500 p-4 rounded-md">
            <h3 className="text-lg font-medium text-gray-800 mb-2">当前 CSS 代码:</h3>
            <pre className="bg-gray-800 text-gray-100 p-4 rounded overflow-x-auto">
              <code>{`.flex-container {
  display: flex;
  flex-direction: ${flexDirection};
  justify-content: ${justifyContent};
  align-items: ${alignItems};
  flex-wrap: ${flexWrap};
  gap: ${gap}px;
}`}</code>
            </pre>
          </div>
        </div>

        <div className="bg-blue-50 p-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Flexbox 布局要点:</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li><strong>flex-direction</strong> - 决定主轴方向，项目排列方式</li>
            <li><strong>justify-content</strong> - 控制项目在主轴上的对齐方式</li>
            <li><strong>align-items</strong> - 控制项目在交叉轴上的对齐方式</li>
            <li><strong>flex-wrap</strong> - 控制项目是否换行</li>
            <li><strong>gap</strong> - 控制项目之间的间距</li>
          </ul>
          <p className="mt-4 text-sm text-gray-500">参考：<a href="https://yangzh.cn/pages/2021/10/30/CSS-Flexbox-%E5%B8%83%E5%B1%80/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">更多关于CSS Flexbox的信息</a></p>
        </div>
      </div>
    </div>
  );
} 