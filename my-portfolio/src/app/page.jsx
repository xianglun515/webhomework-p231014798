import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <header className="text-center mb-12 relative">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">我的Web前端技术课程作品集</h1>
        <p className="text-lg text-gray-600">欢迎查看我的 Web前端开发学习成果</p>
        <a href="/time.html" className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600 transition-colors duration-200">
          GitHub同步记录
        </a>
      </header>

      <main className="flex flex-col lg:flex-row justify-center items-start gap-12">
        <div className="flex-1 max-w-3xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">平时作业</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <li className="bg-white p-6 rounded-lg shadow-md transition-transform duration-200 hover:-translate-y-1">
              <h2 className="text-xl mb-4 font-medium text-gray-800">点击我吧！</h2>
              <p className="text-gray-600 mb-6">“我被点击了！”</p>
              <Link href="/lasthomework" className="no-underline text-blue-600 font-semibold hover:text-blue-700">
                查看项目
              </Link>
            </li>
            <li className="bg-white p-6 rounded-lg shadow-md transition-transform duration-200 hover:-translate-y-1">
              <h2 className="text-xl mb-4 font-medium text-gray-800">任务清单</h2>
              <p className="text-gray-600 mb-6">你可以在这里自行布置待完成的事情！</p>
              <Link href="/task-manager.html" className="no-underline text-blue-600 font-semibold hover:text-blue-700">
                查看项目
              </Link>
            </li>
            <li className="bg-white p-6 rounded-lg shadow-md transition-transform duration-200 hover:-translate-y-1">
              <h2 className="text-xl mb-4 font-medium text-gray-800">议程设置</h2>
              <p className="text-gray-600 mb-6">传播学经典理论可视化案例</p>
              <Link href="/ksh.html" className="no-underline text-blue-600 font-semibold hover:text-blue-700">
                查看项目
              </Link>
            </li>
            <li className="bg-white p-6 rounded-lg shadow-md transition-transform duration-200 hover:-translate-y-1">
              <h2 className="text-xl mb-4 font-medium text-gray-800">网站模拟数据分析仪表板</h2>
              <p className="text-gray-600 mb-6">你可以更加直观的获取网站的流量数据！</p>
              <Link href="/data-dashboard.html" className="no-underline text-blue-600 font-semibold hover:text-blue-700">
                查看项目
              </Link>
            </li>
          </ul>
           <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center mt-12">其他项目</h2>
           <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <li className="bg-white p-6 rounded-lg shadow-md transition-transform duration-200 hover:-translate-y-1 list-none">
              <h2 className="text-xl mb-4 font-medium text-gray-800">JayChouFan's Club</h2>
             <p className="text-gray-600 mb-6">自制周杰伦中文粉丝网。</p>
              <a href="https://xianglun515.github.io/webhomework-p231014798/" target="_blank" rel="noopener noreferrer" className="no-underline text-blue-600 font-semibold hover:text-blue-700">
                点击跳转
              </a>
            </li>
            <li className="bg-white p-6 rounded-lg shadow-md transition-transform duration-200 hover:-translate-y-1 list-none">
              <h2 className="text-2xl mb-4 font-bold italic text-gray-800">QAnything 问答服务</h2>
             <p className="text-gray-600 mb-6">基于网易大语言模型的智能问答服务。</p>
               <Link href="/qanything" className="no-underline text-blue-600 font-semibold hover:text-blue-700">
                 访问服务
               </Link>
            </li>
           </ul>
         </div>

      </main>
       <footer className="w-full py-16 text-center text-gray-600 text-sm mt-8">
         <div className="bg-transparent p-4 rounded-lg shadow-lg">
           <h3 className="text-lg font-semibold mb-2">如何联系开发者</h3>
           <p>Email:2465315338@qq.com</p>
           <p>Wechat: nlrxff12138</p>
           <p>Phone: 15248693182</p>
         </div>
       </footer>
    </div>
  );
}