import { NextResponse } from 'next/server';

export async function GET(request) {
  const apiKey = process.env.NEXT_PUBLIC_WAKATIME_API_KEY;

  // 如果没有API Key，返回模拟数据
  if (!apiKey || apiKey === 'your_wakatime_api_key' || apiKey === 'your_wakatime_api_key_here') {
    console.log('WakaTime API Key not found or using placeholder, returning mock data');
    // 返回模拟数据
    return NextResponse.json({
      data: {
        human_readable_total: '25 hrs 42 mins',
        decimal: 25.7,
        digital: '25:42',
        text: '25 hrs 42 mins',
        total_seconds: 92520
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
    
    const url = 'https://wakatime.com/api/v1/users/current/all_time_since_today';

    console.log('Attempting to fetch WakaTime stats...');

    const response = await fetch(url, {
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
          decimal: 25.7,
          digital: '25:42',
          text: '25 hrs 42 mins',
          total_seconds: 92520
        }
      });
    }

    console.log('Successfully fetched WakaTime stats.');
    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('An unexpected error occurred in the WakaTime API route:', error);
    
    // 出错时也返回模拟数据
    console.log('Returning mock data due to error');
    return NextResponse.json({
      data: {
        human_readable_total: '25 hrs 42 mins',
        decimal: 25.7,
        digital: '25:42',
        text: '25 hrs 42 mins',
        total_seconds: 92520
      }
    });
  }
}