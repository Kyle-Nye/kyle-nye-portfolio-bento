import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { YouTubeStats } from '../types/youtube';

const CHANNEL_HANDLE = 'geektakreviews';

let cachedData: { data: YouTubeStats; timestamp: number } | null = null;
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

function formatNumber(num: string): string {
  return Number(num).toLocaleString('en-US');
}

async function fetchYouTubeStats(): Promise<YouTubeStats> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    throw new Error('YOUTUBE_API_KEY not configured');
  }

  const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&forHandle=${CHANNEL_HANDLE}&key=${apiKey}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`YouTube API error: ${response.status}`);
  }

  const json = await response.json();
  const channel = json.items?.[0];

  if (!channel) {
    throw new Error('Channel not found');
  }

  return {
    channelTitle: channel.snippet.title,
    totalViews: formatNumber(channel.statistics.viewCount),
    videoCount: formatNumber(channel.statistics.videoCount),
    lastUpdated: new Date().toISOString(),
  };
}

const FALLBACK: YouTubeStats = {
  channelTitle: 'GeekTak Reviews',
  totalViews: '1,000+',
  videoCount: '50+',
  lastUpdated: '2026-04-01T00:00:00.000Z',
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Return cached data if fresh
  if (cachedData && (Date.now() - cachedData.timestamp) < CACHE_DURATION) {
    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate=3600');
    res.setHeader('X-Cache', 'HIT');
    return res.status(200).json(cachedData.data);
  }

  try {
    const data = await fetchYouTubeStats();
    cachedData = { data, timestamp: Date.now() };

    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate=3600');
    res.setHeader('X-Cache', 'MISS');
    return res.status(200).json(data);
  } catch (error) {
    console.error('YouTube API failed, serving fallback:', error);

    if (cachedData) {
      res.setHeader('X-Cache', 'STALE');
      return res.status(200).json(cachedData.data);
    }

    res.setHeader('X-Cache', 'FALLBACK');
    return res.status(200).json(FALLBACK);
  }
}
