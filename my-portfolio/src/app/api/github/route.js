export async function GET() {
  try {
    // GitHub API URL - 获取仓库的提交信息
    const repoOwner = 'xianglun515';
    const repoName = 'webhomework-p231014798';
    const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/commits`;
    
    // 调用GitHub API
    const response = await fetch(apiUrl, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
      next: { revalidate: 3600 } // 每小时缓存一次
    });
    
    if (!response.ok) {
      throw new Error(`GitHub API responded with status: ${response.status}`);
    }
    
    const commits = await response.json();
    
    // 提取需要的提交信息
    const formattedCommits = commits.slice(0, 10).map(commit => ({
      sha: commit.sha,
      message: commit.commit.message,
      author: commit.commit.author.name,
      date: commit.commit.author.date,
      url: commit.html_url
    }));
    
    // 返回提交信息
    return Response.json({
      total_commits: commits.length,
      recent_commits: formattedCommits,
      repo_url: `https://github.com/${repoOwner}/${repoName}`
    });
    
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    
    // 返回错误信息
    return Response.json({
      error: '获取GitHub数据失败',
      message: error.message
    }, { status: 500 });
  }
} 