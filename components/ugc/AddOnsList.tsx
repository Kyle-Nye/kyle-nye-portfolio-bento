import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Zap } from 'lucide-react';
import { ADD_ONS } from '../../constants/ugcPricing';

const AddOnsList: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <Zap size={18} className="text-amber-500" />
        <h3 className="text-zinc-100 font-semibold text-sm uppercase tracking-wider font-mono">
          Add-Ons
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {ADD_ONS.map((addon) => (
          <div
            key={addon.name}
            className="flex items-start gap-3 p-3 bg-zinc-950/50 rounded-lg border border-zinc-800"
          >
            <Plus size={14} className="text-zinc-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="text-zinc-200 text-xs font-medium">{addon.name}</span>
              <span className="text-amber-500 text-xs font-mono ml-2">{addon.price}</span>
              <p className="text-zinc-500 text-[11px] mt-0.5">{addon.description}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default AddOnsList;
