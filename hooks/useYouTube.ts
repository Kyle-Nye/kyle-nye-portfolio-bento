import { useState, useEffect } from 'react';
import { youtubeService } from '../services/youtubeService';
import type { YouTubeStats } from '../types/youtube';

export function useYouTube() {
  const [data, setData] = useState<YouTubeStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        setIsLoading(true);
        setError(null);

        const result = await youtubeService.getYouTubeStats();

        if (isMounted) {
          setData(result);
        }
      } catch (err) {
        console.error('Error fetching YouTube stats:', err);
        if (isMounted) {
          setError('Failed to load YouTube stats');
          setData(youtubeService.getFallbackData());
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return { data, isLoading, error };
}
