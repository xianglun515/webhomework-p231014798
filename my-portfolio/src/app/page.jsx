import Link from 'next/link';

export default function HomePage() {
  return (
    <div style={{ fontFamily: 'sans-serif', padding: '2rem' }}>
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>我的课程练习作品集</h1>
        <p className="text-lg text-gray-600">欢迎查看我的 Web前端开发学习成果</p>
        <a href="/time.html" className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600 transition-colors duration-200">
          GitHub同步记录
        </a>
      </header>

      <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: '3rem' }}>
        <div style={{ flex: '1', maxWidth: '600px' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>平时作业</h2>
          <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <li style={{ background: '#f9f9f9', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', transition: 'transform 0.2s ease-in-out', ':hover': { transform: 'translateY(-5px)' } }}>
              <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>平时作业1</h2>
              <p style={{ color: '#555', marginBottom: '1.5rem' }}>“我被点击了！”</p>
              <Link href="/lasthomework" style={{ textDecoration: 'none', color: '#0070f3', fontWeight: 'bold' }}>
                查看项目
              </Link>
            </li>
            <li style={{ background: '#f9f9f9', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', transition: 'transform 0.2s ease-in-out', ':hover': { transform: 'translateY(-5px)' } }}>
              <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>平时作业2</h2>
              <p style={{ color: '#555', marginBottom: '1.5rem' }}>待添加作业描述。</p>
              <Link href="/homework2" style={{ textDecoration: 'none', color: '#0070f3', fontWeight: 'bold' }}>
                查看项目
              </Link>
            </li>
            <li style={{ background: '#f9f9f9', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', transition: 'transform 0.2s ease-in-out', ':hover': { transform: 'translateY(-5px)' } }}>
              <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>平时作业3</h2>
              <p style={{ color: '#555', marginBottom: '1.5rem' }}>待添加作业描述。</p>
              <Link href="/homework3" style={{ textDecoration: 'none', color: '#0070f3', fontWeight: 'bold' }}>
                查看项目
              </Link>
            </li>
            <li style={{ background: '#f9f9f9', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', transition: 'transform 0.2s ease-in-out', ':hover': { transform: 'translateY(-5px)' } }}>
              <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>平时作业4</h2>
              <p style={{ color: '#555', marginBottom: '1.5rem' }}>待添加作业描述。</p>
              <Link href="/homework4" style={{ textDecoration: 'none', color: '#0070f3', fontWeight: 'bold' }}>
                查看项目
              </Link>
            </li>
          </ul>
        </div>

        <div style={{ width: '1px', background: '#ccc', height: 'auto', alignSelf: 'stretch' }}></div>

        <div style={{ flex: '1', maxWidth: '300px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', textAlign: 'center' }}>其他项目</h2>
          <li style={{ background: '#f9f9f9', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', listStyle: 'none', transition: 'transform 0.2s ease-in-out', ':hover': { transform: 'translateY(-5px)' } }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>JayChou Fan's</h2>
            <p style={{ color: '#555', marginBottom: '1.5rem' }}>周杰伦中文粉丝网。</p>
            <a href="https://xianglun515.github.io/webhomework-p231014798/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#0070f3', fontWeight: 'bold' }}>
              点击跳转
            </a>
          </li>
          <li style={{ background: '#f9f9f9', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', listStyle: 'none', transition: 'transform 0.2s ease-in-out', ':hover': { transform: 'translateY(-5px)' } }} >
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>QAnything 问答服务</h2>
            <p style={{ color: '#555', marginBottom: '1.5rem' }}>一个基于网易大语言模型的智能问答服务页面。</p>
            <Link href="/qanything" style={{ textDecoration: 'none', color: '#0070f3', fontWeight: 'bold' }}>
              访问服务
            </Link>
          </li>
        </div>
      </main>
    </div>
  );
}