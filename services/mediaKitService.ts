import type { MediaKitData } from '../types/mediaKit';
import type { CacheEntry } from '../types/github';

const FALLBACK_DATA: MediaKitData = {
  name: 'Kyle Nye',
  avatarUrl: 'https://utfs.io/f/h6Cml4XgPqDUZemy4QdaVtIXFrhy8fqGWk2RSmgUz7AoeEw3',
  stats: [
    { label: 'Amazon Earnings', value: '$10,000+', type: 'amazon', verified: true },
    { label: 'Items Sold', value: '5,000+', type: 'items', verified: true },
    { label: 'Revenue Generated', value: '$200,000+', type: 'revenue', verified: true },
    { label: 'Videos Completed', value: '530', type: 'videos', verified: true },
  ],
  socialLinks: [
    { platform: 'amazon', url: 'https://www.amazon.com/shop/geektak', label: 'Amazon Storefront' },
    { platform: 'instagram', url: 'https://www.instagram.com/geektak/', label: 'Instagram' },
    { platform: 'youtube', url: 'https://www.youtube.com/@geektakreviews', label: 'YouTube' },
    { platform: 'pinterest', url: 'https://www.pinterest.com/geektak/', label: 'Pinterest' },
  ],
  specializations: ['Unboxing', 'Amazon Shoppable Video', 'Product Review'],
  videoTypes: ['Unboxing', 'Amazon Shoppable Video', 'Product Review'],
  rateCard: [{ service: 'Video Review', price: '$70.00' }],
  activeSince: 'Oct 22 2023',
  lastUpdated: '2026-03-31T00:00:00.000Z',
};

export class MediaKitService {
  private cacheDuration = 24 * 60 * 60 * 1000; // 24 hours

  async getMediaKitData(): Promise<MediaKitData> {
    return this.fetchWithCache<MediaKitData>('data', async () => {
      // Try the API route first (available in production on Vercel)
      // Falls back to the static JSON file (works in dev and as fallback)
      const urls = ['/api/media-kit', '/data/media-kit.json'];

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

      throw new Error('All media kit data sources failed');
    });
  }

  private async fetchWithCache<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
    const cacheKey = `mk-${key}`;

    this.cleanupExpiredCache();

    // Check localStorage cache
    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const { data, timestamp }: CacheEntry<T> = JSON.parse(cached);
        const age = Date.now() - timestamp;

        if (age < this.cacheDuration) {
          console.log(`[MediaKit Service] Using cached data for ${key} (${Math.round(age / 1000)}s old)`);
          return data;
        }
      }
    } catch (error) {
      console.warn('[MediaKit Service] Cache read error:', error);
    }

    // Fetch fresh data
    try {
      const data = await fetcher();

      try {
        const cacheEntry: CacheEntry<T> = {
          data,
          timestamp: Date.now(),
        };
        localStorage.setItem(cacheKey, JSON.stringify(cacheEntry));
        console.log(`[MediaKit Service] Cached fresh data for ${key}`);
      } catch (error) {
        console.warn('[MediaKit Service] Cache write error:', error);
      }

      return data;
    } catch (error) {
      // On error, try to return stale cache
      try {
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          const { data }: CacheEntry<T> = JSON.parse(cached);
          console.warn(`[MediaKit Service] Returning stale cache for ${key} due to fetch error`);
          return data;
        }
      } catch {
        // Ignore cache errors
      }

      throw error;
    }
  }

  clearCache(): void {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('mk-')) {
        localStorage.removeItem(key);
      }
    });
    console.log('[MediaKit Service] Cache cleared');
  }

  cleanupExpiredCache(): void {
    const keys = Object.keys(localStorage);
    let removedCount = 0;

    keys.forEach(key => {
      if (key.startsWith('mk-')) {
        try {
          const cached = localStorage.getItem(key);
          if (cached) {
            const { timestamp } = JSON.parse(cached);
            if (Date.now() - timestamp >= this.cacheDuration) {
              localStorage.removeItem(key);
              removedCount++;
            }
          }
        } catch {
          localStorage.removeItem(key);
          removedCount++;
        }
      }
    });

    if (removedCount > 0) {
      console.log(`[MediaKit Service] Cleaned up ${removedCount} expired cache entries`);
    }
  }

  getFallbackData(): MediaKitData {
    return FALLBACK_DATA;
  }
}

export const mediaKitService = new MediaKitService();
