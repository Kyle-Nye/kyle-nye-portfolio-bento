import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Youtube, ShoppingBag, Video, Check } from 'lucide-react';
import type { PricingTier } from '../../types/ugcPricing';

const iconMap: Record<string, React.ReactNode> = {
  'ig-reels': <Instagram size={20} />,
  'ig-stories': <Instagram size={20} />,
  'yt-review': <Youtube size={20} />,
  'amz-video': <ShoppingBag size={20} />,
};

const accentMap: Record<string, string> = {
  'ig-reels': 'text-pink-500',
  'ig-stories': 'text-purple-500',
  'yt-review': 'text-red-500',
  'amz-video': 'text-amber-500',
};

const borderMap: Record<string, string> = {
  'ig-reels': 'hover:border-pink-500/30',
  'ig-stories': 'hover:border-purple-500/30',
  'yt-review': 'hover:border-red-500/30',
  'amz-video': 'hover:border-amber-500/30',
};

interface PricingCardProps {
  tier: PricingTier;
  index: number;
}

const PricingCard: React.FC<PricingCardProps> = ({ tier, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.1 }}
      className={`bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 flex flex-col transition-colors ${borderMap[tier.id] || 'hover:border-zinc-700'}`}
    >
      <div className="flex items-center gap-3 mb-4">
        <span className={accentMap[tier.id] || 'text-zinc-400'}>
          {iconMap[tier.id] || <Video size={20} />}
        </span>
        <div>
          <h3 className="text-zinc-100 font-semibold text-sm">{tier.category}</h3>
          <p className="text-zinc-500 text-xs">{tier.description}</p>
        </div>
      </div>

      <div className="text-2xl font-bold text-white mb-4 font-mono">
        {tier.priceRange}
      </div>

      <ul className="space-y-2 flex-1">
        {tier.details.map((detail) => (
          <li key={detail} className="flex items-start gap-2 text-zinc-400 text-xs">
            <Check size={12} className="text-amber-500 shrink-0 mt-0.5" />
            <span>{detail}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default PricingCard;
