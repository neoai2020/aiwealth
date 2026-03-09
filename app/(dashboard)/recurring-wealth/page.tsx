"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassPanel } from "@/components/ui/glass-panel";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/auth-context";
import { generateNicheImage, isPlaceholderImage } from "@/lib/generate-image";
import {
  RefreshCw,
  Rocket,
  Zap,
  Crown,
  ExternalLink,
  X,
  Copy,
  Check,
  CheckCircle,
  Loader2,
  Search,
  ClipboardPaste,
  ArrowRight,
  DollarSign,
  Percent,
  Calendar,
  Users,
  CreditCard,
  TrendingDown,
} from "lucide-react";

/* ─── Niche Palette ─── */
const NICHE_COLORS: Record<string, { text: string; bg: string; border: string }> = {
  "Pet Training": { text: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/20" },
  "YouTube / AI Tools": { text: "text-red-400", bg: "bg-red-400/10", border: "border-red-400/20" },
  "Health Supplements": { text: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/20" },
  "Online Education": { text: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/20" },
  "Financial Education": { text: "text-cyan-400", bg: "bg-cyan-400/10", border: "border-cyan-400/20" },
  "Presentations / Software": { text: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/20" },
  "Affiliate Marketing": { text: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/20" },
  "Dating / Relationships": { text: "text-pink-400", bg: "bg-pink-400/10", border: "border-pink-400/20" },
  "AI Writing Tools": { text: "text-violet-400", bg: "bg-violet-400/10", border: "border-violet-400/20" },
  "AI Platform": { text: "text-indigo-400", bg: "bg-indigo-400/10", border: "border-indigo-400/20" },
};
const DEFAULT_NC = { text: "text-gray-400", bg: "bg-gray-400/10", border: "border-gray-400/20" };

/* ─── Real Products ─── */
interface RecurringProduct {
  id: number;
  rank: number;
  name: string;
  niche: string;
  price: string;
  commission: string;
  earningsPerVisitor: string;
  vendor: string;
  onlineSince: string;
  paymentType: string;
  cartConversion: string;
  cancellationRate: string;
  productUrl: string;
  affiliateUrl: string;
}

const PRODUCTS: RecurringProduct[] = [
  {
    id: 1, rank: 1,
    name: "Online Training for Happy Dogs",
    niche: "Pet Training",
    price: "$16.08",
    commission: "25.00%",
    earningsPerVisitor: "$0.66",
    vendor: "trafficoftrust",
    onlineSince: "04/25/2025",
    paymentType: "Subscription",
    cartConversion: "2.00%",
    cancellationRate: "3.06%",
    productUrl: "https://dog-training.me/",
    affiliateUrl: "https://dog-training.me/affiliates",
  },
  {
    id: 2, rank: 2,
    name: "Tube Magic - AI Tools For Growing on YouTube",
    niche: "YouTube / AI Tools",
    price: "$47/month",
    commission: "50.00%",
    earningsPerVisitor: "$1.86",
    vendor: "tubemagic",
    onlineSince: "02/23/2024",
    paymentType: "Subscription",
    cartConversion: "1.00%",
    cancellationRate: "9.19%",
    productUrl: "https://tubemagic.com/ds",
    affiliateUrl: "https://tubemagic.com/affiliates",
  },
  {
    id: 3, rank: 3,
    name: "EchoXen",
    niche: "Health Supplements",
    price: "$219.49",
    commission: "70.00%",
    earningsPerVisitor: "$3.28",
    vendor: "RM7866",
    onlineSince: "06/30/2025",
    paymentType: "Single + Subscription",
    cartConversion: "2.00%",
    cancellationRate: "8.73%",
    productUrl: "https://getechoxen.com/",
    affiliateUrl: "https://digistore24-affiliate.mydigibiz24.com/echoxen",
  },
  {
    id: 4, rank: 4,
    name: "AlgePrime",
    niche: "Online Education",
    price: "$3,068.49",
    commission: "80.00%",
    earningsPerVisitor: "$75.30",
    vendor: "PeuCit",
    onlineSince: "08/14/2025",
    paymentType: "Subscription",
    cartConversion: "3.00%",
    cancellationRate: "14.23%",
    productUrl: "https://algeprime.com/",
    affiliateUrl: "https://algeprime.com/aff-support",
  },
  {
    id: 5, rank: 5,
    name: "M.S.S - The New Way of Spending Efficiently",
    niche: "Financial Education",
    price: "$1,879.82",
    commission: "80.00%",
    earningsPerVisitor: "$39.63",
    vendor: "PeuCit",
    onlineSince: "03/10/2025",
    paymentType: "Subscription",
    cartConversion: "5.00%",
    cancellationRate: "23.99%",
    productUrl: "https://digitalmss.com/",
    affiliateUrl: "https://gands-pass.com/mss",
  },
  {
    id: 6, rank: 6,
    name: "ExpertSlides",
    niche: "Presentations / Software",
    price: "avg $277.08",
    commission: "50.00%",
    earningsPerVisitor: "—",
    vendor: "expertslides",
    onlineSince: "08/17/2022",
    paymentType: "Subscription",
    cartConversion: "—",
    cancellationRate: "—",
    productUrl: "https://expertslides.com/expertslides-digistore24/",
    affiliateUrl: "https://expertslides.com/affiliate-program/",
  },
  {
    id: 7, rank: 7,
    name: "AffiliateMastermind.com",
    niche: "Affiliate Marketing",
    price: "$112.14",
    commission: "20.00%",
    earningsPerVisitor: "—",
    vendor: "affmastermind",
    onlineSince: "06/15/2024",
    paymentType: "Subscription",
    cartConversion: "—",
    cancellationRate: "—",
    productUrl: "https://affiliatemastermind.com/membership/",
    affiliateUrl: "https://affiliatemastermind.com/affiliates/",
  },
  {
    id: 8, rank: 8,
    name: "Stealth Attraction",
    niche: "Dating / Relationships",
    price: "$80.87",
    commission: "50.00%",
    earningsPerVisitor: "—",
    vendor: "seductiongurus",
    onlineSince: "04/26/2023",
    paymentType: "Subscription",
    cartConversion: "—",
    cancellationRate: "—",
    productUrl: "https://getherwetwithwords.com/videobc2/video-bc2/v02.php",
    affiliateUrl: "https://digistore24-affiliate.mydigibiz24.com/stealth-attraction",
  },
  {
    id: 9, rank: 9,
    name: "Writelytic",
    niche: "AI Writing Tools",
    price: "$332.96",
    commission: "30.00%",
    earningsPerVisitor: "—",
    vendor: "chiefim",
    onlineSince: "05/05/2023",
    paymentType: "Single + Subscription",
    cartConversion: "—",
    cancellationRate: "—",
    productUrl: "https://writelytic.com/",
    affiliateUrl: "https://dg24affiliates.writelytic.com/",
  },
  {
    id: 10, rank: 10,
    name: "Adaptichat - Cutting-Edge AI Platform",
    niche: "AI Platform",
    price: "$1,026.62",
    commission: "30.00%",
    earningsPerVisitor: "—",
    vendor: "chiefim",
    onlineSince: "03/29/2024",
    paymentType: "Subscription",
    cartConversion: "—",
    cancellationRate: "—",
    productUrl: "https://adaptichat.com/",
    affiliateUrl: "https://dg24affiliates.adaptichat.com/",
  },
];

/* ─── Sync Popup ─── */
function SyncPopup({
  product,
  onClose,
  onSynced,
}: {
  product: RecurringProduct;
  onClose: () => void;
  onSynced: () => void;
}) {
  const { user } = useAuth();
  const [promoLink, setPromoLink] = useState("");
  const [syncing, setSyncing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [step, setStep] = useState(1);

  const handleCopyName = () => {
    navigator.clipboard.writeText(product.name);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSync = async () => {
    if (!user || !promoLink.trim()) return;
    setSyncing(true);
    try {
      let imageUrl: string | null = null;
      try {
        const res = await fetch("/api/analyze-url", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: product.productUrl }),
        });
        const result = await res.json();
        if (result.success && result.data?.image && !isPlaceholderImage(result.data.image)) {
          imageUrl = result.data.image;
        }
      } catch {}

      if (!imageUrl) {
        imageUrl = generateNicheImage(product.name, product.niche);
      }

      const { error } = await supabase.from("bridges").insert({
        user_id: user.id,
        title: product.name,
        affiliate_url: promoLink.trim(),
        image_url: imageUrl,
        status: "live",
        traffic: "0",
        earnings: `${product.commission} recurring`,
        niche: product.niche,
      });
      if (!error) {
        onSynced();
        onClose();
      } else {
        console.error("Sync error:", error);
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-lg bg-black/95 border border-white/10 rounded-3xl p-8 shadow-2xl backdrop-blur-xl max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all">
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-extrabold text-white mb-1">Sync: {product.name}</h2>
            <p className="text-sm text-gray-400">Follow the steps below to get your affiliate promo link from Digistore24.</p>
          </div>

          {/* Steps */}
          <div className="space-y-4">
            {/* Step 1 */}
            <div className={cn("p-4 rounded-xl border transition-all", step >= 1 ? "bg-primary/5 border-primary/20" : "bg-white/[0.02] border-white/5")}>
              <div className="flex items-center gap-3 mb-2">
                <div className={cn("w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold", step > 1 ? "bg-emerald-500/20 text-emerald-400" : "bg-primary/20 text-primary")}>
                  {step > 1 ? <Check className="w-4 h-4" /> : "1"}
                </div>
                <span className="text-sm font-bold text-white">Copy the product name</span>
              </div>
              <div className="flex items-center gap-2 ml-10">
                <div className="flex-1 px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-xs text-gray-300 truncate">
                  {product.name}
                </div>
                <button onClick={() => { handleCopyName(); setStep(Math.max(step, 2)); }} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-primary/10 border border-primary/30 text-xs font-bold text-primary hover:bg-primary/20 transition-all shrink-0">
                  {copied ? <><Check className="w-3 h-3" /> Copied!</> : <><Copy className="w-3 h-3" /> Copy</>}
                </button>
              </div>
            </div>

            {/* Step 2 */}
            <div className={cn("p-4 rounded-xl border transition-all", step >= 2 ? "bg-primary/5 border-primary/20" : "bg-white/[0.02] border-white/5 opacity-50")}>
              <div className="flex items-center gap-3 mb-2">
                <div className={cn("w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold", step > 2 ? "bg-emerald-500/20 text-emerald-400" : step >= 2 ? "bg-primary/20 text-primary" : "bg-white/10 text-gray-500")}>
                  {step > 2 ? <Check className="w-4 h-4" /> : "2"}
                </div>
                <span className="text-sm font-bold text-white">Search for it on Digistore24</span>
              </div>
              <div className="ml-10 space-y-2">
                <p className="text-xs text-gray-400 leading-relaxed">
                  Go to <a href="https://www.digistore24.com/marketplace" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">digistore24.com/marketplace</a>, search for the product name, and click <strong className="text-white">&quot;Promote Now&quot;</strong> to get your unique promo link.
                </p>
                <a href="https://www.digistore24.com/marketplace" target="_blank" rel="noopener noreferrer" onClick={() => setStep(Math.max(step, 3))} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-gray-300 hover:text-white hover:bg-white/10 transition-all">
                  <Search className="w-3 h-3" /> Open Digistore24 Marketplace <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Step 3 */}
            <div className={cn("p-4 rounded-xl border transition-all", step >= 3 ? "bg-primary/5 border-primary/20" : "bg-white/[0.02] border-white/5 opacity-50")}>
              <div className="flex items-center gap-3 mb-2">
                <div className={cn("w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold", promoLink.trim() ? "bg-emerald-500/20 text-emerald-400" : step >= 3 ? "bg-primary/20 text-primary" : "bg-white/10 text-gray-500")}>
                  {promoLink.trim() ? <Check className="w-4 h-4" /> : "3"}
                </div>
                <span className="text-sm font-bold text-white">Paste your promo link here</span>
              </div>
              <div className="ml-10">
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <ClipboardPaste className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                    <input
                      type="text"
                      value={promoLink}
                      onChange={(e) => setPromoLink(e.target.value)}
                      placeholder="https://www.digistore24.com/redir/..."
                      className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:border-primary/40 transition-colors"
                      disabled={step < 3}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sync Button */}
          <button
            onClick={handleSync}
            disabled={!promoLink.trim() || syncing}
            className={cn(
              "w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-sm font-bold uppercase tracking-wider transition-all duration-300",
              promoLink.trim() && !syncing
                ? "bg-linear-to-r from-primary to-cyan-400 text-black hover:shadow-[0_0_20px_rgba(0,242,255,0.2)]"
                : "bg-white/5 border border-white/10 text-gray-600 cursor-not-allowed"
            )}
          >
            {syncing ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Syncing...</>
            ) : (
              <><Rocket className="w-4 h-4" /> Sync Product to My Pages</>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

/* ════════════════════════ PAGE ════════════════════════ */

export default function RecurringWealthPage() {
  const [syncedIds, setSyncedIds] = useState<Set<number>>(new Set());
  const [syncProduct, setSyncProduct] = useState<RecurringProduct | null>(null);

  const handleOpenSync = (product: RecurringProduct) => {
    setSyncProduct(product);
  };

  const handleSynced = (productId: number) => {
    setSyncedIds((prev) => new Set(prev).add(productId));
  };

  return (
    <div className="space-y-8 pb-20 font-(family-name:--font-display)">
      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="p-8 md:p-12 rounded-2xl border border-white/5 bg-linear-to-br from-amber-500/5 via-black/40 to-transparent backdrop-blur-sm text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-[10px] font-bold uppercase tracking-widest text-amber-400 mb-6">
          <Crown className="w-3.5 h-3.5" /> Premium Feature
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
          Top 10 Recurring{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-400 via-yellow-400 to-amber-400">Income Products</span>
        </h1>
        <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
          These products pay you <span className="text-white font-semibold">every month</span> for every customer you refer. Real Digistore24 products with recurring commissions.
        </p>
      </motion.div>

      {/* Product List */}
      <div className="space-y-4">
        {PRODUCTS.map((product, index) => {
          const nc = NICHE_COLORS[product.niche] || DEFAULT_NC;
          const isSynced = syncedIds.has(product.id);

          return (
            <motion.div key={product.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
              <GlassPanel intensity="low" className="p-5 md:p-6 border-white/5 hover:border-amber-500/20 transition-all duration-300">
                <div className="flex flex-col gap-5">
                  {/* Top Row: Rank + Name + Niche */}
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center font-extrabold text-lg shrink-0",
                      product.rank <= 3
                        ? "bg-amber-500/15 border border-amber-500/30 text-amber-400"
                        : "bg-white/5 border border-white/10 text-gray-500"
                    )}>
                      #{product.rank}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold text-white">{product.name}</h3>
                      <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                        <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border", nc.text, nc.bg, nc.border)}>
                          {product.niche}
                        </span>
                        <span className="text-[10px] text-gray-600">by {product.vendor}</span>
                        <span className="text-[10px] text-gray-600">· Since {product.onlineSince}</span>
                      </div>
                    </div>
                    {isSynced && (
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-400/10 border border-emerald-400/20 shrink-0">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-[10px] font-bold text-emerald-400 uppercase">Synced</span>
                      </div>
                    )}
                  </div>

                  {/* Stats Row */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    <div className="bg-black/30 px-3 py-2.5 rounded-lg border border-white/5">
                      <div className="flex items-center gap-1.5 mb-1"><DollarSign className="w-3 h-3 text-gray-500" /><span className="text-[10px] text-gray-500 uppercase">Price</span></div>
                      <div className="text-sm font-bold text-white">{product.price}</div>
                    </div>
                    <div className="bg-black/30 px-3 py-2.5 rounded-lg border border-white/5">
                      <div className="flex items-center gap-1.5 mb-1"><Percent className="w-3 h-3 text-gray-500" /><span className="text-[10px] text-gray-500 uppercase">Commission</span></div>
                      <div className="text-sm font-bold text-emerald-400">{product.commission}</div>
                    </div>
                    <div className="bg-black/30 px-3 py-2.5 rounded-lg border border-white/5">
                      <div className="flex items-center gap-1.5 mb-1"><TrendingDown className="w-3 h-3 text-gray-500" /><span className="text-[10px] text-gray-500 uppercase">Earn/Visitor</span></div>
                      <div className="text-sm font-bold text-primary">{product.earningsPerVisitor}</div>
                    </div>
                    <div className="bg-black/30 px-3 py-2.5 rounded-lg border border-white/5">
                      <div className="flex items-center gap-1.5 mb-1"><CreditCard className="w-3 h-3 text-gray-500" /><span className="text-[10px] text-gray-500 uppercase">Payment</span></div>
                      <div className="text-xs font-bold text-white">{product.paymentType}</div>
                    </div>
                    {product.cartConversion !== "—" && (
                      <div className="bg-black/30 px-3 py-2.5 rounded-lg border border-white/5">
                        <div className="flex items-center gap-1.5 mb-1"><Users className="w-3 h-3 text-gray-500" /><span className="text-[10px] text-gray-500 uppercase">Cart Conv.</span></div>
                        <div className="text-sm font-bold text-white">{product.cartConversion}</div>
                      </div>
                    )}
                    {product.cancellationRate !== "—" && (
                      <div className="bg-black/30 px-3 py-2.5 rounded-lg border border-white/5">
                        <div className="flex items-center gap-1.5 mb-1"><RefreshCw className="w-3 h-3 text-gray-500" /><span className="text-[10px] text-gray-500 uppercase">Cancel Rate</span></div>
                        <div className="text-sm font-bold text-white">{product.cancellationRate}</div>
                      </div>
                    )}
                  </div>

                  {/* CTAs */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={() => handleOpenSync(product)}
                      disabled={isSynced}
                      className={cn(
                        "inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300",
                        isSynced
                          ? "bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 cursor-default"
                          : "bg-linear-to-r from-primary to-cyan-400 text-black hover:shadow-[0_0_20px_rgba(0,242,255,0.2)]"
                      )}
                    >
                      {isSynced ? (<><CheckCircle className="w-3.5 h-3.5" /> Synced</>) : (<><Rocket className="w-3.5 h-3.5" /> Sync This Product</>)}
                    </button>

                    <a
                      href={product.productUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-gray-400 uppercase tracking-wider hover:bg-white/10 hover:text-white transition-all"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Check Product
                    </a>
                  </div>
                </div>
              </GlassPanel>
            </motion.div>
          );
        })}
      </div>

      {/* Modals */}
      <AnimatePresence>
        {syncProduct && (
          <SyncPopup
            product={syncProduct}
            onClose={() => setSyncProduct(null)}
            onSynced={() => handleSynced(syncProduct.id)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
