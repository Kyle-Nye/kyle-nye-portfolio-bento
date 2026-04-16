import type { PricingTier, UsageRightsTier, AddOn } from '../types/ugcPricing';

export const CONTENT_TIERS: PricingTier[] = [
  {
    id: 'ig-reels',
    category: 'Instagram Reels',
    description: '15–60 second vertical video content',
    priceRange: '$200–$350',
    details: [
      'Hook + product showcase + CTA',
      'Professional editing with text overlays',
      'Vertical format optimized for Reels',
      '1 round of revisions included',
    ],
  },
  {
    id: 'ig-stories',
    category: 'Instagram Stories',
    description: 'Set of 3–5 story frames',
    priceRange: '$100–$200',
    details: [
      'Swipe-through product showcase',
      'Authentic, candid style',
      'CTA slides with link stickers',
      'Delivered as individual frames',
    ],
  },
  {
    id: 'yt-review',
    category: 'YouTube Video Review',
    description: '5–15 minute in-depth product review',
    priceRange: '$500–$1,000',
    details: [
      'Scripted with talking head + b-roll',
      'Unboxing, demo, and honest take',
      'Multi-camera angles and screen recordings',
      'Professional editing, music, and graphics',
    ],
  },
  {
    id: 'amz-video',
    category: 'Amazon Product Video',
    description: '30–90 second shoppable video',
    priceRange: '$200–$400',
    details: [
      'Amazon-spec compliant formatting',
      'Product demo with feature highlights',
      'Clean lifestyle and b-roll footage',
      'Optimized for Amazon product listings',
    ],
  },
];

export const USAGE_RIGHTS: UsageRightsTier[] = [
  { duration: '30-Day Organic', price: 'Included', included: true },
  { duration: '30-Day Paid Ads', price: '+$150–$300' },
  { duration: '90-Day All Use', price: '+$300–$500' },
  { duration: 'Perpetuity / Buyout', price: '+$500–$1,000' },
];

export const ADD_ONS: AddOn[] = [
  {
    name: 'Whitelisting / Spark Ads',
    price: '$150–$250/mo',
    description: 'Brand runs ads from creator account handle',
  },
  {
    name: 'Raw Footage',
    price: '+$75–$150',
    description: 'Unedited clips for brand repurposing',
  },
  {
    name: 'Expedited Delivery',
    price: '+30% rush fee',
    description: '24–48hr turnaround vs. standard 5–7 days',
  },
  {
    name: 'Additional Revisions',
    price: '$50/round',
    description: 'Beyond the included revision round',
  },
  {
    name: 'Hook Variations',
    price: '+$75/variation',
    description: '2–3 different opening hooks for A/B testing',
  },
  {
    name: 'Product Photography',
    price: '+$75–$150',
    description: 'Set of 3–5 edited product stills',
  },
];
