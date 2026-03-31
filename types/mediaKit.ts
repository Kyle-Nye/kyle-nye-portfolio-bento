export interface MediaKitStat {
  label: string;
  value: string;
  type: 'amazon' | 'items' | 'revenue' | 'videos';
  verified: boolean;
}

export interface MediaKitSocialLink {
  platform: 'amazon' | 'instagram' | 'youtube' | 'pinterest';
  url: string;
  label: string;
}

export interface MediaKitRateCard {
  service: string;
  price: string;
}

export interface MediaKitData {
  name: string;
  avatarUrl: string;
  stats: MediaKitStat[];
  socialLinks: MediaKitSocialLink[];
  specializations: string[];
  videoTypes: string[];
  rateCard: MediaKitRateCard[];
  activeSince: string;
  lastUpdated: string;
}
