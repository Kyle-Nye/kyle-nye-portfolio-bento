import { useState, useEffect } from 'react';
import { githubService } from '../services/githubService';
import type { GitHubStats } from '../types/github';

export function useGitHub(featuredRepoName?: string) {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await githubService.getGitHubStats(featuredRepoName);

        if (isMounted) {
          setStats(data);
        }
      } catch (err) {
        console.error('Error fetching GitHub data:', err);
        if (isMounted) {
          setError('Failed to load GitHub data');
          // Set fallback stats on error
          setStats({
            totalRepos: 12,
            totalStars: 24,
            followers: 4,
            recentCommits: [],
            featuredRepo: undefined
          });
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
  }, [featuredRepoName]);

  return { stats, isLoading, error };
}
