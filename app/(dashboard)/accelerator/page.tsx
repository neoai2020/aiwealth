"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassPanel } from "@/components/ui/glass-panel";
import { NeonButton } from "@/components/ui/neon-button";
import { cn } from "@/lib/utils";
import {
  Rocket,
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  CheckCircle,
  Zap,
  Copy,
  Check,
  Download,
  ChevronDown,
  X,
  Eye,
  Facebook,
  Twitter,
  Instagram,
  ArrowLeft,
  Image as ImageIcon,
  FileText,
  Sparkles,
} from "lucide-react";

/* ─── Niche Palette ─── */
const NICHE_LIST = [
  "Health & Fitness",
  "Personal Finance",
  "Self-Improvement",
  "Online Business",
  "Weight Loss",
  "Crypto Trading",
  "Manifestation",
  "Relationship Coaching",
  "Productivity",
  "Spirituality",
] as const;
type Niche = (typeof NICHE_LIST)[number];

const NICHE_COLORS: Record<string, { text: string; bg: string; border: string }> = {
  "Health & Fitness": { text: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/20" },
  "Personal Finance": { text: "text-cyan-400", bg: "bg-cyan-400/10", border: "border-cyan-400/20" },
  "Self-Improvement": { text: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/20" },
  "Online Business": { text: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/20" },
  "Weight Loss": { text: "text-rose-400", bg: "bg-rose-400/10", border: "border-rose-400/20" },
  "Crypto Trading": { text: "text-orange-400", bg: "bg-orange-400/10", border: "border-orange-400/20" },
  "Manifestation": { text: "text-violet-400", bg: "bg-violet-400/10", border: "border-violet-400/20" },
  "Relationship Coaching": { text: "text-pink-400", bg: "bg-pink-400/10", border: "border-pink-400/20" },
  "Productivity": { text: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/20" },
  "Spirituality": { text: "text-indigo-400", bg: "bg-indigo-400/10", border: "border-indigo-400/20" },
};
const DEFAULT_NC = { text: "text-gray-400", bg: "bg-gray-400/10", border: "border-gray-400/20" };

/* ─── Product Data (50 DFY products) ─── */
interface Product {
  id: number;
  name: string;
  niche: Niche;
  commission: number;
  estMin: number;
  estMax: number;
  popularity: number;
}

function seededProducts(): Product[] {
  const names: [string, Niche][] = [
    ["Ultimate Keto Meal Plan", "Weight Loss"],
    ["Crypto Wealth Blueprint", "Crypto Trading"],
    ["Manifestation Mastery", "Manifestation"],
    ["AI Profit System", "Online Business"],
    ["30-Day Slim Down", "Weight Loss"],
    ["Deep Focus Framework", "Productivity"],
    ["Chakra Awakening System", "Spirituality"],
    ["Magnetic Attraction Guide", "Relationship Coaching"],
    ["7-Figure Funnel Secrets", "Online Business"],
    ["Total Body Reboot", "Health & Fitness"],
    ["Stock Market Decoded", "Personal Finance"],
    ["Morning Ritual Mastery", "Self-Improvement"],
    ["Keto Snack Cookbook", "Weight Loss"],
    ["Bitcoin Mining Profits", "Crypto Trading"],
    ["The Abundance Code", "Manifestation"],
    ["Freelance Income Formula", "Online Business"],
    ["HIIT Body Sculpt", "Health & Fitness"],
    ["Debt Destroyer System", "Personal Finance"],
    ["Confidence Accelerator", "Self-Improvement"],
    ["Passive Income Playbook", "Online Business"],
    ["Intermittent Fasting Pro", "Health & Fitness"],
    ["DeFi Yield Optimizer", "Crypto Trading"],
    ["Law of Attraction Toolkit", "Manifestation"],
    ["Couples Reconnect Program", "Relationship Coaching"],
    ["Time Blocking Blueprint", "Productivity"],
    ["Yoga Flow Mastery", "Health & Fitness"],
    ["Credit Repair Secrets", "Personal Finance"],
    ["Mindset Reset Program", "Self-Improvement"],
    ["Dropshipping Accelerator", "Online Business"],
    ["Flat Belly Detox", "Weight Loss"],
    ["NFT Flipping Guide", "Crypto Trading"],
    ["Vision Board Workshop", "Manifestation"],
    ["Dating Confidence Kit", "Relationship Coaching"],
    ["GTD Productivity System", "Productivity"],
    ["Meditation Masterclass", "Spirituality"],
    ["Plant-Based Body Guide", "Health & Fitness"],
    ["Wealth Building 101", "Personal Finance"],
    ["Public Speaking Power", "Self-Improvement"],
    ["Amazon FBA Launchpad", "Online Business"],
    ["Sugar Detox Challenge", "Weight Loss"],
    ["Altcoin Profit Strategy", "Crypto Trading"],
    ["Scripting Your Reality", "Manifestation"],
    ["Communication Mastery", "Relationship Coaching"],
    ["Focus Music System", "Productivity"],
    ["Third Eye Activation", "Spirituality"],
    ["Home Workout Revolution", "Health & Fitness"],
    ["Retirement Accelerator", "Personal Finance"],
    ["Emotional Intelligence 2.0", "Self-Improvement"],
    ["Print on Demand Profits", "Online Business"],
    ["Hormone Reset Diet", "Weight Loss"],
  ];
  return names.map(([name, niche], i) => {
    const seed = i * 137 + 42;
    const commission = 20 + (seed % 180);
    const estMin = 200 + (seed % 600);
    const estMax = estMin + 500 + (seed % 1500);
    const popularity = 50 + (seed % 50);
    return { id: i + 1, name, niche, commission, estMin, estMax, popularity };
  });
}

const ALL_PRODUCTS = seededProducts();

/* ─── Social Posts per product (50 posts) ─── */
interface SocialPost {
  id: number;
  text: string;
  platform: "facebook" | "twitter" | "instagram";
  imagePrompt: string;
}

function generatePosts(product: Product): SocialPost[] {
  const templates = [
    { p: "facebook" as const, t: `Are you tired of struggling with ${product.niche.toLowerCase()}? ${product.name} changed everything for me. This program gives you a step-by-step system that actually works. If you're serious about results, check it out!` },
    { p: "twitter" as const, t: `Just discovered ${product.name} and I'm blown away. If you're into ${product.niche.toLowerCase()}, this is a must-have. Game changer.` },
    { p: "instagram" as const, t: `My ${product.niche.toLowerCase()} journey just leveled up with ${product.name}. The results speak for themselves. Swipe to see my transformation! #${product.niche.replace(/\s+/g, "")} #Results` },
    { p: "facebook" as const, t: `I've tried dozens of ${product.niche.toLowerCase()} programs. ${product.name} is the first one that delivered real, measurable results. Here's why it's different...` },
    { p: "twitter" as const, t: `${product.name} = the real deal. Don't sleep on this if you're serious about ${product.niche.toLowerCase()}. Link in bio.` },
    { p: "instagram" as const, t: `Day 30 with ${product.name} and the results are insane. This isn't just another ${product.niche.toLowerCase()} product — it's a complete system. DM me for the link! #Transformation` },
    { p: "facebook" as const, t: `If someone told me 3 months ago that ${product.name} would completely change my approach to ${product.niche.toLowerCase()}, I wouldn't have believed them. But here we are. Highly recommend!` },
    { p: "twitter" as const, t: `Hot take: ${product.name} is the best ${product.niche.toLowerCase()} resource of 2026. Fight me. 🔥` },
    { p: "instagram" as const, t: `Before vs After using ${product.name}. The difference is night and day. If you've been on the fence about ${product.niche.toLowerCase()}, this is your sign. Link in bio! #BeforeAndAfter` },
    { p: "facebook" as const, t: `Just finished the ${product.name} program and WOW. My only regret is not starting sooner. Perfect for anyone interested in ${product.niche.toLowerCase()}. Drop a comment if you want the link!` },
    { p: "twitter" as const, t: `Top 3 things I learned from ${product.name}: 1) Consistency beats intensity 2) Systems > willpower 3) Results compound fast. Incredible program.` },
    { p: "instagram" as const, t: `What ${product.name} taught me about ${product.niche.toLowerCase()} in just 2 weeks was more than I learned in 2 years on my own. This is the shortcut you've been looking for. #LifeChanging` },
    { p: "facebook" as const, t: `Sharing this because it genuinely helped me: ${product.name} is a complete ${product.niche.toLowerCase()} system that takes you from zero to confident in weeks. No fluff, just results.` },
    { p: "twitter" as const, t: `${product.name} review: ⭐⭐⭐⭐⭐ Worth every penny. Best investment I've made in ${product.niche.toLowerCase()} this year.` },
    { p: "instagram" as const, t: `POV: You just discovered ${product.name} and your entire ${product.niche.toLowerCase()} game is about to change forever. Trust the process. #GameChanger #${product.niche.replace(/\s+/g, "")}` },
  ];
  const posts: SocialPost[] = [];
  for (let i = 0; i < 50; i++) {
    const t = templates[i % templates.length];
    const variation = i >= templates.length ? ` (Post ${Math.floor(i / templates.length) + 1})` : "";
    posts.push({
      id: i + 1,
      text: t.t + variation,
      platform: t.p,
      imagePrompt: `Professional social media graphic for ${product.name} - ${product.niche}`,
    });
  }
  return posts;
}

/* ─── Platform Config ─── */
const platformConfig = {
  facebook: { label: "FB", color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/20", icon: Facebook },
  twitter: { label: "TW", color: "text-sky-400", bg: "bg-sky-400/10", border: "border-sky-400/20", icon: Twitter },
  instagram: { label: "IG", color: "text-pink-400", bg: "bg-pink-400/10", border: "border-pink-400/20", icon: Instagram },
};

type SortKey = "commission" | "popularity" | "name";

/* ════════════════════════ PAGE ════════════════════════ */

export default function AcceleratorPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [nicheFilter, setNicheFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortKey>("commission");
  const [deployedIds, setDeployedIds] = useState<Set<number>>(new Set());

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [postPlatformFilter, setPostPlatformFilter] = useState<string>("all");
  const [expandedPost, setExpandedPost] = useState<number | null>(null);
  const [copiedPostId, setCopiedPostId] = useState<number | null>(null);

  /* Filtered & sorted products */
  const filteredProducts = useMemo(() => {
    let list = [...ALL_PRODUCTS];
    if (nicheFilter !== "all") list = list.filter((p) => p.niche === nicheFilter);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.niche.toLowerCase().includes(q)
      );
    }
    list.sort((a, b) => {
      if (sortBy === "commission") return b.commission - a.commission;
      if (sortBy === "popularity") return b.popularity - a.popularity;
      return a.name.localeCompare(b.name);
    });
    return list;
  }, [nicheFilter, searchQuery, sortBy]);

  /* Posts for selected product */
  const posts = useMemo(() => {
    if (!selectedProduct) return [];
    let list = generatePosts(selectedProduct);
    if (postPlatformFilter !== "all")
      list = list.filter((p) => p.platform === postPlatformFilter);
    return list;
  }, [selectedProduct, postPlatformFilter]);

  const handleDeploy = (product: Product) => {
    setDeployedIds((prev) => new Set(prev).add(product.id));
  };

  const handleCopyPost = (post: SocialPost) => {
    navigator.clipboard.writeText(post.text);
    setCopiedPostId(post.id);
    setTimeout(() => setCopiedPostId(null), 2000);
  };

  /* ─── Social Posts View ─── */
  if (selectedProduct) {
    const nc = NICHE_COLORS[selectedProduct.niche] || DEFAULT_NC;
    return (
      <div className="space-y-8 pb-20 font-(family-name:--font-display)">
        {/* Back Button */}
        <button
          onClick={() => {
            setSelectedProduct(null);
            setExpandedPost(null);
            setPostPlatformFilter("all");
          }}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </button>

        {/* Product Context */}
        <GlassPanel intensity="low" className="p-5 border-primary/10">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                {selectedProduct.name}
              </h2>
              <span className={cn("text-xs font-bold", nc.text)}>
                {selectedProduct.niche}
              </span>
            </div>
          </div>
        </GlassPanel>

        {/* Section B Header */}
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-2">
            50 Social Media Posts — Ready to Publish
          </h2>
          <p className="text-gray-400">
            AI-generated posts with images for Facebook, Twitter, and Instagram
          </p>
        </div>

        {/* Platform Filter */}
        <div className="flex flex-wrap gap-2">
          {["all", "facebook", "twitter", "instagram"].map((pf) => {
            const isActive = postPlatformFilter === pf;
            return (
              <button
                key={pf}
                onClick={() => setPostPlatformFilter(pf)}
                className={cn(
                  "px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border transition-all",
                  isActive
                    ? "bg-primary/10 border-primary/40 text-primary"
                    : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white"
                )}
              >
                {pf === "all" ? "All Platforms" : pf.charAt(0).toUpperCase() + pf.slice(1)}
              </button>
            );
          })}
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.slice(0, 50).map((post, index) => {
            const pc = platformConfig[post.platform];
            const PlatformIcon = pc.icon;
            const isExpanded = expandedPost === post.id;
            const isCopied = copiedPostId === post.id;

            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(index * 0.02, 0.3) }}
              >
                <GlassPanel
                  intensity="low"
                  className="p-0 border-white/5 hover:border-primary/20 transition-all duration-300 overflow-hidden h-full flex flex-col"
                >
                  {/* Image Placeholder */}
                  <div className="aspect-video bg-linear-to-br from-white/5 via-black/40 to-white/5 flex items-center justify-center relative">
                    <div className="flex flex-col items-center gap-2 text-gray-600">
                      <ImageIcon className="w-8 h-8" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">
                        AI Generated Image
                      </span>
                    </div>
                    {/* Platform Badge */}
                    <div
                      className={cn(
                        "absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border",
                        pc.bg,
                        pc.color,
                        pc.border
                      )}
                    >
                      <PlatformIcon className="w-3 h-3" />
                      {pc.label}
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="p-4 flex-1 flex flex-col">
                    <p
                      className={cn(
                        "text-sm text-gray-300 leading-relaxed mb-4 flex-1",
                        !isExpanded && "line-clamp-3"
                      )}
                    >
                      {post.text}
                    </p>

                    {/* Actions */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        onClick={() =>
                          setExpandedPost(isExpanded ? null : post.id)
                        }
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-xs font-medium text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                      >
                        <Eye className="w-3 h-3" />
                        {isExpanded ? "Less" : "View"}
                      </button>

                      <button
                        onClick={() => handleCopyPost(post)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-xs font-medium text-gray-400 hover:text-emerald-400 hover:bg-emerald-400/10 hover:border-emerald-400/20 transition-all"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            Copy Text
                          </>
                        )}
                      </button>

                      <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-xs font-medium text-gray-400 hover:text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-400/20 transition-all">
                        <Download className="w-3 h-3" />
                        Image
                      </button>
                    </div>
                  </div>
                </GlassPanel>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  }

  /* ─── Main View: DFY Products ─── */
  return (
    <div className="space-y-8 pb-20 font-(family-name:--font-display)">
      {/* Hero Header */}
      <section className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-8 md:p-12 rounded-2xl border border-white/5 bg-linear-to-br from-primary/5 via-black/40 to-transparent backdrop-blur-sm text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold uppercase tracking-widest text-primary mb-6">
            <Sparkles className="w-3.5 h-3.5" /> Premium Feature
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Profit{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-cyan-400 to-primary">
              Accelerator
            </span>
          </h1>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
            50 done-for-you landing pages for top-performing Digistore24
            products, each with 50 ready-to-publish social media posts.
          </p>
        </motion.div>
      </section>

      {/* Section A Header */}
      <div>
        <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-tight mb-1">
          50 High-Converting Pages — Ready to Deploy
        </h2>
        <p className="text-gray-400 text-sm">
          AI-generated landing pages for the highest-performing products on
          Digistore24
        </p>
      </div>

      {/* Filters & Sort */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary/40 transition-colors"
          />
        </div>

        {/* Niche Filter */}
        <div className="relative">
          <SlidersHorizontal className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          <select
            value={nicheFilter}
            onChange={(e) => setNicheFilter(e.target.value)}
            className="appearance-none pl-10 pr-8 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-primary/40 transition-colors cursor-pointer"
          >
            <option value="all">All Niches</option>
            {NICHE_LIST.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
        </div>

        {/* Sort */}
        <div className="relative">
          <ArrowUpDown className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortKey)}
            className="appearance-none pl-10 pr-8 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-primary/40 transition-colors cursor-pointer"
          >
            <option value="commission">Commission: High → Low</option>
            <option value="popularity">Popularity</option>
            <option value="name">Name A → Z</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
        </div>
      </div>

      {/* Product Count */}
      <p className="text-xs text-gray-500">
        Showing {filteredProducts.length} of {ALL_PRODUCTS.length} products
      </p>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((product, index) => {
          const nc = NICHE_COLORS[product.niche] || DEFAULT_NC;
          const isDeployed = deployedIds.has(product.id);

          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(index * 0.02, 0.4) }}
            >
              <GlassPanel
                intensity="low"
                className="p-5 border-white/5 hover:border-primary/20 transition-all duration-300 h-full flex flex-col"
              >
                {/* Product Name & Niche */}
                <div className="mb-4">
                  <h3 className="text-sm font-bold text-white mb-2 leading-snug">
                    {product.name}
                  </h3>
                  <span
                    className={cn(
                      "inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border",
                      nc.text,
                      nc.bg,
                      nc.border
                    )}
                  >
                    {product.niche}
                  </span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-4 flex-1">
                  <div className="bg-black/30 p-3 rounded-lg border border-white/5">
                    <div className="text-[10px] text-gray-500 uppercase mb-1">
                      Commission
                    </div>
                    <div className="text-sm font-bold text-primary tabular-nums">
                      ${product.commission}
                    </div>
                  </div>
                  <div className="bg-black/30 p-3 rounded-lg border border-white/5">
                    <div className="text-[10px] text-gray-500 uppercase mb-1">
                      Est. Earnings
                    </div>
                    <div className="text-sm font-bold text-green-400 tabular-nums">
                      ${product.estMin} – ${product.estMax}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDeploy(product)}
                    disabled={isDeployed}
                    className={cn(
                      "flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300",
                      isDeployed
                        ? "bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 cursor-default"
                        : "bg-linear-to-r from-primary to-cyan-400 text-black hover:shadow-[0_0_20px_rgba(0,242,255,0.2)]"
                    )}
                  >
                    {isDeployed ? (
                      <>
                        <CheckCircle className="w-3.5 h-3.5" /> Deployed
                      </>
                    ) : (
                      <>
                        <Rocket className="w-3.5 h-3.5" /> Deploy Page
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-gray-400 uppercase tracking-wider hover:bg-white/10 hover:text-white transition-all"
                    title="View Social Posts"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    Posts
                  </button>
                </div>
              </GlassPanel>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
