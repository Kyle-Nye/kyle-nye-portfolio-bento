// GitHub API response types

export interface GitHubProfile {
  login: string;
  name: string;
  avatar_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
  blog: string;
  location: string | null;
  email: string | null;
  hireable: boolean | null;
  created_at: string;
  updated_at: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  created_at: string;
  topics: string[];
  homepage: string | null;
  size: number;
}

export interface GitHubCommit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      email: string;
      date: string;
    };
    committer: {
      name: string;
      email: string;
      date: string;
    };
  };
  html_url: string;
  author: {
    login: string;
    avatar_url: string;
  } | null;
}

export interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

export interface GitHubStats {
  totalRepos: number;
  totalStars: number;
  followers: number;
  recentCommits: GitHubCommit[];
  featuredRepo?: GitHubRepo;
}
