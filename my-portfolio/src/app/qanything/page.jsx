'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function QAnythingPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const [activeTab, setActiveTab] = useState('iframe'); // 'iframe' 或 'api'
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const chatContainerRef = useRef(null);

  // 使用内部API路由

  // 模拟iframe加载状态
  useEffect(() => {
    if (activeTab === 'iframe') {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2500);
      
      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, [activeTab]);

  // 处理iframe加载事件
  const handleIframeLoad = () => {
    setIsLoading(false);
    setLoadError(false);
  };

  // 处理iframe加载错误
  const handleIframeError = () => {
    setIsLoading(false);
    setLoadError(true);
  };

  // 滚动到聊天底部
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  // 处理API提交
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!question.trim() || isProcessing) return;
    
    // 添加用户问题到聊天历史
    const newUserMessage = { role: 'user', content: question };
    setChatHistory([...chatHistory, newUserMessage]);
    
    setIsProcessing(true);
    
    try {
      // 显示加载中消息
      setChatHistory(prev => [...prev, { role: 'assistant', content: '思考中...', isLoading: true }]);
      
      const response = await fetch('/api/qanything', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...chatHistory.filter(msg => !msg.isLoading), newUserMessage],
          temperature: 0.7,
          max_tokens: 1000
        })
      });
      
      if (!response.ok) {
        throw new Error(`API请求失败: ${response.status}`);
      }
      
      const data = await response.json();
      const aiResponse = data.choices[0].message.content;
      
      // 移除加载中消息并添加实际回复
      setChatHistory(prev => [
        ...prev.filter(msg => !msg.isLoading),
        { role: 'assistant', content: aiResponse }
      ]);
      
      setQuestion('');
    } catch (error) {
      console.error('API调用错误:', error);
      
      // 移除加载中消息并添加错误消息
      setChatHistory(prev => [
        ...prev.filter(msg => !msg.isLoading),
        { role: 'assistant', content: `抱歉，发生了错误: ${error.message}`, isError: true }
      ]);
    } finally {
      setIsProcessing(false);
    }
  };

  // 清空聊天历史
  const clearChat = () => {
    setChatHistory([]);
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <header className="text-center mb-10">
        <h1 
          className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4" 
          style={{ lineHeight: '1.2', overflow: 'visible', display: 'inline-block', wordBreak: 'keep-all', whiteSpace: 'nowrap' }}
        >
          QAnything 智能问答
        </h1>
        <p className="mt-2 text-lg text-gray-600 max-w-2xl mx-auto">基于大语言模型的智能问答服务，可回答各类问题并提供专业解答</p>
      </header>
      
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex justify-center">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                activeTab === 'iframe' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('iframe')}
            >
              iframe 嵌入
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                activeTab === 'api' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('api')}
            >
              API 调用
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden relative">
          {activeTab === 'iframe' && (
            <>
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-80 z-10">
                  <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                    <p className="text-gray-700 font-medium">正在加载 QAnything 服务...</p>
                  </div>
                </div>
              )}
              
              {loadError ? (
                <div className="p-8 text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">加载失败</h3>
                  <p className="text-gray-600 mb-4">无法加载 QAnything 服务，请检查您的网络连接或稍后再试</p>
                  <a 
                    href="https://qanything.example.com/chatbot/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                  >
                    直接访问 QAnything
                  </a>
                </div>
              ) : (
                <iframe
                  src="https://qanything.example.com/chatbot/"
                  className="w-full h-[75vh] border-none"
                  title="QAnything"
                  allow="microphone"
                  onLoad={handleIframeLoad}
                  onError={handleIframeError}
                ></iframe>
              )}
            </>
          )}
          
          {activeTab === 'api' && (
            <div className="h-[75vh] flex flex-col">
              <div 
                ref={chatContainerRef}
                className="flex-1 p-4 overflow-y-auto"
                style={{ scrollBehavior: 'smooth' }}
              >
                {chatHistory.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    <p>开始提问吧</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {chatHistory.map((message, index) => (
                      <div 
                        key={index} 
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`max-w-[80%] rounded-lg px-4 py-2 ${
                            message.role === 'user' 
                              ? 'bg-blue-600 text-white' 
                              : message.isError 
                                ? 'bg-red-50 text-red-700 border border-red-200' 
                                : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {message.isLoading ? (
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                              <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                              <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                            </div>
                          ) : (
                            <p className="whitespace-pre-wrap">{message.content}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="border-t border-gray-200 p-4">
                <form onSubmit={handleSubmit} className="flex space-x-2">
                  <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="输入您的问题..."
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    disabled={isProcessing}
                  />
                  <button
                    type="submit"
                    disabled={isProcessing || !question.trim()}
                    className={`px-4 py-2 rounded-lg font-medium ${
                      isProcessing || !question.trim()
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    发送
                  </button>
                  <button
                    type="button"
                    onClick={clearChat}
                    className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
                  >
                    清空
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-8">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">关于 QAnything</h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>QAnything 是我们自主研发的智能问答服务，基于先进的大语言模型技术，可以回答各类问题，支持多轮对话和上下文理解。现在支持两种访问方式：iframe嵌入和API直接调用。</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <button
              onClick={() => setShowTips(!showTips)}
              className="flex items-center text-gray-700 hover:text-gray-900 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-1 transition-transform ${showTips ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="font-medium">使用技巧</span>
            </button>
            
            {showTips && (
              <div className="mt-3 pl-6 text-gray-600 space-y-2 text-sm">
                <p>• 提问时尽量描述清楚您的问题，提供足够的上下文</p>
                <p>• 可以询问学术知识、编程问题、生活常识等多领域问题</p>
                <p>• 如果回答不满意，可以尝试重新表述您的问题</p>
                <p>• 支持连续对话，可以基于之前的回答继续提问</p>
                <p>• 如遇加载问题，可以尝试刷新页面或切换到API调用模式</p>
                <p>• API调用模式使用专业大语言模型接口，支持多轮对话</p>
                <p>• 可以通过API调用方式将QAnything集成到您自己的应用中</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-12 text-center">
        <p className="text-sm text-gray-500 mb-2">
          ※ 如果界面加载失败，您可以 
          <a 
            href="https://qanything.example.com/chatbot/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            直接访问QAnything
          </a>
          {' '}或切换到API调用模式
        </p>
        <Link href="/qanything/embed-example" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          查看如何在您的网站中嵌入QAnything
        </Link>
      </div>
    </div>
  );
}