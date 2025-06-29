import React from 'react';
import styles from './jay.module.css';

export default function JayPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>周杰伦歌迷站</h1>
        <nav>
          <ul className={styles.nav_list}>
            <li><a href="#">首页</a></li>
            <li><a href="#">音乐</a></li>
            <li><a href="#">演唱会</a></li>
            <li><a href="#">关于</a></li>
          </ul>
        </nav>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <img src="/jay picture.jpg" alt="周杰伦" className={styles.hero_image} />
          <div className={styles.hero_text}>
            <h2>音乐才子，时代偶像</h2>
            <p>周杰伦的音乐，是我们的青春记忆。</p>
          </div>
        </section>

        <section className={styles.album_showcase}>
          <h2>专辑精选</h2>
          <div className={styles.album_grid}>
            <div className={styles.album_card}>
              <img src="/secret.png" alt="专辑1" />
              <h3>不能说的秘密</h3>
            </div>
            <div className={styles.album_card}>
              <img src="/secret2.png" alt="专辑2" />
              <h3>依然范特西</h3>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2024 周杰伦歌迷站. 保留所有权利。</p>
      </footer>
    </div>
  );
}