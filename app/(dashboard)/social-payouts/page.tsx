"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassPanel } from "@/components/ui/glass-panel";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/auth-context";
import {
  Globe,
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
  Link2,
  CheckCircle,
  Sparkles,
} from "lucide-react";

/* ─── Types ─── */
interface SyncedPage {
  id: string;
  title: string;
  niche?: string;
  affiliate_url: string;
}

interface NichePost {
  id: number;
  niche: string;
  text: string;
  platform: "facebook" | "twitter" | "instagram";
}

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

function getImageUrl(niche: string, postId: number): string {
  const style = IMAGE_STYLES[postId % IMAGE_STYLES.length];
  const prompt = `${style}, ${niche}, social media marketing post, professional, clean layout, no text overlay, high quality`;
  const seed = 5000 + postId;
  return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=800&height=450&seed=${seed}&nologo=true`;
}

function LazyPostImage({ niche, postId }: { niche: string; postId: number }) {
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

  const src = isVisible ? getImageUrl(niche, postId) : undefined;

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
          alt={`Social post for ${niche}`}
          className={cn("absolute inset-0 w-full h-full object-cover transition-opacity duration-500", loaded ? "opacity-100" : "opacity-0")}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
        />
      )}
    </div>
  );
}

/* ─── Generate 50 Posts Across All Niches ─── */
function generateAllNichePosts(): NichePost[] {
  const platforms: ("facebook" | "twitter" | "instagram")[] = ["facebook", "twitter", "instagram"];

  const templates: Record<string, string[]> = {
    "Health & Fitness": [
      "Your body is your greatest investment. Start treating it like one. Here's the program that changed my health game completely.",
      "I used to skip workouts constantly. Then I found a system that actually fits my schedule. No excuses, just results.",
      "Fitness isn't about perfection, it's about consistency. This tool keeps me on track every single day. Highly recommend.",
      "The secret to lasting health isn't a diet — it's a lifestyle system. This one makes it effortless.",
      "Woke up with more energy than I've had in years. All because I finally found the right health framework.",
    ],
    "Personal Finance": [
      "Your finances don't fix themselves. I started using this system and finally feel in control of my money.",
      "Building wealth isn't about how much you earn — it's about how smartly you manage it. This resource opened my eyes.",
      "I went from paycheck-to-paycheck to actually saving consistently. This financial system made the difference.",
      "The best investment you can make is in your financial education. This program delivers real results.",
      "Stop leaving money on the table. This tool helped me optimize every dollar I earn.",
    ],
    "Self-Improvement": [
      "Growth starts when comfort ends. This program pushed me to level up in ways I didn't think possible.",
      "The person you become matters more than what you achieve. This framework focuses on real transformation.",
      "I've read dozens of self-help books. Nothing compares to the actionable system I found here.",
      "Mindset is everything. This resource gave me the tools to reprogram my thinking for success.",
      "Every day is a chance to become better. This system makes daily improvement automatic.",
    ],
    "Online Business": [
      "Started my online business with zero experience. This system gave me the exact blueprint I needed.",
      "The internet is the greatest wealth-building tool ever created. This program shows you how to use it.",
      "Quit the 9-5 dream? It's possible. This framework showed me how to build income streams online.",
      "Your laptop is your office. Your wifi is your commute. This business system makes it all work.",
      "Online income isn't a myth — it's a method. This program lays out every step clearly.",
    ],
    "Weight Loss": [
      "Lost 15 pounds without starving myself. This program focuses on sustainable habits, not crash diets.",
      "Weight loss doesn't have to be miserable. Found a system that actually makes the journey enjoyable.",
      "The scale finally moved in the right direction. This structured approach to weight loss actually works.",
      "Forget everything you know about dieting. This method is backed by science and it shows.",
      "My confidence is through the roof since I started this weight loss system. Real results, real fast.",
    ],
    "Crypto Trading": [
      "Crypto doesn't have to be confusing. This system breaks down trading strategies anyone can follow.",
      "Made my first profitable trade using the exact framework taught in this program. Game changer.",
      "The crypto market rewards the prepared. This resource got me ready to trade with confidence.",
      "Stop guessing and start trading with a proven strategy. This system delivers consistent results.",
      "From crypto-curious to crypto-confident. This program accelerated my learning by months.",
    ],
    "Manifestation": [
      "Your thoughts create your reality. This manifestation system taught me how to align my energy with my goals.",
      "I manifested my dream opportunity within weeks of using this framework. The power of intention is real.",
      "Manifestation isn't magic — it's method. This program gives you the exact steps to attract abundance.",
      "Shifted my vibration and everything changed. This system makes manifestation practical and repeatable.",
      "The universe responds to clarity. This resource helped me get crystal clear on what I want.",
    ],
    "Relationship Coaching": [
      "Better relationships start with better communication. This program transformed how I connect with people.",
      "Struggled with dating for years. This coaching system gave me the confidence and skills I was missing.",
      "Your relationships define your quality of life. This framework helped me build deeper connections.",
      "Finally understand what makes relationships work. This program is backed by real psychology.",
      "The investment you make in your relationships pays dividends forever. This system is worth every minute.",
    ],
    "Productivity": [
      "Doubled my output in half the time. This productivity system is the real deal.",
      "Stop being busy and start being productive. This framework taught me the difference.",
      "Time is your most valuable asset. This program taught me how to protect and maximize it.",
      "The secret to getting more done isn't working harder — it's working smarter. This system proves it.",
      "Procrastination used to own me. This productivity method gave me my time back.",
    ],
    "Spirituality": [
      "Inner peace isn't found — it's cultivated. This spiritual framework changed my daily practice.",
      "Connected with my higher self using the techniques in this program. Truly transformational experience.",
      "Spirituality meets practicality in this system. Real tools for real inner growth.",
      "The journey inward is the most important one. This program guided me with clarity and wisdom.",
      "Found a sense of calm I didn't know was possible. This spiritual system delivered beyond expectations.",
    ],
  };

  const posts: NichePost[] = [];
  let id = 1;

  for (const niche of NICHE_LIST) {
    const nicheTemplates = templates[niche];
    for (let i = 0; i < 5; i++) {
      const platform = platforms[i % 3];
      posts.push({ id: id++, niche, text: nicheTemplates[i], platform });
    }
  }

  return posts;
}

const ALL_POSTS = generateAllNichePosts();

/* ════════════════════════ PAGE ════════════════════════ */

export default function SocialPayoutsPage() {
  const { user } = useAuth();

  const [syncedPages, setSyncedPages] = useState<SyncedPage[]>([]);
  const [loadingPages, setLoadingPages] = useState(true);

  /* Per-post state: which post has its link selector open, and which post has a linked product */
  const [linkSelectorOpen, setLinkSelectorOpen] = useState<number | null>(null);
  const [linkedProducts, setLinkedProducts] = useState<Record<number, SyncedPage>>({});

  const [copiedPostId, setCopiedPostId] = useState<number | null>(null);
  const [expandedPost, setExpandedPost] = useState<number | null>(null);

  /* Filters */
  const [nicheFilter, setNicheFilter] = useState<string>("all");
  const [platformFilter, setPlatformFilter] = useState<string>("all");

  /* Fetch synced pages */
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

  const filteredPosts = ALL_POSTS.filter((p) => {
    if (nicheFilter !== "all" && p.niche !== nicheFilter) return false;
    if (platformFilter !== "all" && p.platform !== platformFilter) return false;
    return true;
  });

  const handleLinkProduct = (postId: number, page: SyncedPage) => {
    setLinkedProducts((prev) => ({ ...prev, [postId]: page }));
    setLinkSelectorOpen(null);
  };

  const handleCopyPost = (post: NichePost) => {
    const linked = linkedProducts[post.id];
    const text = linked && linked.affiliate_url
      ? `${post.text}\n\nCheck it out here: ${linked.affiliate_url}`
      : post.text;
    navigator.clipboard.writeText(text);
    setCopiedPostId(post.id);
    setTimeout(() => setCopiedPostId(null), 2000);
  };

  return (
    <div className="space-y-8 pb-20 font-(family-name:--font-display)">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="p-8 md:p-10 rounded-2xl border border-white/5 bg-linear-to-br from-blue-500/5 via-black/40 to-transparent backdrop-blur-sm text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold uppercase tracking-widest text-blue-400 mb-6">
          <Sparkles className="w-3.5 h-3.5" /> Premium Feature
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-3">
          Social Payouts
        </h1>
        <p className="text-gray-400 text-base max-w-2xl mx-auto">
          50 ready-to-publish social media posts across all niches. Add your affiliate link to any post, then copy the text or download the image.
        </p>
      </motion.div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Niche Filter */}
        <div className="relative flex-1">
          <select
            value={nicheFilter}
            onChange={(e) => setNicheFilter(e.target.value)}
            className="w-full appearance-none px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-primary/40 transition-colors cursor-pointer pr-10"
          >
            <option value="all">All Niches</option>
            {NICHE_LIST.map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
        </div>

        {/* Platform Filter */}
        <div className="flex gap-2">
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
              {pf === "all" ? "All" : pf.charAt(0).toUpperCase() + pf.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-gray-500">{filteredPosts.length} posts</p>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPosts.map((post, index) => {
          const pc = platformConfig[post.platform];
          const PlatformIcon = pc.icon;
          const nc = NICHE_COLORS[post.niche] || DEFAULT_NC;
          const isExpanded = expandedPost === post.id;
          const isCopied = copiedPostId === post.id;
          const linked = linkedProducts[post.id];
          const isSelectorOpen = linkSelectorOpen === post.id;

          return (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(index * 0.02, 0.3) }}
            >
              <GlassPanel
                intensity="low"
                className="p-0 border-white/5 hover:border-primary/20 transition-all duration-300 h-full flex flex-col"
              >
                {/* AI Image */}
                <div className="relative">
                  <LazyPostImage niche={post.niche} postId={post.id} />
                  <div className={cn("absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border backdrop-blur-sm", pc.bg, pc.color, pc.border)}>
                    <PlatformIcon className="w-3 h-3" />{pc.label}
                  </div>
                  <div className={cn("absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border backdrop-blur-sm", nc.text, nc.bg, nc.border)}>
                    {post.niche}
                  </div>
                </div>

                {/* Post Content */}
                <div className="p-4 flex-1 flex flex-col">
                  <p className={cn("text-sm text-gray-300 leading-relaxed mb-4 flex-1", !isExpanded && "line-clamp-3")}>
                    {post.text}
                    {linked && linked.affiliate_url && (
                      <span className="block mt-2 text-primary text-xs font-medium">
                        🔗 {linked.affiliate_url}
                      </span>
                    )}
                  </p>

                  {/* Add Affiliate Link / Linked Status */}
                  <div className="relative mb-3">
                    {linked ? (
                      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-400/5 border border-emerald-400/20">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="text-xs text-emerald-400 font-medium truncate">{linked.title}</span>
                        <button
                          onClick={() => { setLinkedProducts((prev) => { const n = { ...prev }; delete n[post.id]; return n; }); }}
                          className="ml-auto text-[10px] text-gray-500 hover:text-red-400 transition-colors shrink-0"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setLinkSelectorOpen(isSelectorOpen ? null : post.id)}
                        className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs font-bold text-blue-400 uppercase tracking-wider hover:bg-blue-500/20 hover:border-blue-500/40 transition-all"
                      >
                        <Link2 className="w-3.5 h-3.5" /> Add Affiliate Link
                      </button>
                    )}

                    {/* Product Selector Dropdown */}
                    <AnimatePresence>
                      {isSelectorOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="absolute top-full left-0 right-0 mt-2 z-50 bg-black/95 border border-white/10 rounded-xl overflow-hidden backdrop-blur-xl shadow-2xl max-h-48 overflow-y-auto"
                        >
                          {loadingPages ? (
                            <div className="flex items-center justify-center py-4 gap-2">
                              <Loader2 className="w-4 h-4 text-primary animate-spin" />
                              <span className="text-xs text-gray-400">Loading...</span>
                            </div>
                          ) : syncedPages.length === 0 ? (
                            <div className="p-4 text-center text-xs text-gray-500">
                              No synced products. Sync a product first.
                            </div>
                          ) : (
                            syncedPages.map((page) => {
                              const pnc = NICHE_COLORS[page.niche || "General"] || DEFAULT_NC;
                              return (
                                <button
                                  key={page.id}
                                  onClick={() => handleLinkProduct(post.id, page)}
                                  className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
                                >
                                  <span className="text-xs text-gray-300 font-medium truncate">{page.title}</span>
                                  {page.niche && (
                                    <span className={cn("inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold uppercase border ml-auto shrink-0", pnc.text, pnc.bg, pnc.border)}>
                                      {page.niche}
                                    </span>
                                  )}
                                </button>
                              );
                            })
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Actions — only visible after linking */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={() => setExpandedPost(isExpanded ? null : post.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-xs font-medium text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                    >
                      <Eye className="w-3 h-3" />
                      {isExpanded ? "Less" : "View"}
                    </button>

                    <button
                      onClick={() => linked && handleCopyPost(post)}
                      disabled={!linked}
                      className={cn(
                        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all",
                        linked
                          ? "bg-white/5 border-white/5 text-gray-400 hover:text-emerald-400 hover:bg-emerald-400/10 hover:border-emerald-400/20"
                          : "bg-white/[0.02] border-white/5 text-gray-600 cursor-not-allowed opacity-40"
                      )}
                      title={!linked ? "Add affiliate link first" : "Copy post text with your link"}
                    >
                      {isCopied ? (
                        <><Check className="w-3 h-3 text-emerald-400" /><span className="text-emerald-400">Copied!</span></>
                      ) : (
                        <><Copy className="w-3 h-3" /> Copy Text</>
                      )}
                    </button>

                    <a
                      href={linked ? getImageUrl(post.niche, post.id) : undefined}
                      download={linked ? `social-post-${post.id}.jpg` : undefined}
                      target={linked ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className={cn(
                        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all",
                        linked
                          ? "bg-white/5 border-white/5 text-gray-400 hover:text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-400/20"
                          : "bg-white/[0.02] border-white/5 text-gray-600 cursor-not-allowed opacity-40 pointer-events-none"
                      )}
                      title={!linked ? "Add affiliate link first" : "Download image"}
                      onClick={(e) => { if (!linked) e.preventDefault(); }}
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
