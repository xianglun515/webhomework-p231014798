# Web前端技术课程作业集

这是一个整合了Web前端技术课程所有作业的仓库，主要包含一个基于Next.js构建的个人作品集网站（`my-portfolio`）和一个纯HTML/CSS/JavaScript实现的周杰伦歌迷站（`jaychou`）。

## 项目概览

### 1. 个人作品集 (`my-portfolio`)

这是一个基于 Next.js 构建的个人作品集网站，用于展示 Web 前端技术课程的练习成果、集成 WakaTime 编码统计和 QAnything 问答服务。旨在通过实际项目，巩固所学知识，并探索前端开发的更多可能性。

#### 功能模块

- **课程作业整合**：将本学期的所有课程练习整合到此 Next.js 应用中，每个练习都被创建为一个独立的页面，并通过路由进行访问。包括：
  - **点击我吧！**：一个简单的点击按钮交互示例。
  - **任务清单**：一个基于本地存储的任务管理应用。
  - **议程设置**：传播学经典理论的可视化案例。
  - **网站模拟数据分析仪表板**：展示网站流量数据的模拟仪表板。
  - **JayChouFan's Club**：自制周杰伦中文粉丝网（此项目本身也是一个独立的作业，在此处作为链接集成）。
  - **QAnything 问答服务**：基于网易大语言模型的智能问答服务。
- **QAnything 集成**：通过 `iframe` 的方式将 QAnything 的问答服务嵌入到本应用中，用户可以通过访问 `/qanything` 路由来体验此服务。
- **WakaTime API 集成**：在页脚部分集成了 WakaTime API，展示个人的编码活动和总编码时长。API Key 通过环境变量 `.env.local` 存储，并通过 Next.js API 路由 (`/api/wakatime`) 作为代理，确保了 API Key 的安全性和数据的私密性。

#### 技术栈

- Next.js (React)
- Tailwind CSS
- JavaScript
- HTML/CSS

#### 项目结构

```
my-portfolio/
├── .env.local (可选，用于WakaTime API Key)
├── public/             # 存放静态资源和纯HTML作业页面
│   ├── data-dashboard.html
│   ├── ksh.html
│   ├── task-manager.html
│   ├── time.html
│   └── ...
├── src/
│   ├── app/            # 所有页面和路由 (包括API路由)
│   │   ├── api/        # API 路由，例如 wakatime 代理
│   │   ├── jay/        # "周杰伦歌迷站"练习页面
│   │   ├── lasthomework/ # "点击我吧！"练习页面
│   │   ├── qanything/  # "QAnything 问答服务"页面
│   │   ├── layout.jsx  # 全局布局文件
│   │   └── page.jsx    # 项目首页
│   └── components/     # 可重用 React 组件
│       └── Footer.jsx
├── package.json        # 项目依赖和脚本
└── ...
```

#### 运行指南

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

### 2. 周杰伦歌迷站 (`jaychou`)

这是一个为周杰伦粉丝设计的网页，包含了他的个人简介、音乐专辑、演唱会信息、影视作品以及最新的资讯。粉丝还可以加入粉丝俱乐部，获取专属权益。

#### 功能模块

- **简介**：介绍周杰伦的基本信息、职业生涯和重要成就。
- **音乐专辑**：列出周杰伦的经典音乐专辑，并提供部分专辑的简介。
- **演唱会**：展示周杰伦演唱会的现场照片。
- **影视作品**：介绍周杰伦参演或导演的影视作品。
- **最新资讯**：提供周杰伦的最新动态和新闻。
- **粉丝俱乐部**：粉丝可以通过填写表单加入俱乐部，享受会员专属权益，并关注官方社交媒体。
- **GitHub 数据同步**：页面底部显示项目在 GitHub 上的最后更新时间和提交次数。

#### 技术栈

- HTML
- CSS
- JavaScript

#### 项目结构

```
jaychou/
├── index.html         # 主页面文件
├── README.md          # 项目说明文件
├── jay picture.jpg    # 周杰伦肖像图片
├── ych1.jpg           # 演唱会图片1
├── ych2.jpg           # 演唱会图片2
├── secret.png         # 电影《不能说的秘密》图片1
├── secret2.png        # 电影《不能说的秘密》图片2
├── d1.png             # 电影《头文字D》图片1
└── d2.png             # 电影《头文字D》图片2
```

#### 运行指南

1. 克隆本仓库到本地：
   ```bash
   git clone https://github.com/xianglun515/webhomework-p231014798.git
   ```
2. 进入 `jaychou` 目录：
   ```bash
   cd webhomework-p231014798/jaychou
   ```
3. 使用任何支持 HTML 的浏览器直接打开 `index.html` 文件即可。
   ```
   open index.html
   ```

## 运行截图

请在此处添加项目的运行截图，以更直观地展示项目效果。

例如：

![首页截图](my-portfolio/public/screenshot-homepage.png)
![QAnything 页面截图](my-portfolio/public/screenshot-qanything.png)
![WakaTime 集成截图](my-portfolio/public/screenshot-wakatime.png)