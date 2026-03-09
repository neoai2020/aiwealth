"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassPanel } from "@/components/ui/glass-panel";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/auth-context";
import {
  Globe,
  Sparkles,
  Zap,
  Copy,
  Check,
  Download,
  Eye,
  Facebook,
  Twitter,
  Instagram,
  Image as ImageIcon,
  Loader2,
  ChevronDown,
  FileText,
  CheckCircle,
  Layers,
} from "lucide-react";

/* ─── Types ─── */
interface SyncedPage {
  id: string;
  title: string;
  niche?: string;
  affiliate_url: string;
}

interface SocialPost {
  id: number;
  text: string;
  platform: "facebook" | "twitter" | "instagram";
}

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

/* ─── Platform Config ─── */
const platformConfig = {
  facebook: { label: "FB", color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/20", icon: Facebook },
  twitter: { label: "TW", color: "text-sky-400", bg: "bg-sky-400/10", border: "border-sky-400/20", icon: Twitter },
  instagram: { label: "IG", color: "text-pink-400", bg: "bg-pink-400/10", border: "border-pink-400/20", icon: Instagram },
};

/* ─── Image Generation ─── */
const IMAGE_STYLES = [
  "modern minimalist flat design",
  "vibrant gradient social media graphic",
  "clean professional marketing banner",
  "bold typography poster style",
  "sleek dark themed promotional art",
];

function getImageUrl(productName: string, niche: string, postId: number): string {
  const style = IMAGE_STYLES[postId % IMAGE_STYLES.length];
  const prompt = `${style}, ${niche}, ${productName}, social media post, digital marketing, clean layout, no text overlay, high quality`;
  const seed = productName.length * 1000 + postId;
  return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=800&height=450&seed=${seed}&nologo=true`;
}

function LazyPostImage({ productName, niche, postId }: { productName: string; niche: string; postId: number }) {
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

  const src = isVisible ? getImageUrl(productName, niche, postId) : undefined;

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
          alt={`Social post for ${productName}`}
          className={cn("absolute inset-0 w-full h-full object-cover transition-opacity duration-500", loaded ? "opacity-100" : "opacity-0")}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
        />
      )}
    </div>
  );
}

/* ─── Post Generation ─── */
function generatePosts(title: string, niche: string): SocialPost[] {
  const n = niche.toLowerCase();
  const templates = [
    { p: "facebook" as const, t: `Are you tired of struggling with ${n}? ${title} changed everything for me. This program gives you a step-by-step system that actually works. If you're serious about results, check it out!` },
    { p: "twitter" as const, t: `Just discovered ${title} and I'm blown away. If you're into ${n}, this is a must-have. Game changer.` },
    { p: "instagram" as const, t: `My ${n} journey just leveled up with ${title}. The results speak for themselves. Swipe to see my transformation! #${niche.replace(/\s+/g, "")} #Results` },
    { p: "facebook" as const, t: `I've tried dozens of ${n} programs. ${title} is the first one that delivered real, measurable results. Here's why it's different...` },
    { p: "twitter" as const, t: `${title} = the real deal. Don't sleep on this if you're serious about ${n}. Link in bio.` },
    { p: "instagram" as const, t: `Day 30 with ${title} and the results are insane. This isn't just another ${n} product — it's a complete system. DM me for the link! #Transformation` },
    { p: "facebook" as const, t: `If someone told me 3 months ago that ${title} would completely change my approach to ${n}, I wouldn't have believed them. But here we are. Highly recommend!` },
    { p: "twitter" as const, t: `Hot take: ${title} is the best ${n} resource of 2026. Fight me. 🔥` },
    { p: "instagram" as const, t: `Before vs After using ${title}. The difference is night and day. If you've been on the fence about ${n}, this is your sign. Link in bio! #BeforeAndAfter` },
    { p: "facebook" as const, t: `Just finished the ${title} program and WOW. My only regret is not starting sooner. Perfect for anyone interested in ${n}. Drop a comment if you want the link!` },
    { p: "twitter" as const, t: `Top 3 things I learned from ${title}: 1) Consistency beats intensity 2) Systems > willpower 3) Results compound fast. Incredible program.` },
    { p: "instagram" as const, t: `What ${title} taught me about ${n} in just 2 weeks was more than I learned in 2 years on my own. This is the shortcut you've been looking for. #LifeChanging` },
    { p: "facebook" as const, t: `Sharing this because it genuinely helped me: ${title} is a complete ${n} system that takes you from zero to confident in weeks. No fluff, just results.` },
    { p: "twitter" as const, t: `${title} review: ⭐⭐⭐⭐⭐ Worth every penny. Best investment I've made in ${n} this year.` },
    { p: "instagram" as const, t: `POV: You just discovered ${title} and your entire ${n} game is about to change forever. Trust the process. #GameChanger #${niche.replace(/\s+/g, "")}` },
  ];
  const posts: SocialPost[] = [];
  for (let i = 0; i < 50; i++) {
    const t = templates[i % templates.length];
    const variation = i >= templates.length ? ` (Post ${Math.floor(i / templates.length) + 1})` : "";
    posts.push({ id: i + 1, text: t.t + variation, platform: t.p });
  }
  return posts;
}

/* ─── Loading Messages ─── */
const LOADING_MESSAGES = [
  "Analyzing your product niche...",
  "Generating platform-optimized copy...",
  "Creating AI-powered images...",
  "Optimizing for engagement...",
  "Finalizing your 50 posts...",
];

/* ════════════════════════ PAGE ════════════════════════ */

export default function SocialPayoutsPage() {
  const { user } = useAuth();

  /* Step tracking: 1 = select, 2 = loading, 3 = results */
  const [step, setStep] = useState<1 | 2 | 3>(1);

  /* Step 1 state */
  const [syncedPages, setSyncedPages] = useState<SyncedPage[]>([]);
  const [loadingPages, setLoadingPages] = useState(true);
  const [selectedPage, setSelectedPage] = useState<SyncedPage | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  /* Step 2 state */
  const [loadingMsgIdx, setLoadingMsgIdx] = useState(0);

  /* Step 3 state */
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [platformFilter, setPlatformFilter] = useState<string>("all");
  const [expandedPost, setExpandedPost] = useState<number | null>(null);
  const [copiedPostId, setCopiedPostId] = useState<number | null>(null);

  /* Fetch user's synced pages */
  useEffect(() => {
    const fetchPages = async () => {
      if (!user) { setLoadingPages(false); return; }
      try {
        const { data, error } = await supabase
          .from("bridges")
          .select("id, title, niche, affiliate_url")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });
        if (!error && data) setSyncedPages(data);
      } catch (err) {
        console.error("Error fetching pages:", err);
      } finally {
        setLoadingPages(false);
      }
    };
    fetchPages();
  }, [user]);

  /* Step 2: loading animation */
  useEffect(() => {
    if (step !== 2) return;
    setLoadingMsgIdx(0);
    const interval = setInterval(() => {
      setLoadingMsgIdx((prev) => {
        if (prev >= LOADING_MESSAGES.length - 1) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 800);

    const timeout = setTimeout(() => {
      if (selectedPage) {
        const generated = generatePosts(selectedPage.title, selectedPage.niche || "General");
        setPosts(generated);
        setStep(3);
      }
    }, 4500);

    return () => { clearInterval(interval); clearTimeout(timeout); };
  }, [step, selectedPage]);

  const filteredPosts = useMemo(() => {
    if (platformFilter === "all") return posts;
    return posts.filter((p) => p.platform === platformFilter);
  }, [posts, platformFilter]);

  const handleCopyPost = (post: SocialPost) => {
    navigator.clipboard.writeText(post.text);
    setCopiedPostId(post.id);
    setTimeout(() => setCopiedPostId(null), 2000);
  };

  const handleGenerate = () => {
    if (!selectedPage) return;
    setPlatformFilter("all");
    setExpandedPost(null);
    setStep(2);
  };

  const handleStartOver = () => {
    setStep(1);
    setSelectedPage(null);
    setPosts([]);
    setPlatformFilter("all");
    setExpandedPost(null);
  };

  /* ─── STEP 3: Results ─── */
  if (step === 3 && selectedPage) {
    const nc = NICHE_COLORS[selectedPage.niche || "General"] || DEFAULT_NC;
    return (
      <div className="space-y-8 pb-20 font-(family-name:--font-display)">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              50 Posts Generated
            </h1>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-gray-400 text-sm">For:</span>
              <span className="text-white font-bold text-sm">{selectedPage.title}</span>
              <span className={cn("inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border", nc.text, nc.bg, nc.border)}>
                {selectedPage.niche || "General"}
              </span>
            </div>
          </div>
          <button
            onClick={handleStartOver}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-gray-400 uppercase tracking-wider hover:bg-white/10 hover:text-white transition-all"
          >
            <Layers className="w-3.5 h-3.5" /> Choose Different Product
          </button>
        </div>

        {/* Platform Filter */}
        <div className="flex flex-wrap gap-2">
          {["all", "facebook", "twitter", "instagram"].map((pf) => (
            <button
              key={pf}
              onClick={() => setPlatformFilter(pf)}
              className={cn(
                "px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border transition-all",
                platformFilter === pf
                  ? "bg-primary/10 border-primary/40 text-primary"
                  : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white"
              )}
            >
              {pf === "all" ? "All Platforms" : pf.charAt(0).toUpperCase() + pf.slice(1)}
            </button>
          ))}
          <span className="ml-auto text-xs text-gray-500 self-center">
            {filteredPosts.length} posts
          </span>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPosts.map((post, index) => {
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
                  {/* AI Image */}
                  <div className="relative">
                    <LazyPostImage productName={selectedPage.title} niche={selectedPage.niche || "General"} postId={post.id} />
                    <div className={cn("absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border backdrop-blur-sm", pc.bg, pc.color, pc.border)}>
                      <PlatformIcon className="w-3 h-3" />{pc.label}
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="p-4 flex-1 flex flex-col">
                    <p className={cn("text-sm text-gray-300 leading-relaxed mb-4 flex-1", !isExpanded && "line-clamp-3")}>
                      {post.text}
                    </p>

                    {/* Actions */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        onClick={() => setExpandedPost(isExpanded ? null : post.id)}
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
                          <><Check className="w-3 h-3 text-emerald-400" /><span className="text-emerald-400">Copied!</span></>
                        ) : (
                          <><Copy className="w-3 h-3" /> Copy Text</>
                        )}
                      </button>

                      <a
                        href={getImageUrl(selectedPage.title, selectedPage.niche || "General", post.id)}
                        download={`${selectedPage.title.replace(/\s+/g, "-").toLowerCase()}-post-${post.id}.jpg`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-xs font-medium text-gray-400 hover:text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-400/20 transition-all"
                      >
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

  /* ─── STEP 2: Loading ─── */
  if (step === 2) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center font-(family-name:--font-display)">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-8 max-w-md"
        >
          <div className="relative mx-auto w-20 h-20">
            <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin" />
            <div className="absolute inset-3 rounded-full bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-primary" />
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight mb-3">
              Generating Your Posts
            </h2>
            <p className="text-gray-500 text-sm">
              Creating 50 platform-optimized posts for <span className="text-white font-semibold">{selectedPage?.title}</span>
            </p>
          </div>

          <div className="space-y-3">
            {LOADING_MESSAGES.map((msg, i) => (
              <motion.div
                key={msg}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: i <= loadingMsgIdx ? 1 : 0.2, x: 0 }}
                transition={{ delay: i * 0.15 }}
                className="flex items-center gap-3"
              >
                {i < loadingMsgIdx ? (
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : i === loadingMsgIdx ? (
                  <Loader2 className="w-4 h-4 text-primary animate-spin shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-white/10 shrink-0" />
                )}
                <span className={cn("text-sm", i <= loadingMsgIdx ? "text-gray-300" : "text-gray-600")}>
                  {msg}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  /* ─── STEP 1: Select Product ─── */
  return (
    <div className="min-h-[70vh] flex items-center justify-center font-(family-name:--font-display) pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xl space-y-8"
      >
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold uppercase tracking-widest text-blue-400">
            <Globe className="w-3.5 h-3.5" /> Social Payouts
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Generate Social Media Posts
          </h1>
          <p className="text-gray-400 text-base max-w-md mx-auto">
            Select one of your synced products and we&apos;ll generate 50 platform-optimized posts with AI images.
          </p>
        </div>

        {/* Product Selector */}
        <GlassPanel intensity="low" className="p-6 border-white/10">
          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 block">
            Select a Synced Product
          </label>

          {loadingPages ? (
            <div className="flex items-center justify-center py-8 gap-3">
              <Loader2 className="w-5 h-5 text-primary animate-spin" />
              <span className="text-sm text-gray-400">Loading your products...</span>
            </div>
          ) : syncedPages.length === 0 ? (
            <div className="text-center py-8 space-y-3">
              <Layers className="w-10 h-10 text-gray-600 mx-auto" />
              <p className="text-gray-400 text-sm">No synced products found.</p>
              <p className="text-gray-500 text-xs">Sync a product first from the Wealth Sync page or Profit Accelerator.</p>
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full flex items-center justify-between px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white hover:bg-white/10 hover:border-white/20 transition-all"
              >
                {selectedPage ? (
                  <div className="flex items-center gap-3">
                    <span className="font-medium">{selectedPage.title}</span>
                    {selectedPage.niche && (
                      <span className={cn("inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border", (NICHE_COLORS[selectedPage.niche] || DEFAULT_NC).text, (NICHE_COLORS[selectedPage.niche] || DEFAULT_NC).bg, (NICHE_COLORS[selectedPage.niche] || DEFAULT_NC).border)}>
                        {selectedPage.niche}
                      </span>
                    )}
                  </div>
                ) : (
                  <span className="text-gray-500">Choose a product...</span>
                )}
                <ChevronDown className={cn("w-4 h-4 text-gray-500 transition-transform", dropdownOpen && "rotate-180")} />
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="absolute top-full left-0 right-0 mt-2 z-50 bg-black/95 border border-white/10 rounded-xl overflow-hidden backdrop-blur-xl shadow-2xl max-h-64 overflow-y-auto"
                  >
                    {syncedPages.map((page) => {
                      const nc = NICHE_COLORS[page.niche || "General"] || DEFAULT_NC;
                      const isSelected = selectedPage?.id === page.id;
                      return (
                        <button
                          key={page.id}
                          onClick={() => { setSelectedPage(page); setDropdownOpen(false); }}
                          className={cn(
                            "w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/5 transition-colors border-b border-white/5 last:border-0",
                            isSelected && "bg-primary/5"
                          )}
                        >
                          {isSelected && <CheckCircle className="w-4 h-4 text-primary shrink-0" />}
                          <span className={cn("text-sm font-medium", isSelected ? "text-white" : "text-gray-300")}>{page.title}</span>
                          {page.niche && (
                            <span className={cn("inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ml-auto", nc.text, nc.bg, nc.border)}>
                              {page.niche}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </GlassPanel>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={!selectedPage}
          className={cn(
            "w-full flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-sm font-bold uppercase tracking-wider transition-all duration-300",
            selectedPage
              ? "bg-linear-to-r from-blue-500 to-cyan-400 text-black hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:scale-[1.01]"
              : "bg-white/5 border border-white/10 text-gray-600 cursor-not-allowed"
          )}
        >
          <Sparkles className="w-5 h-5" />
          Generate 50 Social Media Posts
        </button>
      </motion.div>
    </div>
  );
}
