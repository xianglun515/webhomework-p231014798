# 个人作品集

这是一个基于 Next.js 构建的个人作品集网站，用于展示课程练习、集成 WakaTime 编码统计和 QAnything 问答服务。

## QAnything 集成

我们通过 `iframe` 的方式将 QAnything 的问答服务嵌入到本应用中。这种方式实现简单，能够快速地将现有功能集成到新应用中，而无需进行复杂的 API 对接。

## WakaTime API 集成

为了展示个人的编码活动，我们在页脚部分集成了 WakaTime API。通过调用 WakaTime 提供的 API，我们可以获取到总编码时长等数据，并将其动态展示在页面上。

为了保证 API Key 的安全，我们使用了环境变量 `.env.local` 来存储 `NEXT_PUBLIC_WAKATIME_API_KEY`。

## Next.js 项目结构

本项目使用 `create-next-app` 初始化，并遵循 Next.js 的标准项目结构。主要文件和目录如下：

- `src/app/`: 存放所有页面和路由。
- `src/app/layout.jsx`: 全局布局文件，包含了页眉和页脚。
- `src/app/page.jsx`: 项目首页，展示了课程练习列表。
- `src/app/jay/`: “周杰伦作品集”练习页面。
- `src/app/lasthomework/`: “最后的作业”练习页面。
- `src/components/`: 存放可重用的 React 组件，如 `Footer`。
- `public/`: 存放静态资源，如图片。

## 旧作业整合

本学期的所有课程练习都已整合到此 Next.js 应用中。每个练习都被创建为一个独立的页面，并通过路由进行访问。这种方式不仅方便管理，也体现了组件化开发的思想。

## 项目运行指南

1.  克隆本项目到本地。
2.  在项目根目录下创建 `.env.local` 文件，并添加您的 WakaTime API Key：
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

## 运行截图

（待补充）
