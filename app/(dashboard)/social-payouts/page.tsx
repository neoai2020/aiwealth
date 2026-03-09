"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassPanel } from "@/components/ui/glass-panel";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/auth-context";
import {
  Copy,
  Check,
  Download,
  Loader2,
  Link2,
  CheckCircle,
  Sparkles,
  Search,
  X,
  Heart,
  Brain,
  DollarSign,
  Laptop,
  Scale,
  Bitcoin,
  Star,
  Users,
  Clock,
  Flame,
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
}

/* ─── Niches ─── */
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

const NICHE_ICONS: Record<string, React.ElementType> = {
  "Health & Fitness": Heart,
  "Personal Finance": DollarSign,
  "Self-Improvement": Brain,
  "Online Business": Laptop,
  "Weight Loss": Scale,
  "Crypto Trading": Bitcoin,
  "Manifestation": Star,
  "Relationship Coaching": Users,
  "Productivity": Clock,
  "Spirituality": Flame,
};

const NICHE_COLORS: Record<string, { text: string; bg: string; border: string; accent: string }> = {
  "Health & Fitness": { text: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/20", accent: "from-emerald-500/20 to-emerald-400/5" },
  "Personal Finance": { text: "text-cyan-400", bg: "bg-cyan-400/10", border: "border-cyan-400/20", accent: "from-cyan-500/20 to-cyan-400/5" },
  "Self-Improvement": { text: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/20", accent: "from-purple-500/20 to-purple-400/5" },
  "Online Business": { text: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/20", accent: "from-amber-500/20 to-amber-400/5" },
  "Weight Loss": { text: "text-rose-400", bg: "bg-rose-400/10", border: "border-rose-400/20", accent: "from-rose-500/20 to-rose-400/5" },
  "Crypto Trading": { text: "text-orange-400", bg: "bg-orange-400/10", border: "border-orange-400/20", accent: "from-orange-500/20 to-orange-400/5" },
  "Manifestation": { text: "text-violet-400", bg: "bg-violet-400/10", border: "border-violet-400/20", accent: "from-violet-500/20 to-violet-400/5" },
  "Relationship Coaching": { text: "text-pink-400", bg: "bg-pink-400/10", border: "border-pink-400/20", accent: "from-pink-500/20 to-pink-400/5" },
  "Productivity": { text: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/20", accent: "from-blue-500/20 to-blue-400/5" },
  "Spirituality": { text: "text-indigo-400", bg: "bg-indigo-400/10", border: "border-indigo-400/20", accent: "from-indigo-500/20 to-indigo-400/5" },
};
const DEFAULT_NC = { text: "text-gray-400", bg: "bg-gray-400/10", border: "border-gray-400/20", accent: "from-gray-500/20 to-gray-400/5" };

function LazyPostImage({ niche, postId, storedUrl }: { niche: string; postId: number; storedUrl?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); obs.disconnect(); } },
      { rootMargin: "300px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    setLoaded(false);
  }, [isVisible, storedUrl]);

  return (
    <div ref={ref} className="aspect-square bg-black/40 relative overflow-hidden">
      {(!loaded || !isVisible) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
          <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{storedUrl ? "Loading..." : "Preparing..."}</span>
        </div>
      )}
      {storedUrl ? (
        <img
          src={storedUrl}
          alt={`Social post for ${niche}`}
          className={cn("absolute inset-0 w-full h-full object-cover transition-opacity duration-500", loaded ? "opacity-100" : "opacity-0")}
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(false)}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-white/5 to-black/40">
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Image Not Seeded Yet</span>
        </div>
      )}
    </div>
  );
}

/* ─── Product Selector Modal ─── */
function ProductSelectorModal({
  syncedPages,
  loading,
  onSelect,
  onClose,
}: {
  syncedPages: SyncedPage[];
  loading: boolean;
  onSelect: (page: SyncedPage) => void;
  onClose: () => void;
}) {
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  const filtered = syncedPages.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    (p.niche || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-md bg-black/95 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl overflow-hidden">
        <div className="p-5 border-b border-white/5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Select a Synced Product</h3>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by product name or niche..."
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:border-primary/40 transition-colors"
            />
          </div>
        </div>

        <div className="max-h-64 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center py-8 gap-2">
              <Loader2 className="w-4 h-4 text-primary animate-spin" />
              <span className="text-xs text-gray-400">Loading products...</span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-xs text-gray-500">{syncedPages.length === 0 ? "No synced products yet." : "No products match your search."}</p>
              {syncedPages.length === 0 && <p className="text-[10px] text-gray-600 mt-1">Sync a product first from Recurring Wealth Streams or Profit Accelerator.</p>}
            </div>
          ) : (
            filtered.map((page) => {
              const pnc = NICHE_COLORS[page.niche || ""] || DEFAULT_NC;
              return (
                <button
                  key={page.id}
                  onClick={() => onSelect(page)}
                  className="w-full flex items-center gap-3 px-5 py-3 text-left hover:bg-white/5 transition-colors border-b border-white/[0.03] last:border-0"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-200 font-medium truncate">{page.title}</p>
                    {page.affiliate_url && <p className="text-[10px] text-gray-600 truncate mt-0.5">{page.affiliate_url}</p>}
                  </div>
                  {page.niche && (
                    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase border shrink-0", pnc.text, pnc.bg, pnc.border)}>
                      {page.niche}
                    </span>
                  )}
                </button>
              );
            })
          )}
        </div>
      </motion.div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   50 PROVEN POSTS PER NICHE
   ════════════════════════════════════════════════════════ */

const NICHE_POSTS: Record<string, string[]> = {
  "Health & Fitness": [
    "Your body is your greatest investment. Start treating it like one. This program changed my health game completely.",
    "I used to skip workouts constantly. Then I found a system that actually fits my schedule. No excuses, just results.",
    "Fitness isn't about perfection — it's about consistency. This tool keeps me on track every single day.",
    "The secret to lasting health isn't a diet — it's a lifestyle system. This one makes it effortless.",
    "Woke up with more energy than I've had in years. All because I finally found the right health framework.",
    "Stop overcomplicating fitness. This simple system gave me visible results in just 3 weeks.",
    "Your health determines everything — your energy, mood, confidence. This program addresses all three.",
    "I spent years trying different programs. This was the first one that actually stuck. No gimmicks, just science.",
    "The gym used to feel like a chore. Now I look forward to every session thanks to this method.",
    "You don't need expensive equipment or a personal trainer. Just the right system. Found mine here.",
    "Health is wealth — literally. The more energy you have, the more productive and successful you become.",
    "3 months ago I could barely run a mile. Today I'm in the best shape of my life. This system works.",
    "If you're tired of starting over every Monday, you need a framework that makes consistency automatic.",
    "My doctor was shocked at my last checkup. This health system delivers results that even professionals notice.",
    "Meal prep used to overwhelm me. This system simplified everything and I'm eating better than ever.",
    "The biggest lie in fitness is that you need to spend hours at the gym. 30 minutes with the right plan is enough.",
    "I've tried every supplement out there. Turns out, the right system beats any pill. Found it here.",
    "Accountability changed everything for me. This program has a built-in system that keeps you going.",
    "Flexibility and mobility are just as important as strength. This program covers all the bases.",
    "My mental health improved dramatically once I started this fitness system. Mind and body are connected.",
    "Don't wait until January to start. The best time to invest in your health is right now.",
    "This program taught me that recovery is just as important as the workout itself. Game changer.",
    "I was skeptical at first, but the science behind this system is solid. The results speak for themselves.",
    "Forget about six-pack abs. Focus on feeling amazing every single day. This system prioritizes real health.",
    "Hydration, sleep, movement — this program ties it all together into one simple daily routine.",
    "The best workout is the one you actually do. This system makes showing up the easiest part.",
    "I tried going vegan, keto, paleo — nothing stuck. This flexible approach finally worked for my lifestyle.",
    "Running on empty is not a badge of honor. This health system taught me to fuel my body properly.",
    "My energy levels at 40 are better than they were at 25. All thanks to this comprehensive system.",
    "You don't need motivation — you need a system. This program builds habits that last a lifetime.",
    "Sleep quality improved, brain fog disappeared, and I finally have sustained energy throughout the day.",
    "This isn't just a fitness program — it's a complete health transformation framework.",
    "Stop punishing your body and start working with it. This system teaches you how.",
    "I never thought I'd enjoy cooking healthy meals. This program made nutrition fun and simple.",
    "The community inside this program is incredibly supportive. You're never working out alone.",
    "Stress was destroying my health. This system includes stress management techniques that actually work.",
    "My posture improved, my back pain disappeared, and I feel 10 years younger. Highly recommend.",
    "Fitness influencers overcomplicate everything. This program strips it back to what actually works.",
    "The 30-day challenge inside this program was enough to build habits that I still follow a year later.",
    "I used to hate mornings. Now I wake up at 5am feeling energized. This health system rewired my routine.",
    "Progress photos don't lie. The transformation I've seen in 90 days is something I never thought possible.",
    "This system adapts to your fitness level — whether you're a total beginner or an experienced athlete.",
    "Joint pain had me thinking my active days were over. This program proved me wrong.",
    "The nutrition guide alone is worth 10x the investment. Practical, simple, and effective.",
    "You can't out-train a bad diet, and you can't out-diet a bad mindset. This system fixes both.",
    "Tracking my progress used to feel tedious. The tools in this program make it effortless and motivating.",
    "I dropped 3 pant sizes without stepping on a scale once. This system focuses on how you feel, not numbers.",
    "My immune system has never been stronger. This holistic approach to health covers everything.",
    "Weekend warrior no more — this program taught me how to be consistent 7 days a week without burnout.",
    "If you only invest in one thing this year, make it your health. This system is the best place to start.",
  ],
  "Personal Finance": [
    "Your finances don't fix themselves. I started using this system and finally feel in control of my money.",
    "Building wealth isn't about how much you earn — it's about how smartly you manage it. This resource opened my eyes.",
    "I went from paycheck-to-paycheck to actually saving consistently. This financial system made the difference.",
    "The best investment you can make is in your financial education. This program delivers real results.",
    "Stop leaving money on the table. This tool helped me optimize every dollar I earn.",
    "Financial freedom isn't just for the wealthy — it's a system anyone can learn. Found my blueprint here.",
    "I used to dread looking at my bank account. Now I check it with confidence every single day.",
    "Budgeting doesn't mean restriction. This program showed me how to spend smarter and save more.",
    "Compound interest is the 8th wonder of the world. This system taught me how to harness it.",
    "My credit score jumped 120 points after following the strategies in this financial program.",
    "Debt felt like a prison. This program gave me a clear, actionable escape plan that actually worked.",
    "I started investing with just $50/month using the strategies from this system. Now my portfolio is thriving.",
    "Emergency fund? Check. Retirement plan? Check. This system helped me build both from scratch.",
    "The money mindset shift this program teaches is worth more than any amount of financial tips.",
    "I finally understand taxes, investing, and passive income. This financial education is top-tier.",
    "Multiple income streams aren't a luxury — they're a necessity. This system shows you exactly how.",
    "My partner and I used to fight about money constantly. This program gave us a shared financial plan.",
    "Automating my finances was the single best decision I've ever made. This system shows you how step by step.",
    "The wealthy don't work harder — they work smarter with money. This program reveals their exact strategies.",
    "I went from $0 saved to a 6-month emergency fund in under a year. This system made it possible.",
    "Retirement planning in your 20s sounds boring until you realize you could retire at 45. This program shows how.",
    "This system doesn't just teach you about money — it transforms your entire relationship with wealth.",
    "Side income used to seem impossible with my schedule. This program showed me realistic options that fit.",
    "I used to think investing was only for experts. This beginner-friendly system proved me completely wrong.",
    "The gap between where you are and financial freedom is just information. This program bridges that gap.",
    "Inflation is eating your savings. This system taught me where to put my money to actually grow it.",
    "Financial anxiety kept me up at night. Since starting this program, I sleep peacefully knowing I have a plan.",
    "My net worth has doubled since I started applying the principles from this financial system.",
    "Don't wait for a raise to improve your finances. This system works with whatever income you have right now.",
    "The debt snowball method in this program helped me eliminate $23K in debt in 18 months.",
    "This program covers everything — banking, investing, insurance, taxes — in plain, simple language.",
    "I was financially illiterate at 30. By 32, I had a diversified portfolio. This system fast-tracked my education.",
    "Passive income isn't a myth. This program gave me three realistic streams I could start immediately.",
    "Money management isn't taught in school. This program fills that gap better than any course I've seen.",
    "I stopped impulse buying after this program changed how I think about every purchase.",
    "This financial system has a built-in accountability tracker that keeps you honest with your spending.",
    "Real wealth is built slowly and consistently. This system teaches patience backed by strategy.",
    "I finally set up my kids' college fund using the strategies from this program. Future-proof planning.",
    "The ROI on financial education is infinite. This program was the best investment I've ever made.",
    "I negotiated a $12K raise after learning the salary negotiation tactics in this program.",
    "Cryptocurrency, index funds, real estate — this system covers all modern wealth-building strategies.",
    "My savings rate went from 5% to 35% without feeling like I was sacrificing anything. This system works.",
    "The 50/30/20 rule is just the beginning. This program takes budgeting to a whole new level.",
    "I used to think I needed a financial advisor. This program gave me the knowledge to manage my own wealth.",
    "Wealth protection is just as important as wealth creation. This system covers both sides.",
    "This program helped me negotiate lower rates on my mortgage, insurance, and even my phone bill.",
    "Financial independence means your money works harder than you do. This system teaches you exactly how.",
    "The community in this program shares real wins and strategies. It's like having a room full of mentors.",
    "I'm 3 years away from paying off my house early, all because of the strategies from this system.",
    "If money stresses you out, this is the program that will change everything. It changed mine.",
  ],
  "Self-Improvement": [
    "Growth starts when comfort ends. This program pushed me to level up in ways I didn't think possible.",
    "The person you become matters more than what you achieve. This framework focuses on real transformation.",
    "I've read dozens of self-help books. Nothing compares to the actionable system I found here.",
    "Mindset is everything. This resource gave me the tools to reprogram my thinking for success.",
    "Every day is a chance to become better. This system makes daily improvement automatic.",
    "Self-improvement isn't selfish — it's necessary. This program taught me to prioritize my own growth.",
    "I was stuck in the same patterns for years. This system broke the cycle and gave me a fresh start.",
    "Journaling, habits, mindset — this program covers every angle of personal development.",
    "The morning routine from this program alone transformed my productivity and mental clarity.",
    "Stop reading about success and start building it. This system provides the exact roadmap.",
    "Confidence isn't something you're born with — it's something you build. This program shows you how.",
    "I went from chronic self-doubt to unshakable self-belief using the techniques in this system.",
    "Goal setting is an art and a science. This program teaches both better than anything else I've found.",
    "The daily challenges in this program pushed me out of my comfort zone in the best way possible.",
    "Emotional intelligence is your superpower. This system helps you develop it systematically.",
    "I replaced scrolling with learning, and this program was the catalyst for that shift.",
    "This program doesn't give you motivation — it gives you discipline. And discipline lasts forever.",
    "The limiting beliefs exercise in this system was a breakthrough moment for me. Life-changing.",
    "Success leaves clues. This program analyzes the habits of high performers and makes them accessible.",
    "I used to be a chronic procrastinator. This system's framework turned me into a consistent executor.",
    "Your environment shapes your identity. This program teaches you to design both intentionally.",
    "The 90-day transformation challenge in this program is intense but incredibly rewarding.",
    "I stopped comparing myself to others after this program taught me to focus on my own growth curve.",
    "Communication skills, leadership, presence — this system develops the whole person, not just one area.",
    "Reading one book a month was my goal. This program helped me read 30 in a year by optimizing my routine.",
    "Self-awareness is the foundation of all growth. This program's assessment tools are incredibly accurate.",
    "The accountability partner system in this program kept me consistent when willpower wasn't enough.",
    "I went from reactive to proactive in my daily life. This program taught me how to lead myself first.",
    "Fear of failure used to paralyze me. This system reframed failure as data, and everything changed.",
    "This isn't just self-help — it's self-engineering. A systematic approach to becoming your best version.",
    "The visualization techniques in this program are backed by neuroscience and they genuinely work.",
    "I was burnt out and lost. This program gave me clarity on who I am and where I'm going.",
    "Small daily improvements compound into massive results. This system makes those improvements effortless.",
    "I learned more about myself in 30 days with this program than in 30 years without it.",
    "This program taught me that discipline is just a series of small decisions made consistently.",
    "Public speaking used to terrify me. The confidence framework in this program cured that fear.",
    "Your inner dialogue determines your outer reality. This system teaches you to master self-talk.",
    "I set boundaries for the first time in my life after this program showed me their power.",
    "The weekly review system in this program keeps me aligned with my goals every single week.",
    "Meditation felt impossible until this program's guided approach made it click. Now I meditate daily.",
    "This system teaches you to embrace discomfort as a growth signal. That single mindset shift changed everything.",
    "I dropped toxic habits I'd carried for a decade using the behavior change techniques in this program.",
    "The mentorship network inside this program connected me with people who elevated my entire life.",
    "Decision fatigue was real for me. This system's frameworks simplified every choice I make.",
    "This program doesn't just set goals — it engineers the identity of someone who achieves them.",
    "I finally stopped self-sabotaging. The psychological frameworks in this program are incredibly powerful.",
    "Your habits define your future. This system helps you audit, redesign, and automate better ones.",
    "This program's approach to resilience training helped me bounce back from my biggest setback ever.",
    "Personal growth is a journey, not a destination. This system makes the journey structured and enjoyable.",
    "If you feel like you're capable of more, you are. This program unlocks the potential you already have.",
  ],
  "Online Business": [
    "Started my online business with zero experience. This system gave me the exact blueprint I needed.",
    "The internet is the greatest wealth-building tool ever created. This program shows you how to use it.",
    "Quit the 9-5? It's possible. This framework showed me how to build income streams online.",
    "Your laptop is your office. Your wifi is your commute. This business system makes it all work.",
    "Online income isn't a myth — it's a method. This program lays out every step clearly.",
    "I launched my first digital product and made $2,000 in the first month using this system.",
    "Affiliate marketing seemed too good to be true. This program proved it's legitimate and scalable.",
    "The traffic generation strategies in this system brought me 10K visitors in my first 30 days.",
    "E-commerce, digital products, coaching — this system covers every online business model.",
    "Passive income online requires active setup. This program shows you exactly what to build and how.",
    "I was paralyzed by information overload. This system cut through the noise with a clear action plan.",
    "My online business now generates more than my corporate salary ever did. This program made it happen.",
    "Email marketing is still king. The automation strategies in this system 10x'd my conversions.",
    "SEO felt like black magic until this program broke it down into simple, repeatable steps.",
    "The funnel templates in this system saved me months of trial and error. Plug and profit.",
    "Social media marketing doesn't have to consume your life. This system teaches efficient strategies.",
    "I built a 6-figure online business in 12 months following this program's step-by-step roadmap.",
    "The biggest myth about online business is that you need a huge audience. You just need the right system.",
    "Copywriting is the #1 skill for online business. This program's copywriting module is pure gold.",
    "This system taught me to validate ideas before building them. Saved me thousands in wasted effort.",
    "Scaling from $1K to $10K/month seemed impossible. This program showed me it was just a system problem.",
    "I created my first course using the framework in this program. It now generates income while I sleep.",
    "The community in this program is full of real entrepreneurs sharing real strategies. Not just theory.",
    "Paid advertising felt risky. This system's approach to ads turned my first campaign profitable immediately.",
    "I replaced my full-time income in 6 months with the online business strategies from this program.",
    "Customer acquisition, retention, upselling — this system covers the full lifecycle of online business.",
    "The website templates and tools recommended in this program saved me thousands on development costs.",
    "I went from idea to first sale in 14 days using the rapid launch framework in this system.",
    "Outsourcing and delegation changed my business. This program teaches you when and how to hire.",
    "The analytics dashboard approach in this system helped me understand exactly what's driving revenue.",
    "Recurring revenue is the holy grail. This program shows you how to build subscription-based income.",
    "I used to trade time for money. Now my online systems work 24/7. This program taught me how.",
    "The niche selection framework in this system is brilliant. It helped me find a profitable market fast.",
    "Content creation strategies from this program helped me build authority in my niche within weeks.",
    "Webinars seemed intimidating. This system's webinar blueprint made my first one a $5K success.",
    "This program doesn't just teach tactics — it builds the entrepreneurial mindset you need to win.",
    "I failed at 3 online businesses before this program showed me what I was doing wrong. Now I'm thriving.",
    "The partnership and JV strategies in this system opened doors I never knew existed.",
    "Your online business is only as good as your systems. This program helps you build bulletproof ones.",
    "I went from zero subscribers to 10K on my email list using the lead generation tactics here.",
    "The pricing strategies in this program helped me increase my average order value by 300%.",
    "Remote work and online business are the future. This system prepares you for both.",
    "Product launches used to stress me out. This system's launch playbook makes them predictable and profitable.",
    "I learned more in this program's first module than in 2 years of YouTube tutorials.",
    "Dropshipping, print-on-demand, digital products — this system helped me pick the right model for me.",
    "The mindset module in this business program was unexpected but completely necessary. It changed my approach.",
    "International markets opened up new revenue for me. This program shows you how to go global online.",
    "I automated 80% of my business operations using the systems and tools from this program.",
    "The accountability and milestone system keeps you moving forward even when motivation dips.",
    "If you've been thinking about starting an online business, stop thinking and start with this system.",
  ],
  "Weight Loss": [
    "Lost 15 pounds without starving myself. This program focuses on sustainable habits, not crash diets.",
    "Weight loss doesn't have to be miserable. Found a system that actually makes the journey enjoyable.",
    "The scale finally moved in the right direction. This structured approach to weight loss actually works.",
    "Forget everything you know about dieting. This method is backed by science and it shows.",
    "My confidence is through the roof since I started this weight loss system. Real results, real fast.",
    "Calorie counting drove me crazy. This system uses a smarter approach that doesn't require obsessing over numbers.",
    "I've tried every fad diet. This is the first program that gave me lasting, sustainable results.",
    "The meal plans in this system are actually delicious. Weight loss has never tasted this good.",
    "My energy levels skyrocketed after the first week. This system fuels your body while shedding the weight.",
    "I lost 30 pounds in 4 months and kept it off. That's what separates this system from everything else.",
    "Emotional eating was my biggest enemy. This program gave me tools to break the cycle for good.",
    "The before and after photos from this community are inspiring. Real people, real transformations.",
    "I didn't just lose weight — I gained a completely new relationship with food. This system changed everything.",
    "No shakes. No pills. No gimmicks. Just a scientifically-backed system that delivers results.",
    "Metabolism isn't fixed. This program taught me how to optimize mine for efficient fat burning.",
    "The workout routines in this weight loss system are short, effective, and don't require a gym.",
    "I used to yo-yo diet constantly. This system broke the pattern and gave me permanent change.",
    "Portion control felt impossible until this program simplified it with practical, easy-to-follow guidelines.",
    "My doctor told me I was pre-diabetic. 6 months later with this system, all markers are normal.",
    "The psychology of weight loss is just as important as the nutrition. This program addresses both.",
    "Late-night snacking was my downfall. This system's evening routine eliminated cravings completely.",
    "I went down 4 dress sizes in 3 months. This program is the real deal. No exaggeration.",
    "Intermittent fasting was confusing until this system gave me a clear, personalized approach.",
    "The grocery shopping lists in this program made healthy eating simple and budget-friendly.",
    "I never thought I'd enjoy exercising. This weight loss system found the activities I actually love.",
    "Stress eating is a real thing. This program's stress management component was a game-changer for me.",
    "Plateaus used to discourage me. This system taught me they're normal and how to break through them.",
    "I lost weight while still enjoying my favorite foods. This program teaches balance, not deprivation.",
    "The progress tracking tools in this system kept me motivated and accountable every single day.",
    "Hormonal weight gain felt unbeatable. This program's hormone-balancing approach finally worked.",
    "I went from avoiding mirrors to loving my reflection. This transformation was mental and physical.",
    "This system taught me that sleep is critical for weight loss. Optimizing my sleep changed everything.",
    "The fiber and hydration strategies in this program are simple but incredibly effective for weight loss.",
    "I stopped comparing my journey to others. This system focuses on your personal baseline and progress.",
    "My knees used to ache from the extra weight. Now I'm running 5Ks. This system gave me my mobility back.",
    "Cooking healthy used to take hours. The quick-prep recipes in this program take 15 minutes max.",
    "I learned that weight loss is 80% nutrition. This system's food framework is the best I've ever seen.",
    "The accountability partner feature in this program kept me going when I wanted to quit.",
    "Inflammation was making me feel bloated and sluggish. This system's anti-inflammatory approach worked fast.",
    "I've maintained my goal weight for over a year now. This system doesn't just help you lose — it helps you keep.",
    "Weekend binges used to undo all my progress. This program taught me how to enjoy weekends without derailing.",
    "The mindset module in this weight loss program was the missing piece I never knew I needed.",
    "I went from a size 16 to a size 8. Not through suffering — through smart, sustainable habits.",
    "Water retention was masking my progress. This system's hydration protocol revealed results I couldn't see.",
    "My gut health improved dramatically. This system understands the connection between gut and weight.",
    "I feel lighter, happier, and more confident. This weight loss journey changed every aspect of my life.",
    "This program proved that age isn't an excuse. I started at 52 and got better results than in my 20s.",
    "The macro-balancing approach in this system made nutrition simple without obsessive tracking.",
    "I didn't believe in weight loss programs. This one made me a believer with undeniable results.",
    "If you're ready to lose weight the right way — sustainably and enjoyably — this system is for you.",
  ],
  "Crypto Trading": [
    "Crypto doesn't have to be confusing. This system breaks down trading strategies anyone can follow.",
    "Made my first profitable trade using the exact framework taught in this program. Game changer.",
    "The crypto market rewards the prepared. This resource got me ready to trade with confidence.",
    "Stop guessing and start trading with a proven strategy. This system delivers consistent results.",
    "From crypto-curious to crypto-confident. This program accelerated my learning by months.",
    "I lost money in crypto before finding this system. Now every trade follows a disciplined strategy.",
    "The risk management framework in this program saved me from common mistakes that wipe out beginners.",
    "DCA, swing trading, scalping — this system teaches multiple strategies so you can find your style.",
    "I turned $500 into $5,000 in 6 months using the strategies from this trading program.",
    "The technical analysis module in this system made chart reading intuitive, not intimidating.",
    "Crypto Twitter is noise. This program is signal. Clear, actionable, and profitable strategies.",
    "I used to panic-sell during dips. This system's mindset training gave me the discipline to hold and profit.",
    "The portfolio diversification strategy in this program protects against volatility while maximizing gains.",
    "DeFi, NFTs, altcoins — this system covers the entire crypto ecosystem with clear explanations.",
    "My trading journal improved dramatically after this program taught me how to analyze every trade.",
    "I went from staring at charts all day to spending 30 minutes and making better decisions. This system works.",
    "The entry and exit signals in this program are crystal clear. No more second-guessing trades.",
    "Leverage trading seemed too risky until this system showed me how to use it responsibly.",
    "This program's backtesting framework helped me validate strategies before risking real money.",
    "The community alerts in this system have highlighted opportunities I would have completely missed.",
    "Crypto taxes were a nightmare until this program showed me how to track and optimize them.",
    "I've been trading for 2 years, and this program still taught me strategies I'd never considered.",
    "The bear market survival guide in this system is worth the investment alone. It saved my portfolio.",
    "Staking, yield farming, liquidity pools — this program turns complex DeFi into simple, profitable actions.",
    "My monthly crypto income now exceeds my day job. This system provided the roadmap to get here.",
    "The sentiment analysis tools taught in this program give me an edge most retail traders don't have.",
    "I finally understand on-chain analytics thanks to this system. It's like having X-ray vision for the market.",
    "Paper trading before going live was the smartest advice from this program. Built my confidence risk-free.",
    "The bot trading module in this system automated my strategy and I'm earning while I sleep.",
    "Crypto scams are everywhere. This program taught me how to identify and avoid them instantly.",
    "The weekly market breakdown in this system keeps me informed without information overload.",
    "I used to follow influencers blindly. This program taught me to trust data and my own analysis.",
    "The options trading module opened up a whole new dimension of crypto profits I didn't know existed.",
    "Dollar-cost averaging seemed boring until I saw the compounding results. This system visualizes the math.",
    "My win rate went from 40% to 72% after implementing the strategies from this trading program.",
    "The psychological discipline framework in this system is what separates profitable traders from the rest.",
    "Altcoin season preparation is covered brilliantly in this program. I was positioned perfectly for the last run.",
    "I converted my crypto gains into real estate using the wealth-building framework from this system.",
    "The hardware wallet and security module in this program protects your profits. Essential knowledge.",
    "This program taught me that the best trades are often the ones you don't take. Patience is profit.",
    "Tokenomics analysis from this system helped me identify undervalued projects before they exploded.",
    "I went from losing money every month to consistent profitability. This program was the turning point.",
    "The macro-economic analysis module connects crypto to global events. A completely different perspective.",
    "Futures trading seemed impossible. This system's step-by-step approach made it accessible and profitable.",
    "The networking opportunities in this program connected me with traders who manage 7-figure portfolios.",
    "I now understand market cycles deeply. This program's historical analysis module is incredibly thorough.",
    "Crypto portfolio rebalancing was an afterthought until this program showed me its massive impact on returns.",
    "The exit strategy framework saved me from holding too long. Knowing when to sell is the hardest skill.",
    "This system doesn't promise overnight riches — it builds the skills for consistent, long-term profits.",
    "If you want to trade crypto seriously, not gamble, this is the program that turns you into a real trader.",
  ],
  "Manifestation": [
    "Your thoughts create your reality. This manifestation system taught me how to align my energy with my goals.",
    "I manifested my dream opportunity within weeks of using this framework. The power of intention is real.",
    "Manifestation isn't magic — it's method. This program gives you the exact steps to attract abundance.",
    "Shifted my vibration and everything changed. This system makes manifestation practical and repeatable.",
    "The universe responds to clarity. This resource helped me get crystal clear on what I want.",
    "I used to dismiss manifestation as woo-woo. This scientifically-grounded program changed my mind completely.",
    "The scripting technique from this system manifested a job offer I'd been dreaming about for years.",
    "Abundance isn't something you chase — it's something you align with. This program teaches alignment.",
    "My morning manifestation ritual from this program sets the tone for incredible days, every single day.",
    "Gratitude journaling alone transformed my perspective. This system includes 12 powerful manifestation tools.",
    "I manifested my dream apartment in exactly the location I visualized. This system's methods are powerful.",
    "The subconscious reprogramming techniques in this system broke through blocks I didn't even know I had.",
    "Law of attraction without action is just wishful thinking. This program balances both perfectly.",
    "My relationships improved dramatically once I started applying the love manifestation module.",
    "The 369 method from this program is simple but incredibly effective. I use it every single day.",
    "Financial abundance started flowing when I cleared my money blocks using this system's techniques.",
    "Visualization boards are just the beginning. This system takes manifestation to a whole new depth.",
    "I manifested a $10,000 unexpected windfall within 30 days of starting this program. No exaggeration.",
    "The meditation practices in this system create a powerful state for manifestation. They work fast.",
    "Self-worth is the foundation of manifestation. This program helps you build it from the ground up.",
    "I stopped attracting toxic situations after this system taught me about energetic boundaries.",
    "The affirmation framework in this program is different — it's personalized and emotionally charged.",
    "My business grew 3x after I applied the abundance mindset principles from this manifestation system.",
    "Letting go of resistance was the hardest lesson. This program teaches you how to surrender and receive.",
    "The moon cycle manifestation rituals in this system add a beautiful rhythm to the practice.",
    "I manifested my soulmate relationship using the specific techniques taught in this program.",
    "This system combines quantum physics with ancient wisdom. The result is a manifestation method that works.",
    "The group manifestation sessions in this community amplify the energy tenfold. Incredible experience.",
    "I went from scarcity mindset to abundance consciousness in 21 days with this program's protocol.",
    "The shadow work module in this system was uncomfortable but absolutely necessary for real manifestation.",
    "Every limitation is just a belief. This program taught me how to identify and dissolve limiting beliefs.",
    "The EFT tapping sequences in this system cleared emotional blocks that were repelling my desires.",
    "I manifested a fully-paid vacation by following the specific steps in this program. It felt surreal.",
    "This system teaches you that manifestation is a lifestyle, not a one-time event. Consistency is key.",
    "The success stories in this community are mind-blowing. Real people manifesting real results daily.",
    "My health improved after I focused manifestation on well-being using this system's health module.",
    "The chakra alignment practices in this program opened energy channels I didn't know were blocked.",
    "I used to self-sabotage every good thing. This system's inner child work healed that pattern.",
    "The quantum jumping technique in this program is advanced but incredibly powerful once you master it.",
    "Sleep manifestation changed my life. This system's guided sleep programs work on your subconscious.",
    "I manifested a promotion at work within 2 weeks of focused intention using this system's methods.",
    "The reality shifting framework in this program goes beyond basic manifestation. It's next level.",
    "This system taught me that feeling is the secret. Not thinking — feeling. That distinction changed everything.",
    "The cord-cutting ceremony in this program freed me from past relationships that were blocking my growth.",
    "I manifest with confidence now. This program removed all doubt from my practice.",
    "The numerology and synchronicity module helped me recognize signs I was previously ignoring.",
    "Manifestation journaling from this system is different from regular journaling. It's intentional and powerful.",
    "I went from hoping things would change to knowing they would. This program creates unshakable faith.",
    "The 40-day manifestation challenge in this system produced results that exceeded my wildest expectations.",
    "If you're skeptical about manifestation, this program's evidence-based approach will change your mind.",
  ],
  "Relationship Coaching": [
    "Better relationships start with better communication. This program transformed how I connect with people.",
    "Struggled with dating for years. This coaching system gave me the confidence and skills I was missing.",
    "Your relationships define your quality of life. This framework helped me build deeper connections.",
    "Finally understand what makes relationships work. This program is backed by real psychology.",
    "The investment you make in your relationships pays dividends forever. This system is worth every minute.",
    "I went from awkward first dates to genuine connections. This coaching program changed my dating life.",
    "The attachment style module in this program explained patterns I'd been repeating for years.",
    "Communication isn't just talking — it's understanding. This system teaches both sides brilliantly.",
    "I saved my marriage using the conflict resolution strategies from this relationship program.",
    "The love languages framework goes deeper in this system than anything I've read in the original book.",
    "Dating apps were frustrating until this program taught me how to create an authentic profile that attracts.",
    "I learned to set healthy boundaries without guilt. This coaching program made it feel natural.",
    "The conversation frameworks in this system made me genuinely engaging in social and romantic settings.",
    "Body language mastery from this program gives me an edge in every interaction. People notice the difference.",
    "I went from a serial people-pleaser to someone who values and expresses their own needs. Life-changing.",
    "The emotional availability module helped me become the partner I always wanted to be.",
    "Texting etiquette, first date confidence, long-term maintenance — this program covers every stage.",
    "I attracted my current partner by becoming the best version of myself. This program guided that transformation.",
    "The vulnerability exercises in this system were uncomfortable but opened doors to incredible intimacy.",
    "This program taught me that healthy relationships require two whole people, not two halves. Deep truth.",
    "My self-esteem was the real issue in my relationships. This system rebuilt it from the foundation.",
    "The dating strategy framework in this program removes the guesswork and builds genuine connection.",
    "I stopped attracting the wrong people once I healed my own patterns. This system shows you how.",
    "The jealousy management module in this program saved a relationship I almost ruined with insecurity.",
    "Active listening changed every relationship I have — romantic, family, and professional. This system teaches it.",
    "I finally understand why my past relationships failed. This program's pattern analysis is eye-opening.",
    "The flirting confidence module in this system made approaching people feel fun instead of terrifying.",
    "Long-distance relationship strategies in this program kept my connection strong across thousands of miles.",
    "The intimacy building exercises go far beyond physical. This system creates emotional and intellectual bonds.",
    "I went from afraid of commitment to excited about building a future with someone. This program healed my fears.",
    "The social circle expansion techniques in this system introduced me to amazing people in just weeks.",
    "This program teaches that conflict is healthy when managed well. The tools it provides make disagreements constructive.",
    "My family relationships improved dramatically after applying the principles from this coaching system.",
    "The date planning frameworks in this system helped me create memorable experiences that deepened connection.",
    "I stopped ghosting and learned to communicate honestly. This program's honesty framework made it possible.",
    "The breakup recovery module in this system helped me heal and grow instead of just moving on.",
    "Building trust takes time, but this system gave me the exact behaviors that accelerate it naturally.",
    "I became a better friend, partner, and colleague. This program's impact extends to every relationship.",
    "The emotional intelligence module in this system is one of the best I've experienced in any program.",
    "I used to avoid difficult conversations. This system gave me scripts and confidence to have them.",
    "The self-love module is the foundation of everything in this program. You can't give what you don't have.",
    "My dating frequency tripled and my quality of connections improved even more. This system delivers.",
    "The non-verbal communication training in this program made me aware of signals I was completely missing.",
    "I learned to receive love, not just give it. This program's balance approach changed my relationship dynamic.",
    "The compatibility assessment in this system helped me understand what I truly need vs what I think I want.",
    "Maintaining attraction in long-term relationships is a skill. This program teaches it systematically.",
    "The co-dependency module in this system freed me from unhealthy patterns I thought were normal.",
    "This program covers modern dating challenges — online dating, situationships, and undefined relationships.",
    "I went from relationship anxiety to relationship security. This coaching system gave me that peace.",
    "If you want to transform your love life, start by transforming yourself. This program makes that journey clear.",
  ],
  "Productivity": [
    "Doubled my output in half the time. This productivity system is the real deal.",
    "Stop being busy and start being productive. This framework taught me the difference.",
    "Time is your most valuable asset. This program taught me how to protect and maximize it.",
    "The secret to getting more done isn't working harder — it's working smarter. This system proves it.",
    "Procrastination used to own me. This productivity method gave me my time back.",
    "The time-blocking strategy from this program transformed how I structure my entire day.",
    "I eliminated 3 hours of wasted time daily by applying the audit framework from this system.",
    "Deep work sessions changed my career. This program teaches you how to access that flow state consistently.",
    "My to-do list used to overwhelm me. This system's prioritization method made it manageable and effective.",
    "The Pomodoro technique is just the beginning. This program introduces 15 different productivity frameworks.",
    "I went from working 60-hour weeks to 35-hour weeks while getting more done. This system made it possible.",
    "Email management alone saved me 5 hours per week with the strategies from this program.",
    "The energy management module in this system is brilliant — productivity isn't just about time.",
    "I used to multitask constantly. This program proved single-tasking is 10x more effective.",
    "The weekly planning ritual from this system keeps me focused on what truly matters every week.",
    "Decision fatigue was killing my productivity. This system's frameworks eliminated 80% of unnecessary decisions.",
    "The habit stacking technique from this program helped me build 7 new productive habits in one month.",
    "Meetings used to eat my entire day. This system's meeting optimization framework gave me hours back.",
    "I automated repetitive tasks using the tools recommended in this program. My efficiency skyrocketed.",
    "The distraction elimination module in this system helped me achieve laser focus during work hours.",
    "Batch processing tasks saved me incredible amounts of time. This program taught me the exact method.",
    "My morning routine went from chaotic to powerful using the productivity morning protocol in this system.",
    "The delegation framework in this program taught me to let go of tasks that don't need my attention.",
    "I went from scattered to systematic. This program's organizational systems are life-changing.",
    "The 2-minute rule from this system seems simple but it eliminated task buildup that was slowing me down.",
    "Project management felt overwhelming until this program broke it into simple, actionable phases.",
    "I now finish my work by 3pm most days. This system's efficiency techniques are incredibly powerful.",
    "The goal-setting module in this program uses a framework that makes big goals feel achievable.",
    "Context switching was destroying my focus. This system taught me to batch similar tasks together.",
    "This program's annual planning workshop helped me set and achieve more goals than any previous year.",
    "The digital minimalism principles in this system cleared mental clutter I didn't even realize I had.",
    "I reduced my screen time by 4 hours daily while being more productive. This program shows you how.",
    "The accountability system in this program keeps you on track even when motivation fades.",
    "Reading speed doubled after I applied the speed reading techniques from this productivity system.",
    "I built a second income stream using the free time I gained from this program's efficiency methods.",
    "The saying no framework in this system was the most liberating productivity lesson I've ever learned.",
    "Workplace productivity increased so much that my boss asked what changed. I told them about this system.",
    "The shutdown ritual from this program helps me disconnect completely and recharge for the next day.",
    "I used to forget important tasks constantly. This system's capture method ensures nothing falls through the cracks.",
    "The physical workspace optimization module in this program boosted my focus and creativity immediately.",
    "Brain dumps changed my life. This program teaches a structured version that turns chaos into clarity.",
    "The review and reflect framework in this system prevents me from repeating the same productivity mistakes.",
    "I stopped being reactive and became intentional with my time. This system provided the exact structure.",
    "The communication efficiency module saved me hours of back-and-forth in emails and messages.",
    "This program taught me that rest is productive. Strategic recovery periods actually increased my output.",
    "The weekly scorecard system in this program gives me instant visibility into my productivity trends.",
    "I went from always feeling behind to consistently finishing ahead of deadlines. This system delivers.",
    "The creative productivity module showed me how to produce high-quality work on demand, not just on inspiration.",
    "This program's compound productivity principle showed me how small daily improvements lead to massive yearly gains.",
    "If you feel like there aren't enough hours in the day, this program will show you there are — you just need the right system.",
  ],
  "Spirituality": [
    "Inner peace isn't found — it's cultivated. This spiritual framework changed my daily practice.",
    "Connected with my higher self using the techniques in this program. Truly transformational experience.",
    "Spirituality meets practicality in this system. Real tools for real inner growth.",
    "The journey inward is the most important one. This program guided me with clarity and wisdom.",
    "Found a sense of calm I didn't know was possible. This spiritual system delivered beyond expectations.",
    "Meditation was frustrating until this program's approach made it natural and deeply fulfilling.",
    "The breathwork techniques in this system produced immediate, tangible results from the very first session.",
    "I rediscovered meaning and purpose through this spiritual program. It reignited my passion for life.",
    "The mindfulness practices in this system aren't just exercises — they're a way of living.",
    "I went from spiritually curious to spiritually grounded. This program provided the foundation I needed.",
    "The guided meditations in this program are the most profound I've ever experienced. Truly life-altering.",
    "Energy healing seemed abstract until this system explained and demonstrated it with clarity.",
    "I released trauma I'd been carrying for decades using the emotional release techniques in this program.",
    "This system taught me to trust my intuition. The intuition development module is remarkable.",
    "The morning spiritual practice from this program transformed my entire day, every day.",
    "I found my spiritual community through this program. Like-minded souls on the same journey.",
    "The forgiveness framework in this system freed me from resentment I didn't know was holding me back.",
    "Gratitude practice from this program isn't just listing things — it's a deep feeling practice that transforms.",
    "I sleep better, worry less, and smile more since starting this spiritual system. Genuine inner change.",
    "The sacred space creation guide in this program enhanced my practice in ways I didn't expect.",
    "This program bridges Eastern and Western spiritual traditions beautifully. Universal wisdom, practical application.",
    "The journaling prompts in this system helped me access deep wisdom I didn't know I had within me.",
    "Nature connection practices from this program restored a sense of wonder I'd lost as an adult.",
    "I stopped searching for happiness outside myself. This program taught me it's been within all along.",
    "The chakra balancing program is thorough, practical, and produces noticeable shifts in energy and mood.",
    "Sound healing sessions in this system are profoundly relaxing and healing. My stress levels dropped significantly.",
    "I developed a consistent spiritual practice for the first time ever. This system's structure made it possible.",
    "The death meditation exercise was challenging but profoundly shifted my perspective on what matters.",
    "This program taught me that spirituality isn't about escaping life — it's about fully embracing it.",
    "The compassion practices in this system softened my heart in ways I desperately needed.",
    "I went from chronic anxiety to deep peace using the nervous system regulation techniques in this program.",
    "The plant medicine preparation and integration guide in this program is the most responsible I've seen.",
    "This system's approach to prayer is non-denominational and deeply personal. It resonated with my unique path.",
    "The body scan meditation techniques in this program helped me release physical tension I'd held for years.",
    "I found purpose through service after this program's seva module showed me the spiritual power of giving.",
    "The dream work module in this system opened a whole new dimension of self-understanding.",
    "Walking meditation from this program turned my daily commute into a spiritual practice.",
    "I stopped fearing death after the consciousness exploration module in this system. Profound peace.",
    "The mantra practice from this program is simple but creates a vibrational shift you can feel immediately.",
    "This system taught me that silence is a teacher. The silent retreat guide was transformationally powerful.",
    "The spiritual bypassing module kept me honest with myself. Real growth requires facing uncomfortable truths.",
    "I reconnected with my creative spirit through the art and spirituality module in this program.",
    "The ancestral healing practices in this system helped me understand and heal generational patterns.",
    "This program taught me that surrender isn't weakness — it's the ultimate spiritual strength.",
    "The loving-kindness meditation series in this system opened my heart in ways I never imagined possible.",
    "I found balance between ambition and acceptance through this program's middle way philosophy.",
    "The spiritual reading list curated in this system introduced me to texts that changed my worldview.",
    "Community rituals and ceremonies in this program created sacred bonds with fellow seekers.",
    "This system proves that spirituality and modern life aren't contradictions — they're complements.",
    "If you're seeking something deeper in life, this program is the most grounded spiritual guide you'll find.",
  ],
};

/* ─── Generate posts for a niche ─── */
function generateNichePosts(niche: string): NichePost[] {
  const texts = NICHE_POSTS[niche];
  if (!texts) return [];
  const nicheIdx = NICHE_LIST.indexOf(niche as typeof NICHE_LIST[number]);
  const baseId = nicheIdx * 50;
  return texts.map((text, i) => ({
    id: baseId + i + 1,
    niche,
    text,
  }));
}

/* ════════════════════════ PAGE ════════════════════════ */

export default function SocialPayoutsPage() {
  const { user } = useAuth();
  const TOTAL_POSTS = NICHE_LIST.length * 50;

  const [syncedPages, setSyncedPages] = useState<SyncedPage[]>([]);
  const [loadingPages, setLoadingPages] = useState(true);

  const [selectedNiche, setSelectedNiche] = useState<string>(NICHE_LIST[0]);

  const [productModalPostId, setProductModalPostId] = useState<number | null>(null);
  const [linkedProducts, setLinkedProducts] = useState<Record<number, SyncedPage>>({});
  const [copiedPostId, setCopiedPostId] = useState<number | null>(null);

  const [storedImages, setStoredImages] = useState<Record<string, Record<number, string>>>({});
  const [imageLibraryCount, setImageLibraryCount] = useState(0);

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

  const refreshStoredImages = async () => {
    const res = await fetch("/api/seed-post-images", { cache: "no-store" });
    const data = await res.json();
    if (data.success && data.images) {
      setStoredImages(data.images);
      setImageLibraryCount(data.total || 0);
      return data.total || 0;
    }
    return 0;
  };

  useEffect(() => {
    const fetchStoredImages = async () => {
      try {
        await refreshStoredImages();
      } catch {}
    };
    fetchStoredImages();
  }, []);

  const getStoredImageUrl = (niche: string, postIndex: number): string | undefined => {
    return storedImages[niche]?.[postIndex];
  };

  const posts = useMemo(() => generateNichePosts(selectedNiche), [selectedNiche]);

  const handleLinkProduct = (postId: number, page: SyncedPage) => {
    setLinkedProducts((prev) => ({ ...prev, [postId]: page }));
    setProductModalPostId(null);
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

  const nc = NICHE_COLORS[selectedNiche] || DEFAULT_NC;

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
          50 proven-to-work social media posts for every niche — ready for Facebook, Instagram, Twitter & more. Add your affiliate link, then copy the post or download the image.
        </p>
      </motion.div>

      {/* Image Library Status */}
      {imageLibraryCount < TOTAL_POSTS && (
        <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-primary/5 border border-primary/10">
          <Loader2 className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs text-primary font-medium">
            Image library not fully seeded yet: {imageLibraryCount}/{TOTAL_POSTS} saved.
          </span>
        </div>
      )}

      {/* Niche Selector Grid */}
      <div>
        <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-3">Select a Niche</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
          {NICHE_LIST.map((niche) => {
            const c = NICHE_COLORS[niche] || DEFAULT_NC;
            const Icon = NICHE_ICONS[niche] || Star;
            const isActive = selectedNiche === niche;
            return (
              <button
                key={niche}
                onClick={() => setSelectedNiche(niche)}
                className={cn(
                  "relative flex flex-col items-center gap-2 px-3 py-4 rounded-xl border transition-all duration-200 text-center group",
                  isActive
                    ? `${c.bg} ${c.border} ${c.text} shadow-lg`
                    : "bg-white/[0.02] border-white/5 text-gray-500 hover:bg-white/5 hover:border-white/10 hover:text-gray-300"
                )}
              >
                <Icon className={cn("w-5 h-5 transition-colors", isActive ? c.text : "text-gray-600 group-hover:text-gray-400")} />
                <span className="text-[11px] font-bold uppercase tracking-wide leading-tight">{niche}</span>
                {isActive && <div className={cn("absolute -bottom-px left-4 right-4 h-0.5 rounded-full", c.bg.replace("/10", ""))} />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Niche Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className={cn("text-xl font-bold", nc.text)}>{selectedNiche}</h2>
          <p className="text-xs text-gray-500 mt-0.5">{posts.length} posts — works on all social platforms</p>
        </div>
        <span className={cn("inline-flex items-center px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border", nc.text, nc.bg, nc.border)}>
          {posts.length} Posts
        </span>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post, index) => {
          const isCopied = copiedPostId === post.id;
          const linked = linkedProducts[post.id];

          return (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(index * 0.015, 0.3) }}
            >
              <GlassPanel
                intensity="low"
                className="p-0 border-white/5 hover:border-primary/20 transition-all duration-300 h-full flex flex-col overflow-hidden"
              >
                {/* AI Image */}
                <div className="relative">
                  <LazyPostImage niche={post.niche} postId={post.id} storedUrl={getStoredImageUrl(post.niche, post.id - (NICHE_LIST.indexOf(post.niche as typeof NICHE_LIST[number]) * 50) - 1)} />
                  <div className={cn("absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border backdrop-blur-sm", nc.text, nc.bg, nc.border)}>
                    {post.niche}
                  </div>
                </div>

                {/* Post Content */}
                <div className="p-4 flex-1 flex flex-col">
                  <p className="text-sm text-gray-300 leading-relaxed mb-4 flex-1">
                    {post.text}
                    {linked && linked.affiliate_url && (
                      <span className="block mt-2 text-primary text-xs font-medium truncate">
                        🔗 {linked.affiliate_url}
                      </span>
                    )}
                  </p>

                  {/* CTAs */}
                  <div className="space-y-2.5">
                    {/* Copy + Download Image */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => linked && handleCopyPost(post)}
                        disabled={!linked}
                        className={cn(
                          "flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-bold uppercase tracking-wider transition-all",
                          linked
                            ? "bg-white/5 border-white/10 text-gray-300 hover:text-emerald-400 hover:bg-emerald-400/10 hover:border-emerald-400/20"
                            : "bg-white/[0.02] border-white/5 text-gray-700 cursor-not-allowed"
                        )}
                        title={!linked ? "Add your synced product first" : "Copy post text with your affiliate link"}
                      >
                        {isCopied ? (
                          <><Check className="w-3.5 h-3.5 text-emerald-400" /><span className="text-emerald-400">Copied!</span></>
                        ) : (
                          <><Copy className="w-3.5 h-3.5" /> Copy</>
                        )}
                      </button>

                      <a
                        href={linked ? getStoredImageUrl(post.niche, post.id - (NICHE_LIST.indexOf(post.niche as typeof NICHE_LIST[number]) * 50) - 1) : undefined}
                        download={linked ? `social-post-${post.id}.jpg` : undefined}
                        target={linked ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className={cn(
                          "flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-bold uppercase tracking-wider transition-all",
                          linked && getStoredImageUrl(post.niche, post.id - (NICHE_LIST.indexOf(post.niche as typeof NICHE_LIST[number]) * 50) - 1)
                            ? "bg-white/5 border-white/10 text-gray-300 hover:text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-400/20"
                            : "bg-white/[0.02] border-white/5 text-gray-700 cursor-not-allowed pointer-events-none"
                        )}
                        title={!linked ? "Add your synced product first" : "Download saved image"}
                        onClick={(e) => { if (!linked || !getStoredImageUrl(post.niche, post.id - (NICHE_LIST.indexOf(post.niche as typeof NICHE_LIST[number]) * 50) - 1)) e.preventDefault(); }}
                      >
                        <Download className="w-3.5 h-3.5" /> Image
                      </a>
                    </div>

                    {/* Add Synced Product / Linked Status */}
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
                        onClick={() => setProductModalPostId(post.id)}
                        className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all bg-linear-to-r from-primary/20 to-cyan-400/20 border border-primary/30 text-primary hover:from-primary/30 hover:to-cyan-400/30 hover:border-primary/50"
                      >
                        <Link2 className="w-3.5 h-3.5" /> Add Your Synced Product
                      </button>
                    )}
                  </div>
                </div>
              </GlassPanel>
            </motion.div>
          );
        })}
      </div>

      {/* Product Selector Modal */}
      <AnimatePresence>
        {productModalPostId !== null && (
          <ProductSelectorModal
            syncedPages={syncedPages}
            loading={loadingPages}
            onSelect={(page) => handleLinkProduct(productModalPostId, page)}
            onClose={() => setProductModalPostId(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
