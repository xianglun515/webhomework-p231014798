import Link from 'next/link';

export default function HomePage() {
  return (
    <div style={{ fontFamily: 'sans-serif', padding: '2rem' }}>
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>我的课程练习作品集</h1>
        <p style={{ color: '#666' }}>欢迎查看我的 Web 开发学习成果</p>
      </header>

      <main>
        <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
          <li style={{ background: '#f9f9f9', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>周杰伦作品集</h2>
            <p style={{ color: '#555', marginBottom: '1.5rem' }}>一个展示周杰伦音乐和影视作品的粉丝页面。</p>
            <Link href="/jay" style={{ textDecoration: 'none', color: '#0070f3', fontWeight: 'bold' }}>
              查看项目
            </Link>
          </li>
          <li style={{ background: '#f9f9f9', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>最后的作业</h2>
            <p style={{ color: '#555', marginBottom: '1.5rem' }}>课程的最终项目，整合了多项技能。</p>
            <Link href="/lasthomework" style={{ textDecoration: 'none', color: '#0070f3', fontWeight: 'bold' }}>
              查看项目
            </Link>
          </li>
          <li style={{ background: '#f9f9f9', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>QAnything 问答服务</h2>
            <p style={{ color: '#555', marginBottom: '1.5rem' }}>一个基于大语言模型的智能问答服务页面。</p>
            <Link href="/qanything" style={{ textDecoration: 'none', color: '#0070f3', fontWeight: 'bold' }}>
              访问服务
            </Link>
          </li>
        </ul>
      </main>
    </div>
  );
}