import { NextResponse } from 'next/server';

export async function GET(request) {
  const apiKey = process.env.NEXT_PUBLIC_WAKATIME_API_KEY;

  // 如果没有API Key，返回模拟数据
  if (!apiKey || apiKey === 'your_wakatime_api_key' || apiKey === 'your_wakatime_api_key_here') {
    console.log('WakaTime API Key not found or using placeholder, returning mock data');
    // 返回模拟详细数据
    return NextResponse.json({
      data: {
        human_readable_total: '25 hrs 42 mins',
        human_readable_daily_average: '51 mins',
        days_tracked: 30,
        languages: [
          { name: 'JavaScript', percent: 45 },
          { name: 'HTML', percent: 25 },
          { name: 'CSS', percent: 20 },
          { name: 'JSON', percent: 10 }
        ],
        editors: [
          { name: 'VS Code', percent: 98 },
          { name: 'Sublime Text', percent: 2 }
        ],
        projects: [
          { name: 'my-portfolio', percent: 65 },
          { name: 'jaychou', percent: 20 },
          { name: 'other-projects', percent: 15 }
        ]
      }
    });
  }

  try {
    // 编码API密钥
    let encodedApiKey;
    try {
      encodedApiKey = btoa(apiKey);
    } catch (e) {
      // 如果btoa在服务器端不可用，使用Buffer
      encodedApiKey = Buffer.from(apiKey).toString('base64');
    }
    
    // 获取统计数据
    const statsUrl = 'https://wakatime.com/api/v1/users/current/stats/last_30_days';
    
    console.log('Attempting to fetch WakaTime detailed stats...');

    const response = await fetch(statsUrl, {
      headers: {
        Authorization: `Basic ${encodedApiKey}`,
      },
      cache: 'no-store', // 禁用缓存，确保获取最新数据
    });

    // 如果响应不成功
    if (!response.ok) {
      const errorBody = await response.text();
      console.error('WakaTime API returned an error:', {
        status: response.status,
        statusText: response.statusText,
        body: errorBody,
      });
      
      // 返回模拟数据作为备选
      console.log('Returning mock data as fallback');
      return NextResponse.json({
        data: {
          human_readable_total: '25 hrs 42 mins',
          human_readable_daily_average: '51 mins',
          days_tracked: 30,
          languages: [
            { name: 'JavaScript', percent: 45 },
            { name: 'HTML', percent: 25 },
            { name: 'CSS', percent: 20 },
            { name: 'JSON', percent: 10 }
          ],
          editors: [
            { name: 'VS Code', percent: 98 },
            { name: 'Sublime Text', percent: 2 }
          ],
          projects: [
            { name: 'my-portfolio', percent: 65 },
            { name: 'jaychou', percent: 20 },
            { name: 'other-projects', percent: 15 }
          ]
        }
      });
    }

    console.log('Successfully fetched WakaTime detailed stats.');
    const rawData = await response.json();
    
    // 处理API返回的数据，提取需要的信息
    const data = {
      human_readable_total: rawData.data?.human_readable_total || '25 hrs 42 mins',
      human_readable_daily_average: rawData.data?.human_readable_daily_average || '51 mins',
      days_tracked: 30,
      languages: rawData.data?.languages?.map(lang => ({
        name: lang.name,
        percent: lang.percent
      })) || [
        { name: 'JavaScript', percent: 45 },
        { name: 'HTML', percent: 25 },
        { name: 'CSS', percent: 20 },
        { name: 'JSON', percent: 10 }
      ],
      editors: rawData.data?.editors?.map(editor => ({
        name: editor.name,
        percent: editor.percent
      })) || [
        { name: 'VS Code', percent: 98 },
        { name: 'Sublime Text', percent: 2 }
      ],
      projects: rawData.data?.projects?.map(project => ({
        name: project.name,
        percent: project.percent
      })) || [
        { name: 'my-portfolio', percent: 65 },
        { name: 'jaychou', percent: 20 },
        { name: 'other-projects', percent: 15 }
      ]
    };
    
    return NextResponse.json({ data });

  } catch (error) {
    console.error('An unexpected error occurred in the WakaTime API route:', error);
    
    // 出错时也返回模拟数据
    console.log('Returning mock data due to error');
    return NextResponse.json({
      data: {
        human_readable_total: '25 hrs 42 mins',
        human_readable_daily_average: '51 mins',
        days_tracked: 30,
        languages: [
          { name: 'JavaScript', percent: 45 },
          { name: 'HTML', percent: 25 },
          { name: 'CSS', percent: 20 },
          { name: 'JSON', percent: 10 }
        ],
        editors: [
          { name: 'VS Code', percent: 98 },
          { name: 'Sublime Text', percent: 2 }
        ],
        projects: [
          { name: 'my-portfolio', percent: 65 },
          { name: 'jaychou', percent: 20 },
          { name: 'other-projects', percent: 15 }
        ]
      }
    });
  }
} 