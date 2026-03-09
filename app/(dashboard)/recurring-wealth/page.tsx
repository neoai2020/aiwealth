"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { GlassPanel } from "@/components/ui/glass-panel";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/auth-context";
import {
  RefreshCw,
  Sparkles,
  Rocket,
  Zap,
  ArrowLeft,
  FileText,
  Copy,
  Check,
  Download,
  Eye,
  Facebook,
  Twitter,
  Instagram,
  Image as ImageIcon,
  Loader2,
  ExternalLink,
  MessageSquare,
  BarChart3,
  Globe,
  CheckCircle,
  Crown,
} from "lucide-react";

/* ─── Niche Palette ─── */
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

/* ─── Top 10 Recurring Products ─── */
interface RecurringProduct {
  id: number;
  rank: number;
  name: string;
  niche: string;
  monthlyCommission: number;
  estMonthlyRevenue: number;
}

const RECURRING_PRODUCTS: RecurringProduct[] = [
  { id: 1, rank: 1, name: "Evergreen Wealth Formula", niche: "Online Business", monthlyCommission: 47, estMonthlyRevenue: 2820 },
  { id: 2, rank: 2, name: "BioFit Pro Membership", niche: "Health & Fitness", monthlyCommission: 39, estMonthlyRevenue: 2340 },
  { id: 3, rank: 3, name: "CryptoVault Premium", niche: "Crypto Trading", monthlyCommission: 59, estMonthlyRevenue: 3540 },
  { id: 4, rank: 4, name: "MindShift Academy", niche: "Self-Improvement", monthlyCommission: 34, estMonthlyRevenue: 2040 },
  { id: 5, rank: 5, name: "Passive Cash Blueprint", niche: "Personal Finance", monthlyCommission: 42, estMonthlyRevenue: 2520 },
  { id: 6, rank: 6, name: "SlimCycle 365", niche: "Weight Loss", monthlyCommission: 29, estMonthlyRevenue: 1740 },
  { id: 7, rank: 7, name: "Abundance Inner Circle", niche: "Manifestation", monthlyCommission: 37, estMonthlyRevenue: 2220 },
  { id: 8, rank: 8, name: "RelationshipOS Pro", niche: "Relationship Coaching", monthlyCommission: 31, estMonthlyRevenue: 1860 },
  { id: 9, rank: 9, name: "Deep Work Mastery", niche: "Productivity", monthlyCommission: 27, estMonthlyRevenue: 1620 },
  { id: 10, rank: 10, name: "Soul Ascension Path", niche: "Spirituality", monthlyCommission: 33, estMonthlyRevenue: 1980 },
];

/* ─── Social Posts ─── */
interface SocialPost {
  id: number;
  text: string;
  platform: "facebook" | "twitter" | "instagram";
}

const platformConfig = {
  facebook: { label: "FB", color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/20", icon: Facebook },
  twitter: { label: "TW", color: "text-sky-400", bg: "bg-sky-400/10", border: "border-sky-400/20", icon: Twitter },
  instagram: { label: "IG", color: "text-pink-400", bg: "bg-pink-400/10", border: "border-pink-400/20", icon: Instagram },
};

const IMAGE_STYLES = [
  "modern minimalist flat design",
  "vibrant gradient social media graphic",
  "clean professional marketing banner",
  "bold typography poster style",
  "sleek dark themed promotional art",
];

function getImageUrl(product: RecurringProduct, postId: number): string {
  const style = IMAGE_STYLES[postId % IMAGE_STYLES.length];
  const prompt = `${style}, ${product.niche}, ${product.name}, recurring income, digital marketing, clean layout, no text overlay, high quality`;
  const seed = product.id * 2000 + postId;
  return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=800&height=450&seed=${seed}&nologo=true`;
}

function LazyPostImage({ product, postId }: { product: RecurringProduct; postId: number }) {
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
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Generating...</span>
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

function generatePosts(product: RecurringProduct): SocialPost[] {
  const templates = [
    { p: "facebook" as const, t: `Stop trading time for money. ${product.name} pays you EVERY month for every customer you refer. This is real recurring income in ${product.niche.toLowerCase()}. Check it out!` },
    { p: "twitter" as const, t: `Recurring commissions > one-time payouts. ${product.name} just deposited $${product.monthlyCommission} into my account... again. Monthly. Like clockwork.` },
    { p: "instagram" as const, t: `This is what passive income looks like. ${product.name} pays me every single month. No extra work, just recurring commissions. #RecurringIncome #${product.niche.replace(/\s+/g, "")}` },
    { p: "facebook" as const, t: `Imagine getting paid $${product.monthlyCommission}/month for every person you refer to ${product.name}. That's not a dream, that's my Tuesday. Here's how I built this stream...` },
    { p: "twitter" as const, t: `The power of recurring commissions: 10 referrals × $${product.monthlyCommission}/mo = $${product.monthlyCommission * 10}/mo passive income. ${product.name} makes this possible. 🔄` },
    { p: "instagram" as const, t: `Month 3 with ${product.name}: still getting paid for referrals I made on day 1. THIS is how you build wealth. DM "RECURRING" for details! #PassiveIncome` },
    { p: "facebook" as const, t: `Why I only promote recurring commission products now: ${product.name} pays me $${product.monthlyCommission}/mo per referral. Do the math on 50 referrals. Life changing.` },
    { p: "twitter" as const, t: `Hot tip: Focus on recurring commission products like ${product.name}. One referral = income for MONTHS. That's leverage. 🚀` },
    { p: "instagram" as const, t: `Building recurring income streams with ${product.name}. Every referral is a monthly paycheck. The best part? The product sells itself. #${product.niche.replace(/\s+/g, "")} #MonthlyIncome` },
    { p: "facebook" as const, t: `Just hit a milestone: ${product.name} recurring commissions now cover my phone bill, Netflix, AND gym membership. All from referrals I made months ago. This compounds.` },
    { p: "twitter" as const, t: `${product.name} recurring commission update: Still getting paid. Every. Single. Month. Best decision I made in ${product.niche.toLowerCase()}.` },
    { p: "instagram" as const, t: `Woke up to another ${product.name} commission notification. $${product.monthlyCommission} recurring. Again. Build once, get paid forever. Link in bio! #RecurringWealth` },
    { p: "facebook" as const, t: `The difference between a one-time $100 and $${product.monthlyCommission}/month recurring is MASSIVE over a year. ${product.name} gets this right. Highly recommend for anyone in ${product.niche.toLowerCase()}.` },
    { p: "twitter" as const, t: `My ${product.niche.toLowerCase()} income stack: ${product.name} = $${product.monthlyCommission}/mo recurring per referral. Compounding is the 8th wonder. 💰` },
    { p: "instagram" as const, t: `If you're not building recurring income streams, you're leaving money on the table. ${product.name} changed my financial game. #FinancialFreedom #${product.niche.replace(/\s+/g, "")}` },
  ];
  const posts: SocialPost[] = [];
  for (let i = 0; i < 50; i++) {
    const t = templates[i % templates.length];
    const variation = i >= templates.length ? ` (Post ${Math.floor(i / templates.length) + 1})` : "";
    posts.push({ id: i + 1, text: t.t + variation, platform: t.p });
  }
  return posts;
}

/* ════════════════════════ PAGE ════════════════════════ */

export default function RecurringWealthPage() {
  const { user } = useAuth();
  const [syncedIds, setSyncedIds] = useState<Set<number>>(new Set());
  const [syncingId, setSyncingId] = useState<number | null>(null);

  /* Posts state */
  const [postsProduct, setPostsProduct] = useState<RecurringProduct | null>(null);
  const [postPlatformFilter, setPostPlatformFilter] = useState<string>("all");
  const [expandedPost, setExpandedPost] = useState<number | null>(null);
  const [copiedPostId, setCopiedPostId] = useState<number | null>(null);

  /* Traffic state */
  const [trafficProduct, setTrafficProduct] = useState<RecurringProduct | null>(null);
  const [trafficLoading, setTrafficLoading] = useState(false);
  const [trafficUrls, setTrafficUrls] = useState<{ url: string; comment?: string; isGenerating?: boolean; copied?: boolean }[]>([]);
  const [trafficNiche, setTrafficNiche] = useState("");

  const posts = useMemo(() => {
    if (!postsProduct) return [];
    let list = generatePosts(postsProduct);
    if (postPlatformFilter !== "all") list = list.filter((p) => p.platform === postPlatformFilter);
    return list;
  }, [postsProduct, postPlatformFilter]);

  /* Sync handler */
  const handleSync = async (product: RecurringProduct) => {
    if (!user || syncedIds.has(product.id) || syncingId === product.id) return;
    setSyncingId(product.id);
    try {
      const { error } = await supabase.from("bridges").insert({
        user_id: user.id,
        title: product.name,
        affiliate_url: "",
        status: "live",
        traffic: String(product.estMonthlyRevenue),
        earnings: `$${product.monthlyCommission}/mo recurring`,
        niche: product.niche,
      });
      if (!error) setSyncedIds((prev) => new Set(prev).add(product.id));
      else console.error("Sync error:", error);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setSyncingId(null);
    }
  };

  /* Copy post */
  const handleCopyPost = (post: SocialPost) => {
    navigator.clipboard.writeText(post.text);
    setCopiedPostId(post.id);
    setTimeout(() => setCopiedPostId(null), 2000);
  };

  /* Traffic handlers */
  const handleInstantTraffic = async (product: RecurringProduct) => {
    setTrafficProduct(product);
    setTrafficLoading(true);
    setTrafficUrls([]);

    let attempts = 0;
    let success = false;
    while (attempts < 4 && !success) {
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
        } else throw new Error(data.error || "Failed");
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
      const res = await fetch("/api/generate-comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetUrl: trafficUrls[urlIndex].url, bridgeUrl: "", niche: trafficProduct.niche }),
      });
      const data = await res.json();
      if (data.success) {
        const final = [...trafficUrls];
        final[urlIndex] = { ...final[urlIndex], comment: data.comment, isGenerating: false };
        setTrafficUrls(final);
      }
    } catch (err) {
      console.error("Error:", err);
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

  /* ─── TRAFFIC VIEW ─── */
  if (trafficProduct) {
    const nc = NICHE_COLORS[trafficProduct.niche] || DEFAULT_NC;
    return (
      <div className="space-y-8 pb-20 font-(family-name:--font-display)">
        <button onClick={() => { setTrafficProduct(null); setTrafficUrls([]); }} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </button>

        <GlassPanel intensity="low" className="p-5 border-primary/10">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Globe className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">{trafficProduct.name}</h2>
              <span className={cn("text-xs font-bold", nc.text)}>{trafficProduct.niche} — ${trafficProduct.monthlyCommission}/mo recurring</span>
            </div>
          </div>
        </GlassPanel>

        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-2">Instant Traffic — Find Articles & Generate Comments</h2>
          <p className="text-gray-400">High-ranking articles in the <span className="text-primary font-semibold">{trafficNiche || trafficProduct.niche}</span> niche.</p>
        </div>

        {trafficLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
            <p className="text-gray-400 text-sm animate-pulse">Searching for high-ranking articles...</p>
          </div>
        ) : trafficUrls.length === 0 ? (
          <GlassPanel className="p-12 text-center">
            <p className="text-gray-400">No articles found. Try again later.</p>
            <button onClick={() => handleInstantTraffic(trafficProduct)} className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-primary/10 border border-primary/30 text-primary text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-primary/20 transition-all">
              <RefreshCw className="w-3.5 h-3.5" /> Retry Search
            </button>
          </GlassPanel>
        ) : (
          <div className="space-y-3">
            <p className="text-xs text-gray-500">{trafficUrls.length} articles found</p>
            {trafficUrls.map((item, urlIndex) => (
              <GlassPanel key={urlIndex} intensity="low" className="p-5 border-white/5 hover:border-primary/20 transition-all duration-300">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-primary/10 text-primary border border-primary/30">{extractDomain(item.url)}</span>
                      <div className="flex items-center gap-1"><BarChart3 className="w-3 h-3 text-emerald-400" /><span className="text-[10px] text-emerald-400 font-bold">High Authority</span></div>
                      <span className="text-[10px] text-gray-600">#{urlIndex + 1}</span>
                    </div>
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-300 hover:text-primary transition-colors flex items-center gap-2" title={item.url}>
                      <ExternalLink className="w-3.5 h-3.5 shrink-0 text-gray-500" /><span className="truncate">{formatUrl(item.url)}</span>
                    </a>
                  </div>
                  {!item.comment && (
                    <button onClick={() => handleGenerateComment(urlIndex)} disabled={item.isGenerating} className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wide bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 hover:border-primary/50 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                      {item.isGenerating ? (<><Loader2 className="w-3 h-3 animate-spin" /> Generating...</>) : (<><MessageSquare className="w-3 h-3" /> Generate Comment</>)}
                    </button>
                  )}
                </div>
                {item.comment && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-4 space-y-3">
                    <div className="w-full p-4 rounded-xl bg-black/40 border border-white/10 text-sm text-gray-300 whitespace-pre-wrap leading-relaxed">{item.comment}</div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <button onClick={() => handleCopyComment(urlIndex)} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-emerald-400/10 text-xs font-medium text-gray-400 hover:text-emerald-400 border border-white/5 hover:border-emerald-400/30 transition-all">
                        {item.copied ? (<><Check className="w-3 h-3 text-emerald-400" /><span className="text-emerald-400">Copied!</span></>) : (<><Copy className="w-3 h-3" /> Copy to Clipboard</>)}
                      </button>
                      <button onClick={() => handleRegenerateComment(urlIndex)} disabled={item.isGenerating} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-gray-400 hover:text-white border border-white/5 hover:border-white/10 transition-all disabled:opacity-50">
                        <RefreshCw className="w-3 h-3" /> Regenerate
                      </button>
                      <a href={item.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-blue-400/10 text-xs font-medium text-gray-400 hover:text-blue-400 border border-white/5 hover:border-blue-400/30 transition-all">
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

  /* ─── POSTS VIEW ─── */
  if (postsProduct) {
    const nc = NICHE_COLORS[postsProduct.niche] || DEFAULT_NC;
    return (
      <div className="space-y-8 pb-20 font-(family-name:--font-display)">
        <button onClick={() => { setPostsProduct(null); setExpandedPost(null); setPostPlatformFilter("all"); }} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </button>

        <GlassPanel intensity="low" className="p-5 border-primary/10">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">{postsProduct.name}</h2>
              <span className={cn("text-xs font-bold", nc.text)}>{postsProduct.niche} — ${postsProduct.monthlyCommission}/mo recurring</span>
            </div>
          </div>
        </GlassPanel>

        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-2">50 Social Media Posts — Ready to Publish</h2>
          <p className="text-gray-400">AI-generated posts with images for Facebook, Twitter, and Instagram</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {["all", "facebook", "twitter", "instagram"].map((pf) => (
            <button key={pf} onClick={() => setPostPlatformFilter(pf)} className={cn("px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border transition-all", postPlatformFilter === pf ? "bg-primary/10 border-primary/40 text-primary" : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white")}>
              {pf === "all" ? "All Platforms" : pf.charAt(0).toUpperCase() + pf.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.slice(0, 50).map((post, index) => {
            const pc = platformConfig[post.platform];
            const PlatformIcon = pc.icon;
            const isExpanded = expandedPost === post.id;
            const isCopied = copiedPostId === post.id;
            return (
              <motion.div key={post.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(index * 0.02, 0.3) }}>
                <GlassPanel intensity="low" className="p-0 border-white/5 hover:border-primary/20 transition-all duration-300 overflow-hidden h-full flex flex-col">
                  <div className="relative">
                    <LazyPostImage product={postsProduct} postId={post.id} />
                    <div className={cn("absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border backdrop-blur-sm", pc.bg, pc.color, pc.border)}>
                      <PlatformIcon className="w-3 h-3" />{pc.label}
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <p className={cn("text-sm text-gray-300 leading-relaxed mb-4 flex-1", !isExpanded && "line-clamp-3")}>{post.text}</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <button onClick={() => setExpandedPost(isExpanded ? null : post.id)} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-xs font-medium text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                        <Eye className="w-3 h-3" />{isExpanded ? "Less" : "View"}
                      </button>
                      <button onClick={() => handleCopyPost(post)} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-xs font-medium text-gray-400 hover:text-emerald-400 hover:bg-emerald-400/10 hover:border-emerald-400/20 transition-all">
                        {isCopied ? (<><Check className="w-3 h-3 text-emerald-400" /><span className="text-emerald-400">Copied!</span></>) : (<><Copy className="w-3 h-3" /> Copy Text</>)}
                      </button>
                      <a href={getImageUrl(postsProduct, post.id)} download={`${postsProduct.name.replace(/\s+/g, "-").toLowerCase()}-post-${post.id}.jpg`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-xs font-medium text-gray-400 hover:text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-400/20 transition-all">
                        <Download className="w-3 h-3" /> Image
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

  /* ─── MAIN VIEW: Top 10 Ranked List ─── */
  return (
    <div className="space-y-8 pb-20 font-(family-name:--font-display)">
      {/* Hero */}
      <section className="relative">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="p-8 md:p-12 rounded-2xl border border-white/5 bg-linear-to-br from-amber-500/5 via-black/40 to-transparent backdrop-blur-sm text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-[10px] font-bold uppercase tracking-widest text-amber-400 mb-6">
            <Crown className="w-3.5 h-3.5" /> Premium Feature
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Top 10 Recurring{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-400 via-yellow-400 to-amber-400">Income Products</span>
          </h1>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
            These products pay you <span className="text-white font-semibold">every month</span> for every customer you refer. Build real recurring wealth.
          </p>
        </motion.div>
      </section>

      {/* Ranked Product List */}
      <div className="space-y-4">
        {RECURRING_PRODUCTS.map((product, index) => {
          const nc = NICHE_COLORS[product.niche] || DEFAULT_NC;
          const isSynced = syncedIds.has(product.id);
          const isSyncing = syncingId === product.id;

          return (
            <motion.div key={product.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
              <GlassPanel intensity="low" className="p-5 md:p-6 border-white/5 hover:border-amber-500/20 transition-all duration-300">
                <div className="flex flex-col lg:flex-row lg:items-center gap-5">
                  {/* Rank + Product Info */}
                  <div className="flex items-center gap-5 flex-1 min-w-0">
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center font-extrabold text-lg shrink-0",
                      product.rank <= 3
                        ? "bg-amber-500/15 border border-amber-500/30 text-amber-400"
                        : "bg-white/5 border border-white/10 text-gray-500"
                    )}>
                      #{product.rank}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold text-white truncate">{product.name}</h3>
                      <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border mt-1", nc.text, nc.bg, nc.border)}>
                        {product.niche}
                      </span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 shrink-0">
                    <div className="bg-black/30 px-4 py-2.5 rounded-lg border border-white/5 text-center min-w-[120px]">
                      <div className="text-[10px] text-gray-500 uppercase mb-0.5">Monthly Commission</div>
                      <div className="text-sm font-bold text-primary tabular-nums">${product.monthlyCommission}/mo</div>
                    </div>
                    <div className="bg-black/30 px-4 py-2.5 rounded-lg border border-white/5 text-center min-w-[130px]">
                      <div className="text-[10px] text-gray-500 uppercase mb-0.5">Est. Monthly Revenue</div>
                      <div className="text-sm font-bold text-green-400 tabular-nums">${product.estMonthlyRevenue.toLocaleString()}/mo</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0 flex-wrap">
                    <button
                      onClick={() => handleSync(product)}
                      disabled={isSynced || isSyncing}
                      className={cn(
                        "inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300",
                        isSynced
                          ? "bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 cursor-default"
                          : isSyncing
                            ? "bg-white/10 border border-white/20 text-gray-400 cursor-wait"
                            : "bg-linear-to-r from-primary to-cyan-400 text-black hover:shadow-[0_0_20px_rgba(0,242,255,0.2)]"
                      )}
                    >
                      {isSynced ? (<><CheckCircle className="w-3.5 h-3.5" /> Synced</>) : isSyncing ? (<><Zap className="w-3.5 h-3.5 animate-pulse" /> Syncing...</>) : (<><Rocket className="w-3.5 h-3.5" /> Sync This Product</>)}
                    </button>

                    <button
                      onClick={() => isSynced && handleInstantTraffic(product)}
                      disabled={!isSynced}
                      className={cn(
                        "inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all",
                        isSynced
                          ? "bg-amber-500/10 border-amber-500/20 text-amber-400 hover:bg-amber-500/20 hover:border-amber-500/40"
                          : "bg-white/[0.02] border-white/5 text-gray-600 cursor-not-allowed opacity-40"
                      )}
                      title={!isSynced ? "Sync this product first" : "Find articles & generate comments"}
                    >
                      <Zap className="w-3.5 h-3.5" /> Instant Traffic
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
