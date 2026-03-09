"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassPanel } from "@/components/ui/glass-panel";
import { NeonButton } from "@/components/ui/neon-button";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/auth-context";
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
  Loader2,
  ExternalLink,
  MessageSquare,
  RefreshCw,
  BarChart3,
  Globe,
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

const IMAGE_STYLES = [
  "modern minimalist flat design",
  "vibrant gradient social media graphic",
  "clean professional marketing banner",
  "bold typography poster style",
  "sleek dark themed promotional art",
];

function getImageUrl(product: Product, postId: number): string {
  const style = IMAGE_STYLES[postId % IMAGE_STYLES.length];
  const prompt = `${style}, ${product.niche}, ${product.name}, digital marketing, clean layout, no text overlay, high quality`;
  const seed = product.id * 1000 + postId;
  return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=800&height=450&seed=${seed}&nologo=true`;
}

function LazyPostImage({ product, postId }: { product: Product; postId: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); obs.disconnect(); } },
      { rootMargin: "200px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const src = isVisible ? getImageUrl(product, postId) : undefined;

  return (
    <div ref={ref} className="aspect-video bg-black/40 relative overflow-hidden">
      {(!loaded || !isVisible) && !error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
          <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
            Generating...
          </span>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 bg-linear-to-br from-white/5 via-black/40 to-white/5 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2 text-gray-600">
            <ImageIcon className="w-8 h-8" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Image Unavailable</span>
          </div>
        </div>
      )}
      {src && !error && (
        <img
          src={src}
          alt={`Social post for ${product.name}`}
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-opacity duration-500",
            loaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
        />
      )}
    </div>
  );
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
      imagePrompt: `${product.name} ${product.niche}`,
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
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [nicheFilter, setNicheFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortKey>("commission");
  const [syncedIds, setSyncedIds] = useState<Set<number>>(new Set());
  const [syncingId, setSyncingId] = useState<number | null>(null);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [postPlatformFilter, setPostPlatformFilter] = useState<string>("all");
  const [expandedPost, setExpandedPost] = useState<number | null>(null);
  const [copiedPostId, setCopiedPostId] = useState<number | null>(null);

  /* Traffic state */
  const [trafficProduct, setTrafficProduct] = useState<Product | null>(null);
  const [trafficLoading, setTrafficLoading] = useState(false);
  const [trafficUrls, setTrafficUrls] = useState<{ url: string; comment?: string; isGenerating?: boolean; copied?: boolean }[]>([]);
  const [trafficNiche, setTrafficNiche] = useState("");

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

  const handleSync = async (product: Product) => {
    if (!user || syncedIds.has(product.id) || syncingId === product.id) return;
    setSyncingId(product.id);
    try {
      const { error } = await supabase.from("bridges").insert({
        user_id: user.id,
        title: product.name,
        affiliate_url: "",
        status: "live",
        traffic: String(Math.floor(product.popularity * 12)),
        earnings: `$${product.estMin} – $${product.estMax}`,
        niche: product.niche,
      });
      if (error) {
        console.error("Error syncing page:", error);
      } else {
        setSyncedIds((prev) => new Set(prev).add(product.id));
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setSyncingId(null);
    }
  };

  const handleCopyPost = (post: SocialPost) => {
    navigator.clipboard.writeText(post.text);
    setCopiedPostId(post.id);
    setTimeout(() => setCopiedPostId(null), 2000);
  };

  /* Traffic handlers */
  const handleInstantTraffic = async (product: Product) => {
    setTrafficProduct(product);
    setTrafficLoading(true);
    setTrafficUrls([]);

    let attempts = 0;
    const maxAttempts = 4;
    let success = false;

    while (attempts < maxAttempts && !success) {
      try {
        attempts++;
        if (attempts > 1) await new Promise((r) => setTimeout(r, 2000));

        const response = await fetch("/api/scrape-urls", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ keywords: product.name, niche: product.niche }),
        });
        const data = await response.json();

        if (data.success) {
          setTrafficUrls(data.urls.map((url: string) => ({ url })));
          setTrafficNiche(data.niche || product.niche);
          success = true;
        } else {
          throw new Error(data.error || "Failed");
        }
      } catch (err) {
        console.error(`Traffic attempt ${attempts} failed:`, err);
      }
    }
    setTrafficLoading(false);
  };

  const handleGenerateComment = async (urlIndex: number) => {
    if (!trafficProduct) return;
    const updated = [...trafficUrls];
    updated[urlIndex] = { ...updated[urlIndex], isGenerating: true };
    setTrafficUrls(updated);

    try {
      const response = await fetch("/api/generate-comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetUrl: trafficUrls[urlIndex].url,
          bridgeUrl: "",
          niche: trafficProduct.niche,
        }),
      });
      const data = await response.json();
      if (data.success) {
        const final = [...trafficUrls];
        final[urlIndex] = { ...final[urlIndex], comment: data.comment, isGenerating: false };
        setTrafficUrls(final);
      }
    } catch (err) {
      console.error("Error generating comment:", err);
      const final = [...trafficUrls];
      final[urlIndex] = { ...final[urlIndex], isGenerating: false };
      setTrafficUrls(final);
    }
  };

  const handleRegenerateComment = async (urlIndex: number) => {
    const updated = [...trafficUrls];
    updated[urlIndex] = { ...updated[urlIndex], comment: undefined, isGenerating: true };
    setTrafficUrls(updated);
    await handleGenerateComment(urlIndex);
  };

  const handleCopyComment = (urlIndex: number) => {
    const comment = trafficUrls[urlIndex]?.comment;
    if (!comment) return;
    navigator.clipboard.writeText(comment);
    const updated = [...trafficUrls];
    updated[urlIndex] = { ...updated[urlIndex], copied: true };
    setTrafficUrls(updated);
    setTimeout(() => {
      setTrafficUrls((prev) => {
        const reset = [...prev];
        if (reset[urlIndex]) reset[urlIndex] = { ...reset[urlIndex], copied: false };
        return reset;
      });
    }, 2000);
  };

  function extractDomain(url: string): string {
    try { return new URL(url).hostname.replace("www.", ""); }
    catch { return url; }
  }

  function formatUrl(url: string, maxLen = 60): string {
    try {
      const u = new URL(url);
      let path = u.pathname;
      if (path.length > maxLen) path = path.substring(0, maxLen) + "...";
      return u.hostname.replace("www.", "") + path;
    } catch { return url.length > maxLen ? url.substring(0, maxLen) + "..." : url; }
  }

  /* ─── Instant Traffic View ─── */
  if (trafficProduct) {
    const nc = NICHE_COLORS[trafficProduct.niche] || DEFAULT_NC;
    return (
      <div className="space-y-8 pb-20 font-(family-name:--font-display)">
        <button
          onClick={() => { setTrafficProduct(null); setTrafficUrls([]); }}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </button>

        <GlassPanel intensity="low" className="p-5 border-primary/10">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Globe className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">{trafficProduct.name}</h2>
              <span className={cn("text-xs font-bold", nc.text)}>{trafficProduct.niche}</span>
            </div>
          </div>
        </GlassPanel>

        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-2">
            Instant Traffic — Find Articles & Generate Comments
          </h2>
          <p className="text-gray-400">
            High-ranking articles in the <span className="text-primary font-semibold">{trafficNiche || trafficProduct.niche}</span> niche. Generate AI comments to drive traffic.
          </p>
        </div>

        {trafficLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
            <p className="text-gray-400 text-sm animate-pulse">Searching for high-ranking articles...</p>
          </div>
        ) : trafficUrls.length === 0 ? (
          <GlassPanel className="p-12 text-center">
            <p className="text-gray-400">No articles found. Try again later.</p>
            <button
              onClick={() => handleInstantTraffic(trafficProduct)}
              className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-primary/10 border border-primary/30 text-primary text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-primary/20 transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Retry Search
            </button>
          </GlassPanel>
        ) : (
          <div className="space-y-3">
            <p className="text-xs text-gray-500">{trafficUrls.length} articles found</p>
            {trafficUrls.map((item, urlIndex) => (
              <GlassPanel
                key={urlIndex}
                intensity="low"
                className="p-5 border-white/5 hover:border-primary/20 transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-primary/10 text-primary border border-primary/30">
                        {extractDomain(item.url)}
                      </span>
                      <div className="flex items-center gap-1">
                        <BarChart3 className="w-3 h-3 text-emerald-400" />
                        <span className="text-[10px] text-emerald-400 font-bold">High Authority</span>
                      </div>
                      <span className="text-[10px] text-gray-600">#{urlIndex + 1}</span>
                    </div>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-300 hover:text-primary transition-colors flex items-center gap-2"
                      title={item.url}
                    >
                      <ExternalLink className="w-3.5 h-3.5 shrink-0 text-gray-500" />
                      <span className="truncate">{formatUrl(item.url)}</span>
                    </a>
                  </div>

                  {!item.comment && (
                    <button
                      onClick={() => handleGenerateComment(urlIndex)}
                      disabled={item.isGenerating}
                      className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wide bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 hover:border-primary/50 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {item.isGenerating ? (
                        <><Loader2 className="w-3 h-3 animate-spin" /> Generating...</>
                      ) : (
                        <><MessageSquare className="w-3 h-3" /> Generate Comment</>
                      )}
                    </button>
                  )}
                </div>

                {item.comment && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-4 space-y-3">
                    <div className="w-full p-4 rounded-xl bg-black/40 border border-white/10 text-sm text-gray-300 whitespace-pre-wrap leading-relaxed">
                      {item.comment}
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        onClick={() => handleCopyComment(urlIndex)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-emerald-400/10 text-xs font-medium text-gray-400 hover:text-emerald-400 border border-white/5 hover:border-emerald-400/30 transition-all"
                      >
                        {item.copied ? (
                          <><Check className="w-3 h-3 text-emerald-400" /><span className="text-emerald-400">Copied!</span></>
                        ) : (
                          <><Copy className="w-3 h-3" /> Copy to Clipboard</>
                        )}
                      </button>
                      <button
                        onClick={() => handleRegenerateComment(urlIndex)}
                        disabled={item.isGenerating}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-gray-400 hover:text-white border border-white/5 hover:border-white/10 transition-all disabled:opacity-50"
                      >
                        <RefreshCw className="w-3 h-3" /> Regenerate
                      </button>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-blue-400/10 text-xs font-medium text-gray-400 hover:text-blue-400 border border-white/5 hover:border-blue-400/30 transition-all"
                      >
                        <ExternalLink className="w-3 h-3" /> Open Article
                      </a>
                    </div>
                  </motion.div>
                )}
              </GlassPanel>
            ))}
          </div>
        )}
      </div>
    );
  }

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
                  {/* AI Generated Image */}
                  <div className="relative">
                    <LazyPostImage product={selectedProduct} postId={post.id} />
                    {/* Platform Badge */}
                    <div
                      className={cn(
                        "absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border backdrop-blur-sm",
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

                      <a
                        href={getImageUrl(selectedProduct, post.id)}
                        download={`${selectedProduct.name.replace(/\s+/g, "-").toLowerCase()}-post-${post.id}.jpg`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-xs font-medium text-gray-400 hover:text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-400/20 transition-all"
                      >
                        <Download className="w-3 h-3" />
                        Image
                      </a>
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
          50 High-Converting Pages — Ready to Sync
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
          const isSynced = syncedIds.has(product.id);
          const isSyncing = syncingId === product.id;

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
                    onClick={() => handleSync(product)}
                    disabled={isSynced || isSyncing}
                    className={cn(
                      "flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300",
                      isSynced
                        ? "bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 cursor-default"
                        : isSyncing
                          ? "bg-white/10 border border-white/20 text-gray-400 cursor-wait"
                          : "bg-linear-to-r from-primary to-cyan-400 text-black hover:shadow-[0_0_20px_rgba(0,242,255,0.2)]"
                    )}
                  >
                    {isSynced ? (
                      <>
                        <CheckCircle className="w-3.5 h-3.5" /> Synced
                      </>
                    ) : isSyncing ? (
                      <>
                        <Zap className="w-3.5 h-3.5 animate-pulse" /> Syncing...
                      </>
                    ) : (
                      <>
                        <Rocket className="w-3.5 h-3.5" /> Sync Page
                      </>
                    )}
                  </button>

                </div>

                <button
                  onClick={() => handleInstantTraffic(product)}
                  className="w-full mt-2 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs font-bold text-amber-400 uppercase tracking-wider hover:bg-amber-500/20 hover:border-amber-500/40 hover:shadow-[0_0_15px_rgba(245,158,11,0.15)] transition-all duration-300"
                >
                  <Zap className="w-3.5 h-3.5" /> Instant Traffic
                </button>
              </GlassPanel>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
