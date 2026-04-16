import type { YouTubeStats } from '../types/youtube';
import type { CacheEntry } from '../types/github';

const FALLBACK_DATA: YouTubeStats = {
  channelTitle: 'GeekTak Reviews',
  totalViews: '1,000+',
  videoCount: '50+',
  lastUpdated: '2026-04-01T00:00:00.000Z',
};

export class YouTubeService {
  private cacheDuration = 24 * 60 * 60 * 1000; // 24 hours

  async getYouTubeStats(): Promise<YouTubeStats> {
    return this.fetchWithCache<YouTubeStats>('stats', async () => {
      const urls = ['/api/youtube-stats', '/data/youtube-stats.json'];

      for (const url of urls) {
        try {
          const response = await fetch(url);
          if (response.ok) {
            return response.json();
          }
        } catch {
          continue;
        }
      }

      throw new Error('All YouTube data sources failed');
    });
  }

  private async fetchWithCache<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
    const cacheKey = `yt-${key}`;

    this.cleanupExpiredCache();

    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const { data, timestamp }: CacheEntry<T> = JSON.parse(cached);
        const age = Date.now() - timestamp;

        if (age < this.cacheDuration) {
          return data;
        }
      }
    } catch (error) {
      console.warn('[YouTube Service] Cache read error:', error);
    }

    try {
      const data = await fetcher();

      try {
        const cacheEntry: CacheEntry<T> = { data, timestamp: Date.now() };
        localStorage.setItem(cacheKey, JSON.stringify(cacheEntry));
      } catch (error) {
        console.warn('[YouTube Service] Cache write error:', error);
      }

      return data;
    } catch (error) {
      try {
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          const { data }: CacheEntry<T> = JSON.parse(cached);
          return data;
        }
      } catch {
        // Ignore cache errors
      }

      throw error;
    }
  }

  cleanupExpiredCache(): void {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('yt-')) {
        try {
          const cached = localStorage.getItem(key);
          if (cached) {
            const { timestamp } = JSON.parse(cached);
            if (Date.now() - timestamp >= this.cacheDuration) {
              localStorage.removeItem(key);
            }
          }
        } catch {
          localStorage.removeItem(key);
        }
      }
    });
  }

  getFallbackData(): YouTubeStats {
    return FALLBACK_DATA;
  }
}

export const youtubeService = new YouTubeService();
