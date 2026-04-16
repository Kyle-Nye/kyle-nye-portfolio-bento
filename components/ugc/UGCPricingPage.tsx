import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Eye, Video, Mail } from 'lucide-react';
import { useYouTube } from '../../hooks/useYouTube';
import { CONTENT_TIERS } from '../../constants/ugcPricing';
import PricingCard from './PricingCard';
import UsageRightsTable from './UsageRightsTable';
import AddOnsList from './AddOnsList';

const UGCPricingPage: React.FC = () => {
  const { data: ytData, isLoading: ytLoading } = useYouTube();

  useEffect(() => {
    document.title = 'UGC Content Pricing | Kyle Nye';
    window.scrollTo(0, 0);
    return () => {
      document.title = 'Kyle Nye | AI Solutions Architect & Systems Engineer';
    };
  }, []);

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 p-4 md:p-8 font-sans selection:bg-amber-500/30 selection:text-black">
      <div className="max-w-4xl mx-auto">
        {/* Back Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-zinc-500 hover:text-amber-500 transition-colors text-sm font-mono"
          >
            <ArrowLeft size={16} />
            <span>Back to Portfolio</span>
          </Link>
        </motion.div>

        {/* Hero */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">
            UGC Content Pricing
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl">
            Authentic tech product content that converts. From unboxings to in-depth reviews,
            crafted for brands that want real engagement.
          </p>
        </motion.header>

        {/* YouTube Credibility Banner */}
        {ytData && !ytLoading && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="flex flex-wrap items-center gap-6 mb-10 p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl"
          >
            <a
              href="https://www.youtube.com/@geektakreviews"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-zinc-400 hover:text-red-400 text-xs font-mono uppercase tracking-wider transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="text-red-500" width="16" height="16">
                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              <span>@geektakreviews</span>
            </a>
            <div className="flex items-center gap-2">
              <Eye size={14} className="text-zinc-500" />
              <span className="text-zinc-200 text-sm font-semibold">{ytData.totalViews}</span>
              <span className="text-zinc-500 text-xs">total views</span>
            </div>
            <div className="flex items-center gap-2">
              <Video size={14} className="text-zinc-500" />
              <span className="text-zinc-200 text-sm font-semibold">{ytData.videoCount}</span>
              <span className="text-zinc-500 text-xs">videos</span>
            </div>
          </motion.div>
        )}

        {/* Pricing Cards Grid */}
        <section className="mb-10">
          <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500 font-bold mb-4">
            Content Deliverables
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CONTENT_TIERS.map((tier, i) => (
              <PricingCard key={tier.id} tier={tier} index={i} />
            ))}
          </div>
        </section>

        {/* Usage Rights + Add-Ons */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-10">
          <UsageRightsTable />
          <AddOnsList />
        </div>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center py-12 border-t border-zinc-900"
        >
          <h2 className="text-2xl font-bold text-white mb-2">Ready to collaborate?</h2>
          <p className="text-zinc-400 text-sm mb-6">
            Custom packages available. Let's find the right fit for your brand.
          </p>
          <a
            href="mailto:geektak@gmail.com?subject=UGC%20Collaboration%20Inquiry"
            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-black font-semibold rounded-lg transition-colors text-sm"
          >
            <Mail size={16} />
            Get in Touch
          </a>
        </motion.section>

        {/* Footer */}
        <footer className="pt-8 pb-8 flex justify-between items-center text-zinc-600 text-xs font-mono uppercase tracking-widest border-t border-zinc-900">
          <span>&copy; {new Date().getFullYear()} Kyle Nye.</span>
          <span className="text-zinc-700">Prices subject to scope and complexity</span>
        </footer>
      </div>
    </main>
  );
};

export default UGCPricingPage;
