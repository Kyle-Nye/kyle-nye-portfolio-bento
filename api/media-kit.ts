import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { MediaKitData, MediaKitStat, MediaKitSocialLink, MediaKitRateCard } from '../types/mediaKit';

const MEDIA_KIT_URL = 'https://kit.media/geektak';
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

let cachedData: { data: MediaKitData; timestamp: number } | null = null;
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

function parseStats(html: string): MediaKitStat[] {
  const stats: MediaKitStat[] = [];
  const statTypeMap: Record<string, MediaKitStat['type']> = {
    'amazon': 'amazon',
    'items': 'items',
    'revenue': 'revenue',
    'videos': 'videos',
  };

  for (const [cssClass, type] of Object.entries(statTypeMap)) {
    const cardRegex = new RegExp(
      `mk-stat-card--${cssClass}"[\\s\\S]*?mk-stat-card__title">\\s*([\\s\\S]*?)\\s*</span>[\\s\\S]*?mk-stat-card__value">\\s*([\\s\\S]*?)\\s*</span>[\\s\\S]*?(?:(Verified)|</article>)`,
    );
    const match = html.match(cardRegex);
    if (match) {
      stats.push({
        label: match[1].trim(),
        value: match[2].trim(),
        type,
        verified: !!match[3],
      });
    }
  }

  return stats;
}

function parseSocialLinks(_html: string): MediaKitSocialLink[] {
  // Hardcoded — kit.media restructured their HTML and the scraper was
  // picking up SVG icon paths instead of real URLs. These rarely change.
  return [
    { platform: 'amazon', url: 'https://www.amazon.com/shop/geektak', label: 'Amazon Storefront' },
    { platform: 'instagram', url: 'https://www.instagram.com/geektak/', label: 'Instagram' },
    { platform: 'youtube', url: 'https://www.youtube.com/@geektakreviews', label: 'YouTube' },
    { platform: 'pinterest', url: 'https://www.pinterest.com/geektak/', label: 'Pinterest' },
  ];
}

function parseSpecializations(html: string): string[] {
  const chips: string[] = [];
  const chipRegex = /mk-spec-chip">\s*([\s\S]*?)\s*<\/span>/g;
  let match;
  while ((match = chipRegex.exec(html)) !== null) {
    chips.push(match[1].trim());
  }
  return chips;
}

function parseRateCard(html: string): MediaKitRateCard[] {
  const rates: MediaKitRateCard[] = [];
  const rateRegex = /mk-rate-card__row-title[\s\S]*?<span>\s*([\s\S]*?)\s*<\/span>[\s\S]*?mk-rate-card__row-price">\s*([\s\S]*?)\s*(?:<|$)/g;
  let match;
  while ((match = rateRegex.exec(html)) !== null) {
    rates.push({ service: match[1].trim(), price: match[2].trim() });
  }
  return rates;
}

function parseActiveSince(html: string): string {
  const match = html.match(/mk-meta__text">\s*Active since\s+([\s\S]*?)\s*<\/span>/);
  return match ? match[1].trim() : 'Oct 22 2023';
}

function parseAvatarUrl(html: string): string {
  const match = html.match(/mk-user-card__avatar[\s\S]*?src="([^"]+)"/);
  return match ? match[1] : '';
}

function parseName(html: string): string {
  const match = html.match(/mk-user-card__name">\s*([\s\S]*?)\s*<\/h1>/);
  return match ? match[1].trim() : 'Kyle Nye';
}

async function scrapeMediaKit(): Promise<MediaKitData> {
  const response = await fetch(MEDIA_KIT_URL, {
    headers: {
      'User-Agent': USER_AGENT,
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.5',
    },
    redirect: 'follow',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch media kit: ${response.status}`);
  }

  const html = await response.text();
  const specializations = parseSpecializations(html);

  return {
    name: parseName(html),
    avatarUrl: parseAvatarUrl(html),
    stats: parseStats(html),
    socialLinks: parseSocialLinks(html),
    specializations,
    videoTypes: specializations,
    rateCard: parseRateCard(html),
    activeSince: parseActiveSince(html),
    lastUpdated: new Date().toISOString(),
  };
}

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
    const data = await scrapeMediaKit();
    cachedData = { data, timestamp: Date.now() };

    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate=3600');
    res.setHeader('X-Cache', 'MISS');
    return res.status(200).json(data);
  } catch (error) {
    console.error('Scrape failed, serving fallback:', error);

    // Return stale cache if available
    if (cachedData) {
      res.setHeader('X-Cache', 'STALE');
      return res.status(200).json(cachedData.data);
    }

    // Last resort: return static fallback
    res.setHeader('X-Cache', 'FALLBACK');
    return res.status(200).json({
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
    } satisfies MediaKitData);
  }
}
