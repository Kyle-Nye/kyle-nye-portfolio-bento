import type { GitHubProfile, GitHubRepo, GitHubCommit, CacheEntry, GitHubStats } from '../types/github';

export class GitHubService {
  private username = 'Kyle-Nye';
  private cacheDuration = 24 * 60 * 60 * 1000; // 24 hours

  /**
   * Fetch user profile with caching
   */
  async getUserProfile(): Promise<GitHubProfile> {
    return this.fetchWithCache<GitHubProfile>('profile', async () => {
      const response = await fetch(`https://api.github.com/users/${this.username}`);
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }
      return response.json();
    });
  }

  /**
   * Fetch user repositories sorted by update date
   */
  async getRepositories(sort: 'updated' | 'stars' = 'updated'): Promise<GitHubRepo[]> {
    return this.fetchWithCache<GitHubRepo[]>(`repos-${sort}`, async () => {
      const response = await fetch(
        `https://api.github.com/users/${this.username}/repos?sort=${sort}&per_page=100`
      );
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }
      return response.json();
    });
  }

  /**
   * Fetch recent commits from a specific repository
   */
  async getRecentCommits(repo: string, limit = 5): Promise<GitHubCommit[]> {
    return this.fetchWithCache<GitHubCommit[]>(`commits-${repo}`, async () => {
      const response = await fetch(
        `https://api.github.com/repos/${this.username}/${repo}/commits?per_page=${limit}`
      );
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }
      return response.json();
    });
  }

  /**
   * Get aggregated GitHub stats
   */
  async getGitHubStats(featuredRepoName?: string): Promise<GitHubStats> {
    try {
      const [profile, repos] = await Promise.all([
        this.getUserProfile(),
        this.getRepositories('stars')
      ]);

      const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
      const featuredRepo = featuredRepoName
        ? repos.find(r => r.name === featuredRepoName)
        : repos[0];

      // Get recent commits from most active repo
      let recentCommits: GitHubCommit[] = [];
      if (featuredRepo) {
        try {
          recentCommits = await this.getRecentCommits(featuredRepo.name, 5);
        } catch (error) {
          console.warn('Failed to fetch recent commits:', error);
        }
      }

      return {
        totalRepos: profile.public_repos,
        totalStars,
        followers: profile.followers,
        recentCommits,
        featuredRepo
      };
    } catch (error) {
      console.error('Failed to fetch GitHub stats:', error);
      // Return fallback data
      return this.getFallbackStats();
    }
  }

  /**
   * Generic caching wrapper with localStorage
   */
  private async fetchWithCache<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
    const cacheKey = `gh-${key}`;

    // Periodically cleanup expired cache entries
    this.cleanupExpiredCache();

    // Check localStorage cache
    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const { data, timestamp }: CacheEntry<T> = JSON.parse(cached);
        const age = Date.now() - timestamp;

        // Return cached data if fresh
        if (age < this.cacheDuration) {
          console.log(`[GitHub Service] Using cached data for ${key} (${Math.round(age / 1000)}s old)`);
          return data;
        }
      }
    } catch (error) {
      console.warn('[GitHub Service] Cache read error:', error);
    }

    // Fetch fresh data
    try {
      const data = await fetcher();

      // Cache the fresh data
      try {
        const cacheEntry: CacheEntry<T> = {
          data,
          timestamp: Date.now()
        };
        localStorage.setItem(cacheKey, JSON.stringify(cacheEntry));
        console.log(`[GitHub Service] Cached fresh data for ${key}`);
      } catch (error) {
        console.warn('[GitHub Service] Cache write error:', error);
      }

      return data;
    } catch (error) {
      // On error, try to return stale cache if available
      try {
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          const { data }: CacheEntry<T> = JSON.parse(cached);
          console.warn(`[GitHub Service] Returning stale cache for ${key} due to fetch error`);
          return data;
        }
      } catch (cacheError) {
        // Ignore cache errors
      }

      // If no cache available, rethrow
      throw error;
    }
  }

  /**
   * Fallback data when API is unavailable
   */
  private getFallbackStats(): GitHubStats {
    return {
      totalRepos: 12,
      totalStars: 24,
      followers: 4,
      recentCommits: [],
      featuredRepo: undefined
    };
  }

  /**
   * Clear all cached GitHub data
   */
  clearCache(): void {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('gh-')) {
        localStorage.removeItem(key);
      }
    });
    console.log('[GitHub Service] Cache cleared');
  }

  /**
   * Remove expired cache entries (older than cacheDuration)
   */
  cleanupExpiredCache(): void {
    const keys = Object.keys(localStorage);
    let removedCount = 0;

    keys.forEach(key => {
      if (key.startsWith('gh-')) {
        try {
          const cached = localStorage.getItem(key);
          if (cached) {
            const { timestamp } = JSON.parse(cached);
            const age = Date.now() - timestamp;

            // Remove if expired
            if (age >= this.cacheDuration) {
              localStorage.removeItem(key);
              removedCount++;
            }
          }
        } catch (error) {
          // If parsing fails, remove the corrupted entry
          localStorage.removeItem(key);
          removedCount++;
        }
      }
    });

    if (removedCount > 0) {
      console.log(`[GitHub Service] Cleaned up ${removedCount} expired cache entries`);
    }
  }
}

// Export singleton instance
export const githubService = new GitHubService();
