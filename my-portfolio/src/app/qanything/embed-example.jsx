'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function EmbedExamplePage() {
  const [copied, setCopied] = useState(false);
  
  const iframeCode = `<iframe
  src="https://qanything.example.com/chatbot/"
  width="100%"
  height="600"
  style="border: none; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);"
  title="QAnything"
  allow="microphone"
></iframe>`;

  const apiCode = `// 使用fetch API调用QAnything服务
const callQAnything = async (question, conversationHistory = []) => {
  try {
    // 构建消息历史，支持多轮对话
    const messages = [
      ...conversationHistory,
      { role: 'user', content: question }
    ];
    
    const response = await fetch('/api/qanything', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: messages,
        temperature: 0.7,
        max_tokens: 1000
      })
    });
    
    if (!response.ok) {
      throw new Error(\`API请求失败: \${response.status}\`);
    }
    
    const data = await response.json();
    const answer = data.choices[0].message.content;
    
    // 返回答案和更新后的对话历史
    return {
      answer,
      updatedHistory: [
        ...messages,
        { role: 'assistant', content: answer }
      ]
    };
  } catch (error) {
    console.error('API调用错误:', error);
    throw error;
  }
};

// 使用示例 - 单次对话
callQAnything('你好，请介绍一下自己')
  .then(result => {
    console.log('回答:', result.answer);
    // 保存对话历史以便后续对话
    const conversationHistory = result.updatedHistory;
  })
  .catch(error => console.error(error));

// 使用示例 - 多轮对话
async function multiTurnConversation() {
  let history = [];
  
  // 第一轮对话
  const result1 = await callQAnything('你好，请介绍一下自己', history);
  console.log('AI: ' + result1.answer);
  history = result1.updatedHistory;
  
  // 第二轮对话，使用上一轮的历史
  const result2 = await callQAnything('你能帮我做什么?', history);
  console.log('AI: ' + result2.answer);
}`;

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(type);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">QAnything 嵌入示例</h1>
        <p className="mt-2 text-lg text-gray-600 max-w-2xl mx-auto">了解如何在您的网站中嵌入QAnything服务</p>
      </header>
      
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/qanything" className="text-blue-600 hover:text-blue-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            返回QAnything
          </Link>
        </div>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">iframe 嵌入方式</h2>
            <p className="text-gray-600 mb-6">
              使用iframe是最简单的嵌入方式，只需将以下代码复制到您的HTML页面中即可：
            </p>
            
            <div className="relative">
              <pre className="bg-gray-800 text-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                <code>{iframeCode}</code>
              </pre>
              <button
                onClick={() => copyToClipboard(iframeCode, 'iframe')}
                className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md px-3 py-1 text-xs"
              >
                {copied === 'iframe' ? '已复制!' : '复制代码'}
              </button>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-800 mb-2">预览效果：</h3>
              <iframe
                src="https://qanything.example.com/chatbot/"
                width="100%"
                height="400"
                style={{ border: 'none', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
                title="QAnything"
                allow="microphone"
              ></iframe>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">API 调用方式</h2>
            <p className="text-gray-600 mb-6">
              如果您需要更灵活的集成方式，可以使用API调用QAnything服务：
            </p>
            
            <div className="relative">
              <pre className="bg-gray-800 text-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                <code>{apiCode}</code>
              </pre>
              <button
                onClick={() => copyToClipboard(apiCode, 'api')}
                className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md px-3 py-1 text-xs"
              >
                {copied === 'api' ? '已复制!' : '复制代码'}
              </button>
            </div>
            
            <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-md">
              <h3 className="text-lg font-medium text-gray-800 mb-2">注意事项：</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>QAnything API支持多轮对话，可以通过保存对话历史实现连续对话</li>
                <li>API调用需要在服务器端进行，以保护API密钥安全</li>
                <li>确保您的服务器有足够的处理能力来处理API请求</li>
                <li>考虑实现缓存机制以提高响应速度并减少API调用次数</li>
                <li>添加错误处理机制以应对API可能的故障</li>
                <li>支持自定义温度参数(temperature)和最大输出长度(max_tokens)</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">自定义样式</h2>
            <p className="text-gray-600 mb-6">
              您可以根据自己的网站风格自定义QAnything的外观：
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">iframe自定义：</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  <li>调整iframe的宽度和高度</li>
                  <li>添加边框样式和圆角</li>
                  <li>设置阴影效果</li>
                  <li>调整iframe的位置和响应式布局</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">API集成自定义：</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  <li>完全自定义UI界面</li>
                  <li>集成到现有聊天系统</li>
                  <li>添加自定义功能和交互</li>
                  <li>实现多语言支持</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 