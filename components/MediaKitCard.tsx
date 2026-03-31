import React from 'react';
import { motion } from 'framer-motion';
import {
  ShoppingBag,
  DollarSign,
  TrendingUp,
  Video,
  BadgeCheck,
  ExternalLink,
} from 'lucide-react';
import { useMediaKit } from '../hooks/useMediaKit';
import { formatDistanceToNow } from 'date-fns';
import type { MediaKitStat } from '../types/mediaKit';

const statIcons: Record<MediaKitStat['type'], React.ReactNode> = {
  amazon: <DollarSign size={14} />,
  items: <ShoppingBag size={14} />,
  revenue: <TrendingUp size={14} />,
  videos: <Video size={14} />,
};

const statColors: Record<MediaKitStat['type'], string> = {
  amazon: 'text-amber-500',
  items: 'text-emerald-500',
  revenue: 'text-blue-500',
  videos: 'text-purple-500',
};

const PlatformIcon: React.FC<{ platform: string; className?: string }> = ({ platform, className = '' }) => {
  switch (platform) {
    case 'amazon':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} width="16" height="16">
          <path d="M.045 18.02c.07-.116.36-.31.77-.58 3.53-2.26 7.33-3.39 11.41-3.39 2.84 0 5.5.51 7.97 1.54.46.19.77.35.94.48.16.12.24.24.24.35 0 .07-.03.14-.1.2-.06.06-.15.09-.26.09-.12 0-.37-.08-.74-.25-2.37-1.01-4.93-1.52-7.69-1.52-3.92 0-7.7 1.05-11.35 3.14-.26.16-.47.24-.61.24-.09 0-.17-.03-.22-.09-.05-.06-.08-.12-.08-.18zm20.67-1.65c-.09 0-.23-.04-.42-.13-1.82-.76-3.28-1.13-4.38-1.13-.58 0-1.16.09-1.72.26-.57.17-.85.36-.85.55 0 .1.05.18.16.25.11.07.28.1.51.1h.16c.57-.06 1.04-.09 1.42-.09 1.27 0 2.7.34 4.3 1.03.1.05.2.07.28.07.13 0 .22-.05.28-.16.06-.11.09-.21.09-.31 0-.15-.06-.28-.17-.37-.12-.09-.31-.12-.56-.06z" />
          <path d="M13.12 14.56c-.04 0-.08-.01-.12-.02-1.12-.28-2.13-.42-3.03-.42-1.67 0-3.24.39-4.71 1.18-.14.08-.25.11-.33.11-.12 0-.2-.06-.26-.17-.03-.06-.04-.12-.04-.18 0-.15.08-.29.25-.42C6.7 13.63 8.68 13.12 10.8 13.12c.93 0 1.87.12 2.83.36.2.05.3.16.3.33 0 .12-.04.23-.12.33-.11.14-.29.28-.52.42h-.17z" />
        </svg>
      );
    case 'instagram':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} width="16" height="16">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      );
    case 'youtube':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} width="16" height="16">
          <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );
    case 'pinterest':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} width="16" height="16">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641 0 12.017 0z" />
        </svg>
      );
    default:
      return null;
  }
};

const MediaKitCard: React.FC = () => {
  const { data, isLoading } = useMediaKit();

  if (isLoading || !data) {
    return (
      <div className="flex flex-col h-full animate-pulse">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-4 h-4 bg-zinc-800 rounded" />
          <div className="w-24 h-3 bg-zinc-800 rounded" />
        </div>
        <div className="grid grid-cols-2 gap-3 flex-1">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-zinc-900 rounded-lg p-3 border border-zinc-800">
              <div className="w-20 h-2.5 bg-zinc-800 rounded mb-3" />
              <div className="w-16 h-5 bg-zinc-800 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const lastUpdated = data.lastUpdated
    ? formatDistanceToNow(new Date(data.lastUpdated), { addSuffix: true })
    : 'unknown';

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-zinc-400">
          <ShoppingBag size={18} />
          <span className="uppercase tracking-widest text-xs font-bold font-mono">Media Kit</span>
        </div>
        <a
          href="https://kit.media/geektak"
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-600 hover:text-amber-500 transition-colors z-20 relative"
          aria-label="View full media kit"
        >
          <ExternalLink size={14} />
        </a>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-2 flex-1 min-h-0">
        {data.stats.map((stat, i) => (
          <motion.div
            key={stat.type}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-zinc-950 rounded-lg p-2.5 border border-zinc-800 flex flex-col justify-between min-h-0"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[9px] leading-tight text-zinc-500 font-mono uppercase tracking-wider line-clamp-1">
                {stat.label}
              </span>
              <span className={`shrink-0 ${statColors[stat.type]}`}>
                {statIcons[stat.type]}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-sm sm:text-base font-bold text-zinc-100 whitespace-nowrap">{stat.value}</span>
              {stat.verified && (
                <BadgeCheck size={11} className="text-amber-500 shrink-0" />
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Social Links */}
      <div className="flex items-center gap-2.5 mt-3 pt-2.5 border-t border-zinc-900">
        {data.socialLinks.map((link) => (
          <a
            key={link.platform}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-amber-500 transition-colors z-20 relative"
            aria-label={link.label}
            title={link.label}
          >
            <PlatformIcon platform={link.platform} />
          </a>
        ))}

        <span className="ml-auto text-[9px] text-zinc-600 font-mono truncate">
          Updated {lastUpdated}
        </span>
      </div>
    </div>
  );
};

export default MediaKitCard;
