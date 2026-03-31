import { useState, useEffect } from 'react';
import { mediaKitService } from '../services/mediaKitService';
import type { MediaKitData } from '../types/mediaKit';

export function useMediaKit() {
  const [data, setData] = useState<MediaKitData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        setIsLoading(true);
        setError(null);

        const result = await mediaKitService.getMediaKitData();

        if (isMounted) {
          setData(result);
        }
      } catch (err) {
        console.error('Error fetching media kit data:', err);
        if (isMounted) {
          setError('Failed to load media kit data');
          setData(mediaKitService.getFallbackData());
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
