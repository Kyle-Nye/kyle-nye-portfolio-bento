export interface PricingTier {
  id: string;
  category: string;
  description: string;
  priceRange: string;
  details: string[];
}

export interface UsageRightsTier {
  duration: string;
  price: string;
  included?: boolean;
}

export interface AddOn {
  name: string;
  price: string;
  description: string;
}
