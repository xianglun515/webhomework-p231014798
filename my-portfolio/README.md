# 个人作品集

这是一个基于 Next.js 构建的个人作品集网站，用于展示 Web 前端技术课程的练习成果、集成 WakaTime 编码统计和 QAnything 问答服务。旨在通过实际项目，巩固所学知识，并探索前端开发的更多可能性。

## QAnything 集成

我们通过 `iframe` 的方式将 QAnything 的问答服务嵌入到本应用中。这种方式实现简单，能够快速地将现有功能集成到新应用中，而无需进行复杂的 API 对接。用户可以通过访问 `/qanything` 路由来体验此服务。

## WakaTime API 集成

为了展示个人的编码活动，我们在页脚部分集成了 WakaTime API。通过调用 WakaTime 提供的 API，我们可以获取到总编码时长等数据，并将其动态展示在页面上。

为了保证 API Key 的安全，我们使用了环境变量 `.env.local` 来存储 `NEXT_PUBLIC_WAKATIME_API_KEY`。同时，为了避免直接在客户端暴露 API Key，我们创建了一个 Next.js API 路由 (`/api/wakatime`) 作为代理，所有对 WakaTime API 的请求都通过这个代理进行，确保了 API Key 的安全性和数据的私密性。

## Next.js 项目结构

本项目基于 Next.js App Router 构建，主要目录结构如下：



- `src/app/`: 存放所有页面和路由（包括 API 路由）。
- `src/app/api/`: 存放 API 路由，例如 `src/app/api/wakatime/route.js` 用于代理 WakaTime API 请求。
- `src/app/layout.jsx`: 全局布局文件，包含了页眉和页脚（其中页脚集成了 WakaTime 统计）。
- `src/app/page.jsx`: 项目首页，展示了课程练习列表和一些外部链接。
- `src/app/jay/`: “周杰伦歌迷站”练习页面，展示了周杰伦的音乐和演唱会信息。
- `src/app/lasthomework/`: “点击我吧！”练习页面，一个简单的点击交互示例。
- `src/app/qanything/`: “QAnything 问答服务”页面，通过 `iframe` 嵌入外部服务。
- `src/components/`: 存放可重用的 React 组件，如 `Footer` (用于展示 WakaTime 统计)。
- `public/`: 存放静态资源，如图片，以及一些纯 HTML 的作业页面（例如 `ksh.html`, `task-manager.html`, `data-dashboard.html`, `time.html`）。

## 课程作业整合

本学期的所有课程练习都已整合到此 Next.js 应用中。每个练习都被创建为一个独立的页面，并通过路由进行访问。这种方式不仅方便管理，也体现了组件化开发的思想。

- **点击我吧！**: 一个简单的点击按钮交互示例。
- **任务清单**: 一个基于本地存储的任务管理应用。
- **议程设置**: 传播学经典理论的可视化案例。
- **网站模拟数据分析仪表板**: 展示网站流量数据的模拟仪表板。
- **JayChouFan's Club**: 自制周杰伦中文粉丝网。
- **QAnything 问答服务**: 基于网易大语言模型的智能问答服务。

## 项目运行指南

1.  克隆本项目到本地：
    ```bash
    git clone https://github.com/xianglun515/webhomework-p231014798.git
    cd webhomework-p231014798/my-portfolio
    ```
2.  在项目根目录下创建 `.env.local` 文件，并添加您的 WakaTime API Key（可选，如果不需要 WakaTime 功能可跳过）：
    ```
    NEXT_PUBLIC_WAKATIME_API_KEY=your_wakatime_api_key
    ```
3.  安装项目依赖：
    ```bash
    npm install
    ```
4.  启动开发服务器：
    ```bash
    npm run dev
    ```
5.  在浏览器中打开 `http://localhost:3000` 查看。

**注意**：首次运行 `npm run dev` 时，Next.js 可能需要一些时间来编译和优化项目。请耐心等待，直到控制台显示“ready - started server on 0.0.0.0:3000, url: http://localhost:3000”信息。

## 运行截图

请在此处添加项目的运行截图，以更直观地展示项目效果。

例如：

![首页截图](public/screenshot-homepage.png)
![QAnything 页面截图](public/screenshot-qanything.png)
![WakaTime 集成截图](public/screenshot-wakatime.png)
