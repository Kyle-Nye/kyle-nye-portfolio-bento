import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Check } from 'lucide-react';
import { USAGE_RIGHTS } from '../../constants/ugcPricing';

const UsageRightsTable: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <Shield size={18} className="text-amber-500" />
        <h3 className="text-zinc-100 font-semibold text-sm uppercase tracking-wider font-mono">
          Usage Rights & Licensing
        </h3>
      </div>
      <p className="text-zinc-500 text-xs mb-4">
        All content includes 30-day organic usage. Extended licensing is available as an add-on.
      </p>

      <div className="space-y-2">
        {USAGE_RIGHTS.map((tier) => (
          <div
            key={tier.duration}
            className={`flex items-center justify-between p-3 rounded-lg border ${
              tier.included
                ? 'bg-amber-500/5 border-amber-500/20'
                : 'bg-zinc-950/50 border-zinc-800'
            }`}
          >
            <div className="flex items-center gap-2">
              {tier.included && <Check size={14} className="text-amber-500" />}
              <span className={`text-sm ${tier.included ? 'text-amber-500 font-medium' : 'text-zinc-300'}`}>
                {tier.duration}
              </span>
            </div>
            <span className={`text-sm font-mono ${tier.included ? 'text-amber-500 font-semibold' : 'text-zinc-400'}`}>
              {tier.price}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default UsageRightsTable;
