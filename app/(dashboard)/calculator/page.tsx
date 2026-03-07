"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassPanel } from "@/components/ui/glass-panel";
import { NeonButton } from "@/components/ui/neon-button";
import {
  DollarSign,
  ArrowRight,
  Loader2,
  Target,
  TrendingUp,
  Star,
  Zap,
  BarChart3,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

type Step = "input" | "loading" | "results";

const LOADING_MESSAGES = [
  "Analyzing market data...",
  "Scanning top products...",
  "Optimizing your strategy...",
  "Building your plan...",
];

interface NicheResult {
  name: string;
  avgCommission: string;
  topProduct: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  color: string;
  gradient: string;
}

const NICHE_POOL: NicheResult[] = [
  {
    name: "Health & Fitness",
    avgCommission: "$47.50",
    topProduct: "Ultimate Keto Meal Plan",
    difficulty: "Beginner",
    color: "text-emerald-400",
    gradient: "from-emerald-500/10 to-transparent",
  },
  {
    name: "Personal Finance",
    avgCommission: "$82.00",
    topProduct: "Crypto Wealth Blueprint",
    difficulty: "Intermediate",
    color: "text-cyan-400",
    gradient: "from-cyan-500/10 to-transparent",
  },
  {
    name: "Self-Improvement",
    avgCommission: "$36.00",
    topProduct: "Manifestation Mastery",
    difficulty: "Beginner",
    color: "text-purple-400",
    gradient: "from-purple-500/10 to-transparent",
  },
  {
    name: "Online Business",
    avgCommission: "$120.00",
    topProduct: "AI Profit System",
    difficulty: "Intermediate",
    color: "text-amber-400",
    gradient: "from-amber-500/10 to-transparent",
  },
  {
    name: "Weight Loss",
    avgCommission: "$54.00",
    topProduct: "30-Day Slim Down",
    difficulty: "Beginner",
    color: "text-rose-400",
    gradient: "from-rose-500/10 to-transparent",
  },
  {
    name: "Relationship Coaching",
    avgCommission: "$68.00",
    topProduct: "Magnetic Attraction Guide",
    difficulty: "Intermediate",
    color: "text-pink-400",
    gradient: "from-pink-500/10 to-transparent",
  },
  {
    name: "Productivity",
    avgCommission: "$42.00",
    topProduct: "Deep Focus Framework",
    difficulty: "Beginner",
    color: "text-blue-400",
    gradient: "from-blue-500/10 to-transparent",
  },
  {
    name: "Spirituality",
    avgCommission: "$55.00",
    topProduct: "Chakra Awakening System",
    difficulty: "Advanced",
    color: "text-violet-400",
    gradient: "from-violet-500/10 to-transparent",
  },
];

const difficultyConfig = {
  Beginner: {
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/30",
  },
  Intermediate: {
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    border: "border-amber-400/30",
  },
  Advanced: {
    color: "text-rose-400",
    bg: "bg-rose-400/10",
    border: "border-rose-400/30",
  },
};

export default function SyncCalculatorPage() {
  const [step, setStep] = useState<Step>("input");
  const [incomeTarget, setIncomeTarget] = useState("");
  const [loadingMsgIndex, setLoadingMsgIndex] = useState(0);
  const [selectedNiches, setSelectedNiches] = useState<NicheResult[]>([]);
  const [dailyProducts, setDailyProducts] = useState(7);
  const [parsedTarget, setParsedTarget] = useState(0);

  const handleCalculate = useCallback(() => {
    const val = parseFloat(incomeTarget.replace(/[^0-9.]/g, ""));
    if (!val || val <= 0) return;

    setParsedTarget(val);
    setStep("loading");
    setLoadingMsgIndex(0);

    const shuffled = [...NICHE_POOL].sort(() => Math.random() - 0.5);
    const count = val >= 2000 ? 5 : val >= 1000 ? 4 : 3;
    setSelectedNiches(shuffled.slice(0, count));

    const daily = Math.max(3, Math.min(15, Math.ceil(val / 150)));
    setDailyProducts(daily);
  }, [incomeTarget]);

  useEffect(() => {
    if (step !== "loading") return;
    let idx = 0;

    const interval = setInterval(() => {
      idx += 1;
      if (idx >= LOADING_MESSAGES.length) {
        clearInterval(interval);
        setTimeout(() => setStep("results"), 600);
        return;
      }
      setLoadingMsgIndex(idx);
    }, 1000);

    return () => clearInterval(interval);
  }, [step]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleCalculate();
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center font-(family-name:--font-display)">
      <AnimatePresence mode="wait">
        {/* STEP 1 — Income Target Input */}
        {step === "input" && (
          <motion.div
            key="input"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-2xl text-center"
          >
            <div className="mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.1 }}
                className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6"
              >
                <Target className="w-10 h-10 text-primary" />
              </motion.div>

              <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
                What&apos;s Your Income{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-cyan-400 to-primary">
                  Target?
                </span>
              </h1>
              <p className="text-gray-400 text-lg max-w-md mx-auto">
                Tell us how much you want to earn monthly and we&apos;ll build
                your personalized plan
              </p>
            </div>

            <GlassPanel
              intensity="medium"
              className="p-8 md:p-10 border-white/5"
            >
              <div className="relative max-w-md mx-auto mb-8">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <DollarSign className="w-6 h-6 text-primary" />
                </div>
                <input
                  type="text"
                  inputMode="numeric"
                  value={incomeTarget}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, "");
                    if (raw) {
                      setIncomeTarget(
                        parseInt(raw).toLocaleString("en-US")
                      );
                    } else {
                      setIncomeTarget("");
                    }
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="5,000"
                  className="w-full pl-12 pr-6 py-5 bg-black/60 border border-white/10 rounded-2xl text-3xl font-extrabold text-white text-center placeholder-gray-600 focus:outline-none focus:border-primary/50 focus:shadow-[0_0_30px_rgba(0,242,255,0.15)] transition-all duration-300"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <span className="text-sm text-gray-500 font-bold">
                    /month
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {[1000, 2500, 5000, 10000].map((preset) => (
                  <button
                    key={preset}
                    onClick={() =>
                      setIncomeTarget(preset.toLocaleString("en-US"))
                    }
                    className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-gray-400 hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all duration-200"
                  >
                    ${preset.toLocaleString("en-US")}
                  </button>
                ))}
              </div>

              <NeonButton
                onClick={handleCalculate}
                className="px-10 py-4 text-base"
                disabled={
                  !incomeTarget ||
                  parseFloat(incomeTarget.replace(/[^0-9.]/g, "")) <= 0
                }
              >
                Calculate My Plan
                <ArrowRight className="w-5 h-5" />
              </NeonButton>
            </GlassPanel>
          </motion.div>
        )}

        {/* STEP 2 — Loading / Analysis */}
        {step === "loading" && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-lg text-center"
          >
            <div className="mb-10">
              <div className="relative w-24 h-24 mx-auto mb-8">
                <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <BarChart3 className="w-8 h-8 text-primary" />
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.p
                  key={loadingMsgIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-xl font-bold text-white"
                >
                  {LOADING_MESSAGES[loadingMsgIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="flex justify-center gap-2">
              {LOADING_MESSAGES.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i <= loadingMsgIndex
                      ? "w-8 bg-primary"
                      : "w-4 bg-white/10"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* STEP 3 — Results & Recommendation */}
        {step === "results" && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-4xl"
          >
            <div className="text-center mb-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-5"
              >
                <CheckCircle className="w-8 h-8 text-primary" />
              </motion.div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-2">
                Here&apos;s Your Personalized Plan
              </h2>
              <p className="text-gray-400 text-lg">
                Tailored to your $
                {parseInt(
                  incomeTarget.replace(/[^0-9]/g, "")
                ).toLocaleString("en-US")}
                /month goal
              </p>
            </div>

            {/* Key Recommendation Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <GlassPanel
                intensity="medium"
                className="p-6 md:p-8 mb-6 border-primary/20 bg-linear-to-br from-primary/5 via-transparent to-cyan-500/5"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      Recommended Starting Strategy
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      Based on current market conditions, we recommend targeting{" "}
                      <span className="text-primary font-bold">
                        ${Math.ceil(parsedTarget / 30).toLocaleString("en-US")}/day
                      </span>{" "}
                      to reach your{" "}
                      <span className="text-white font-bold">
                        ${parsedTarget.toLocaleString("en-US")}/month
                      </span>{" "}
                      goal. Follow the daily activity plan below to get started.
                    </p>
                  </div>
                </div>
              </GlassPanel>
            </motion.div>

            {/* Daily Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <GlassPanel
                intensity="low"
                className="p-6 mb-6 border-white/5"
              >
                <div className="flex items-center gap-3 mb-1">
                  <Zap className="w-5 h-5 text-amber-400" />
                  <h3 className="text-base font-bold text-white">
                    Recommended Daily Activity
                  </h3>
                </div>
                <p className="text-gray-400 text-sm mb-4 ml-8">
                  Sync{" "}
                  <span className="text-white font-bold">{dailyProducts} products per day</span>{" "}
                  across these high-performing niches:
                </p>
              </GlassPanel>
            </motion.div>

            {/* Niche Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {selectedNiches.map((niche, index) => {
                const dc = difficultyConfig[niche.difficulty];
                return (
                  <motion.div
                    key={niche.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <GlassPanel
                      intensity="low"
                      className="p-5 h-full border-white/5 hover:border-primary/20 hover:shadow-[0_0_20px_rgba(0,242,255,0.08)] transition-all duration-500"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h4
                          className={`text-sm font-bold ${niche.color}`}
                        >
                          {niche.name}
                        </h4>
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${dc.bg} ${dc.color} ${dc.border}`}
                        >
                          {niche.difficulty}
                        </span>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-[11px] text-gray-500 uppercase tracking-wider">
                            Avg Commission
                          </span>
                          <span className="text-sm font-bold text-white">
                            {niche.avgCommission}
                          </span>
                        </div>
                        <div className="border-t border-white/5" />
                        <div>
                          <span className="text-[11px] text-gray-500 uppercase tracking-wider block mb-1">
                            Top Product
                          </span>
                          <span className="text-sm text-gray-300 font-medium">
                            {niche.topProduct}
                          </span>
                        </div>
                      </div>
                    </GlassPanel>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA — Start Immediately */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-center"
            >
              <GlassPanel
                intensity="medium"
                className="p-8 border-primary/20 bg-linear-to-r from-primary/5 via-transparent to-cyan-500/5"
              >
                <Sparkles className="w-8 h-8 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">
                  Ready to Execute Your Plan?
                </h3>
                <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">
                  Head to Wealth Sync and start syncing products to build your
                  income streams right now.
                </p>
                <Link href="/sync">
                  <NeonButton className="px-10 py-4 text-base">
                    Start Immediately
                    <ArrowRight className="w-5 h-5" />
                  </NeonButton>
                </Link>
              </GlassPanel>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
