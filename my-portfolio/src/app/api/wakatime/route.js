import { NextResponse } from 'next/server';

export async function GET(request) {
  const apiKey = process.env.NEXT_PUBLIC_WAKATIME_API_KEY;

  if (!apiKey) {
    console.error('WakaTime API Key is not configured in .env.local');
    return NextResponse.json(
      { error: 'WakaTime API Key not configured on server' },
      { status: 500 }
    );
  }

  try {
    const encodedApiKey = btoa(apiKey);
    const url = 'https://wakatime.com/api/v1/users/current/all_time_since_today';

    console.log('Attempting to fetch WakaTime stats...');

    const response = await fetch(url, {
      headers: {
        Authorization: `Basic ${encodedApiKey}`,
      },
      next: { revalidate: 3600 },
    });

    // If the response is not OK, we need to log the details
    if (!response.ok) {
      // Get the error body from WakaTime's response
      const errorBody = await response.text();
      console.error('WakaTime API returned an error:', {
        status: response.status,
        statusText: response.statusText,
        body: errorBody,
      });
      // Return a specific error message to the client
      return NextResponse.json(
        { error: `WakaTime API request failed: ${response.statusText}` },
        { status: response.status }
      );
    }

    console.log('Successfully fetched WakaTime stats.');
    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('An unexpected error occurred in the WakaTime API route:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Check server logs.' },
      { status: 500 }
    );
  }
}