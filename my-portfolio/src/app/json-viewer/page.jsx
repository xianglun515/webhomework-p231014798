'use client';

import { useState } from 'react';

export default function JsonViewerPage() {
  const [jsonInput, setJsonInput] = useState('{\n  "name": "张三",\n  "age": 25,\n  "isStudent": true,\n  "courses": ["Web前端", "数据可视化", "用户体验设计"],\n  "address": {\n    "city": "北京",\n    "district": "海淀区"\n  }\n}');
  const [parsedJson, setParsedJson] = useState(null);
  const [error, setError] = useState('');

  const parseJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setParsedJson(parsed);
      setError('');
    } catch (err) {
      setError(err.message);
      setParsedJson(null);
    }
  };

  // JSON树形结构渲染组件
  const JsonTree = ({ data, level = 0 }) => {
    const getIndent = (level) => {
      return { marginLeft: `${level * 20}px` };
    };

    if (data === null) return <span className="text-gray-500">null</span>;

    if (Array.isArray(data)) {
      return (
        <div>
          <span className="text-purple-600">[</span>
          {data.length === 0 ? (
            <span className="text-gray-500 ml-2">空数组</span>
          ) : (
            data.map((item, index) => (
              <div key={index} style={getIndent(1)}>
                <JsonTree data={item} level={level + 1} />
                {index < data.length - 1 && <span className="text-gray-500">,</span>}
              </div>
            ))
          )}
          <div style={getIndent(0)}>
            <span className="text-purple-600">]</span>
          </div>
        </div>
      );
    }

    if (typeof data === 'object') {
      const entries = Object.entries(data);
      return (
        <div>
          <span className="text-purple-600">{'{'}</span>
          {entries.length === 0 ? (
            <span className="text-gray-500 ml-2">空对象</span>
          ) : (
            entries.map(([key, value], index) => (
              <div key={key} style={getIndent(1)}>
                <span className="text-blue-600">"{key}"</span>
                <span className="text-gray-500">: </span>
                <JsonTree data={value} level={level + 1} />
                {index < entries.length - 1 && <span className="text-gray-500">,</span>}
              </div>
            ))
          )}
          <div style={getIndent(0)}>
            <span className="text-purple-600">{'}'}</span>
          </div>
        </div>
      );
    }

    // 基本数据类型
    if (typeof data === 'string') return <span className="text-green-600">"{data}"</span>;
    if (typeof data === 'number') return <span className="text-orange-600">{data}</span>;
    if (typeof data === 'boolean') return <span className="text-red-600">{String(data)}</span>;
    if (data === undefined) return <span className="text-gray-500">undefined</span>;

    return <span>{String(data)}</span>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">JSON 数据可视化工具</h1>
          <p className="text-gray-600 mb-8">
            JSON（JavaScript Object Notation）是一种轻量级的数据交换格式，易于阅读和编写，也易于机器解析和生成。本工具可帮助您可视化和理解 JSON 数据结构。
          </p>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="json-input">
              输入 JSON 数据:
            </label>
            <textarea
              id="json-input"
              className="w-full h-64 p-4 border border-gray-300 rounded-md font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder='输入有效的 JSON 数据，例如: {"name": "张三", "age": 25}'
            />
          </div>

          <button
            onClick={parseJson}
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors mb-8"
          >
            解析 JSON
          </button>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
              <p className="font-bold">解析错误</p>
              <p>{error}</p>
            </div>
          )}

          {parsedJson && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">可视化结果:</h2>
              <div className="bg-gray-50 border border-gray-200 rounded-md p-4 overflow-x-auto font-mono">
                <JsonTree data={parsedJson} />
              </div>
            </div>
          )}
        </div>

        <div className="bg-blue-50 p-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">JSON 基础知识:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-gray-700 mb-2">JSON 数据类型:</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li><span className="text-green-600">字符串</span> - 使用双引号包裹的文本</li>
                <li><span className="text-orange-600">数字</span> - 不带引号的数值</li>
                <li><span className="text-red-600">布尔值</span> - true 或 false</li>
                <li><span className="text-purple-600">数组</span> - 使用方括号 [] 表示的有序列表</li>
                <li><span className="text-purple-600">对象</span> - 使用花括号 {} 表示的键值对集合</li>
                <li><span className="text-gray-500">null</span> - 表示空值</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-700 mb-2">JSON 应用场景:</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Web API 数据交换</li>
                <li>配置文件</li>
                <li>数据存储</li>
                <li>前后端通信</li>
                <li>NoSQL 数据库存储</li>
              </ul>
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-500">参考：<a href="https://yangzh.cn/pages/2023/08/23/JSON-%E6%95%B0%E6%8D%AE%E6%A0%BC%E5%BC%8F%E8%AF%A6%E8%A7%A3/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">更多关于JSON格式的信息</a></p>
        </div>
      </div>
    </div>
  );
} 