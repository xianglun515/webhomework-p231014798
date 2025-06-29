import React from 'react';

export default function QAnythingPage() {
  return (
    <div>
      <h1>QAnything 问答服务</h1>
      <iframe
        src="https://ai.youdao.com/saas/qanything/#/home"
        style={{ width: '100%', height: '80vh', border: 'none' }}
        title="QAnything"
      ></iframe>
    </div>
  );
}