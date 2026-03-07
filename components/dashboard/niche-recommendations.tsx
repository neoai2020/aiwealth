"use client";

import { motion } from "framer-motion";
import { GlassPanel } from "@/components/ui/glass-panel";
import { NeonButton } from "@/components/ui/neon-button";
import {
  Sparkles,
  Heart,
  Wallet,
  Brain,
  Dumbbell,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

interface NicheCard {
  name: string;
  icon: React.ElementType;
  commissionRange: string;
  productCount: number;
  color: string;
  gradient: string;
}

const RECOMMENDED_NICHES: NicheCard[] = [
  {
    name: "Health & Fitness",
    icon: Dumbbell,
    commissionRange: "$30 – $120",
    productCount: 142,
    color: "text-emerald-400",
    gradient: "from-emerald-500/10 to-transparent",
  },
  {
    name: "Personal Finance",
    icon: Wallet,
    commissionRange: "$40 – $200",
    productCount: 98,
    color: "text-cyan-400",
    gradient: "from-cyan-500/10 to-transparent",
  },
  {
    name: "Self-Improvement",
    icon: Brain,
    commissionRange: "$25 – $150",
    productCount: 117,
    color: "text-purple-400",
    gradient: "from-purple-500/10 to-transparent",
  },
  {
    name: "Online Business",
    icon: Sparkles,
    commissionRange: "$50 – $250",
    productCount: 83,
    color: "text-amber-400",
    gradient: "from-amber-500/10 to-transparent",
  },
  {
    name: "Relationships",
    icon: Heart,
    commissionRange: "$20 – $100",
    productCount: 64,
    color: "text-rose-400",
    gradient: "from-rose-500/10 to-transparent",
  },
];

export function NicheRecommendations() {
  return (
    <section>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
          <BookOpen className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white font-(family-name:--font-display)">
            Recommended Niches for You
          </h3>
          <p className="text-sm text-gray-400">
            Top-performing categories on Digistore24
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {RECOMMENDED_NICHES.map((niche, index) => (
          <motion.div
            key={niche.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
          >
            <GlassPanel
              intensity="low"
              className="p-5 h-full group hover:bg-white/5 transition-all duration-500 border-white/5 hover:border-primary/30 hover:shadow-[0_0_20px_rgba(0,242,255,0.1)] flex flex-col"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-linear-to-br ${niche.gradient} border border-white/5 flex items-center justify-center mb-4`}
              >
                <niche.icon className={`w-6 h-6 ${niche.color}`} />
              </div>

              <h4 className="text-sm font-bold text-white mb-3">
                {niche.name}
              </h4>

              <div className="space-y-2 mb-5 flex-1">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] text-gray-500 uppercase tracking-wider">
                    Commission
                  </span>
                  <span className="text-xs font-semibold text-primary">
                    {niche.commissionRange}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[11px] text-gray-500 uppercase tracking-wider">
                    Products
                  </span>
                  <span className="text-xs font-semibold text-gray-300">
                    {niche.productCount}
                  </span>
                </div>
              </div>

              <Link href={`/sync?niche=${encodeURIComponent(niche.name)}`}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-gray-300 uppercase tracking-wider hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all duration-300"
                >
                  Explore
                  <ArrowRight className="w-3.5 h-3.5" />
                </motion.button>
              </Link>
            </GlassPanel>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
