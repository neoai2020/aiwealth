"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassPanel } from "@/components/ui/glass-panel";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/auth-context";
import {
  Rocket,
  ExternalLink,
  X,
  Copy,
  Check,
  CheckCircle,
  Loader2,
  Search,
  ClipboardPaste,
  Sparkles,
  Palette,
  Target,
  Lightbulb,
} from "lucide-react";

/* ─── 5 Niches ─── */
const NICHES = [
  "Health & Fitness",
  "Personal Finance",
  "Online Business",
  "Weight Loss",
  "Self-Improvement",
] as const;

const NICHE_COLORS: Record<string, { text: string; bg: string; border: string }> = {
  "Health & Fitness": { text: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/20" },
  "Personal Finance": { text: "text-cyan-400", bg: "bg-cyan-400/10", border: "border-cyan-400/20" },
  "Online Business": { text: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/20" },
  "Weight Loss": { text: "text-rose-400", bg: "bg-rose-400/10", border: "border-rose-400/20" },
  "Self-Improvement": { text: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/20" },
};
const DEFAULT_NC = { text: "text-gray-400", bg: "bg-gray-400/10", border: "border-gray-400/20" };

/* ─── Page Design Angles ─── */
const DESIGN_ANGLES = [
  "Testimonial-Driven Landing Page",
  "Problem-Solution Story Page",
  "Urgency & Scarcity Funnel",
  "Educational Lead-In Page",
  "Comparison & Authority Page",
  "Video Sales Letter Page",
  "Quiz-Style Engagement Page",
  "Minimalist Direct-Offer Page",
  "Social Proof Wall Page",
  "Benefit-Stacking Long-Form Page",
];

/* ─── Done-For-You Page Data ─── */
interface DFYPage {
  id: number;
  niche: string;
  pageName: string;
  designAngle: string;
  description: string;
  recommendedProducts: string[];
  previewUrl: string;
}

const DFY_PAGES: DFYPage[] = [
  // Health & Fitness (10 pages)
  { id: 1, niche: "Health & Fitness", pageName: "FitLife Transformation", designAngle: DESIGN_ANGLES[0], description: "Testimonial-driven page featuring real transformation stories. Best for fitness programs and supplements.", recommendedProducts: ["Fitness programs", "Workout plans", "Health supplements", "Protein powders"], previewUrl: "https://ai-wealth.com/dfy/health-1" },
  { id: 2, niche: "Health & Fitness", pageName: "30-Day Body Reset", designAngle: DESIGN_ANGLES[1], description: "Problem-solution narrative that addresses common health frustrations and presents your product as the fix.", recommendedProducts: ["Detox programs", "Meal plan subscriptions", "Fitness challenges", "Health coaching"], previewUrl: "https://ai-wealth.com/dfy/health-2" },
  { id: 3, niche: "Health & Fitness", pageName: "Limited Spots Bootcamp", designAngle: DESIGN_ANGLES[2], description: "High-urgency page with countdown timer and limited spots messaging. Drives fast conversions.", recommendedProducts: ["Bootcamp programs", "Personal training", "Premium supplements", "Gym memberships"], previewUrl: "https://ai-wealth.com/dfy/health-3" },
  { id: 4, niche: "Health & Fitness", pageName: "Health Science Hub", designAngle: DESIGN_ANGLES[3], description: "Educational lead-in that teaches a health concept then naturally recommends your product.", recommendedProducts: ["Nutrition guides", "Scientific supplements", "Health monitors", "Wellness apps"], previewUrl: "https://ai-wealth.com/dfy/health-4" },
  { id: 5, niche: "Health & Fitness", pageName: "Product Showdown", designAngle: DESIGN_ANGLES[4], description: "Comparison page that positions your recommended product against alternatives. Builds authority.", recommendedProducts: ["Any health product with competitors", "Premium supplements", "Fitness equipment", "Health plans"], previewUrl: "https://ai-wealth.com/dfy/health-5" },
  { id: 6, niche: "Health & Fitness", pageName: "Trainer Video Pitch", designAngle: DESIGN_ANGLES[5], description: "Video-first page with an embedded sales video. Minimal text, maximum impact.", recommendedProducts: ["Video workout programs", "Online coaching", "Fitness courses", "Health masterclasses"], previewUrl: "https://ai-wealth.com/dfy/health-6" },
  { id: 7, niche: "Health & Fitness", pageName: "What's Your Fitness Type?", designAngle: DESIGN_ANGLES[6], description: "Interactive quiz that segments visitors then recommends the perfect product based on their answers.", recommendedProducts: ["Personalized fitness plans", "Custom supplements", "Tailored meal plans", "Health assessments"], previewUrl: "https://ai-wealth.com/dfy/health-7" },
  { id: 8, niche: "Health & Fitness", pageName: "Clean & Direct Offer", designAngle: DESIGN_ANGLES[7], description: "Minimalist page — product image, 3 bullet points, CTA. No distractions. Pure conversion.", recommendedProducts: ["Simple supplements", "Single product offers", "Ebooks", "Quick-start guides"], previewUrl: "https://ai-wealth.com/dfy/health-8" },
  { id: 9, niche: "Health & Fitness", pageName: "Community Results Wall", designAngle: DESIGN_ANGLES[8], description: "Wall of social proof — screenshots, testimonials, before/after photos. Builds massive trust.", recommendedProducts: ["Transformation programs", "Weight loss products", "Fitness communities", "Coaching programs"], previewUrl: "https://ai-wealth.com/dfy/health-9" },
  { id: 10, niche: "Health & Fitness", pageName: "Ultimate Health Stack", designAngle: DESIGN_ANGLES[9], description: "Long-form page that stacks benefit after benefit with detailed explanations and proof points.", recommendedProducts: ["High-ticket health programs", "Comprehensive wellness bundles", "Premium coaching", "Subscription products"], previewUrl: "https://ai-wealth.com/dfy/health-10" },

  // Personal Finance (10 pages)
  { id: 11, niche: "Personal Finance", pageName: "Wealth Builder Stories", designAngle: DESIGN_ANGLES[0], description: "Real success stories of people who built wealth using the recommended system. Trust-focused.", recommendedProducts: ["Investment courses", "Financial planning tools", "Budgeting apps", "Trading programs"], previewUrl: "https://ai-wealth.com/dfy/finance-1" },
  { id: 12, niche: "Personal Finance", pageName: "Debt to Freedom", designAngle: DESIGN_ANGLES[1], description: "Story-driven page about escaping debt and building wealth. Emotionally compelling.", recommendedProducts: ["Debt management programs", "Credit repair tools", "Financial literacy courses", "Savings systems"], previewUrl: "https://ai-wealth.com/dfy/finance-2" },
  { id: 13, niche: "Personal Finance", pageName: "Flash Investment Deal", designAngle: DESIGN_ANGLES[2], description: "Limited-time offer page for investment/trading products. Creates urgency to act now.", recommendedProducts: ["Trading signals", "Investment newsletters", "Stock picks services", "Crypto courses"], previewUrl: "https://ai-wealth.com/dfy/finance-3" },
  { id: 14, niche: "Personal Finance", pageName: "Money IQ Academy", designAngle: DESIGN_ANGLES[3], description: "Educational page that teaches a financial concept then leads to product recommendation.", recommendedProducts: ["Financial education courses", "Investment guides", "Tax optimization tools", "Wealth building ebooks"], previewUrl: "https://ai-wealth.com/dfy/finance-4" },
  { id: 15, niche: "Personal Finance", pageName: "Tool Comparison Matrix", designAngle: DESIGN_ANGLES[4], description: "Side-by-side comparison of financial tools, positioning your recommended product as the winner.", recommendedProducts: ["Budgeting apps", "Investment platforms", "Financial software", "Banking products"], previewUrl: "https://ai-wealth.com/dfy/finance-5" },
  { id: 16, niche: "Personal Finance", pageName: "Millionaire Mindset Video", designAngle: DESIGN_ANGLES[5], description: "Video sales letter focused on the wealth mindset shift. Powerful for high-ticket offers.", recommendedProducts: ["High-ticket mentorship", "Wealth coaching", "Premium investment courses", "Mastermind groups"], previewUrl: "https://ai-wealth.com/dfy/finance-6" },
  { id: 17, niche: "Personal Finance", pageName: "Financial Freedom Quiz", designAngle: DESIGN_ANGLES[6], description: "Quiz that assesses financial health and recommends the perfect starting product.", recommendedProducts: ["Personalized financial plans", "Budgeting systems", "Investment starter kits", "Financial assessments"], previewUrl: "https://ai-wealth.com/dfy/finance-7" },
  { id: 18, niche: "Personal Finance", pageName: "One-Click Wealth Tool", designAngle: DESIGN_ANGLES[7], description: "Clean, simple page for a single financial product. No fluff, just the offer.", recommendedProducts: ["Single financial tools", "Ebooks", "Quick-start investment guides", "Budget templates"], previewUrl: "https://ai-wealth.com/dfy/finance-8" },
  { id: 19, niche: "Personal Finance", pageName: "Investor Success Board", designAngle: DESIGN_ANGLES[8], description: "Wall of investor testimonials and earnings screenshots. Builds confidence to buy.", recommendedProducts: ["Trading programs", "Investment communities", "Signal services", "Portfolio tools"], previewUrl: "https://ai-wealth.com/dfy/finance-9" },
  { id: 20, niche: "Personal Finance", pageName: "Complete Money System", designAngle: DESIGN_ANGLES[9], description: "Comprehensive long-form page covering every financial benefit and feature in detail.", recommendedProducts: ["All-in-one financial systems", "Comprehensive wealth courses", "Premium financial coaching", "Bundle offers"], previewUrl: "https://ai-wealth.com/dfy/finance-10" },

  // Online Business (10 pages)
  { id: 21, niche: "Online Business", pageName: "Entrepreneur Success Stories", designAngle: DESIGN_ANGLES[0], description: "Feature real entrepreneur journeys from zero to profit. Inspires action.", recommendedProducts: ["Business courses", "Coaching programs", "SaaS tools", "Marketing systems"], previewUrl: "https://ai-wealth.com/dfy/business-1" },
  { id: 22, niche: "Online Business", pageName: "Escape the 9-to-5", designAngle: DESIGN_ANGLES[1], description: "Problem-solution narrative about leaving corporate life for online freedom.", recommendedProducts: ["Side hustle programs", "Freelance courses", "Digital product guides", "Online business blueprints"], previewUrl: "https://ai-wealth.com/dfy/business-2" },
  { id: 23, niche: "Online Business", pageName: "Launch Special Access", designAngle: DESIGN_ANGLES[2], description: "Limited seats / early access page. Creates FOMO for business products.", recommendedProducts: ["Course launches", "Mastermind groups", "Software beta access", "Exclusive training"], previewUrl: "https://ai-wealth.com/dfy/business-3" },
  { id: 24, niche: "Online Business", pageName: "Business Blueprint Class", designAngle: DESIGN_ANGLES[3], description: "Free value educational page that teaches a business strategy, then upsells the full system.", recommendedProducts: ["Full business systems", "Advanced courses", "Coaching programs", "Marketing tools"], previewUrl: "https://ai-wealth.com/dfy/business-4" },
  { id: 25, niche: "Online Business", pageName: "Platform Face-Off", designAngle: DESIGN_ANGLES[4], description: "Compare business tools/platforms and recommend the best option with your affiliate link.", recommendedProducts: ["Website builders", "Email platforms", "CRM tools", "Marketing software"], previewUrl: "https://ai-wealth.com/dfy/business-5" },
  { id: 26, niche: "Online Business", pageName: "CEO Video Walkthrough", designAngle: DESIGN_ANGLES[5], description: "Video-first page where the product creator walks through the business system.", recommendedProducts: ["Video courses", "Software demos", "Business training", "Webinar replays"], previewUrl: "https://ai-wealth.com/dfy/business-6" },
  { id: 27, niche: "Online Business", pageName: "What Business Fits You?", designAngle: DESIGN_ANGLES[6], description: "Interactive quiz to find the right online business model, then recommends matching products.", recommendedProducts: ["Niche-specific courses", "Business model guides", "Personalized coaching", "Starter kits"], previewUrl: "https://ai-wealth.com/dfy/business-7" },
  { id: 28, niche: "Online Business", pageName: "Quick-Start Business Kit", designAngle: DESIGN_ANGLES[7], description: "Minimalist direct-offer page for a business starter kit or tool. Fast conversions.", recommendedProducts: ["Starter kits", "Templates", "Business ebooks", "Quick-launch tools"], previewUrl: "https://ai-wealth.com/dfy/business-8" },
  { id: 29, niche: "Online Business", pageName: "Revenue Screenshot Wall", designAngle: DESIGN_ANGLES[8], description: "Social proof page with revenue screenshots, customer wins, and community highlights.", recommendedProducts: ["Income-generating systems", "Affiliate programs", "Business communities", "Revenue tools"], previewUrl: "https://ai-wealth.com/dfy/business-9" },
  { id: 30, niche: "Online Business", pageName: "Empire Builder System", designAngle: DESIGN_ANGLES[9], description: "Long-form page detailing every feature, benefit, and bonus of a comprehensive business system.", recommendedProducts: ["All-in-one business systems", "Premium courses", "High-ticket coaching", "Enterprise tools"], previewUrl: "https://ai-wealth.com/dfy/business-10" },

  // Weight Loss (10 pages)
  { id: 31, niche: "Weight Loss", pageName: "Real Transformations", designAngle: DESIGN_ANGLES[0], description: "Before/after transformation stories that prove the product works. Highly persuasive.", recommendedProducts: ["Weight loss programs", "Diet plans", "Supplements", "Fitness apps"], previewUrl: "https://ai-wealth.com/dfy/weightloss-1" },
  { id: 32, niche: "Weight Loss", pageName: "My Weight Loss Journey", designAngle: DESIGN_ANGLES[1], description: "Personal story page about struggling with weight and finding the solution.", recommendedProducts: ["Diet programs", "Meal plans", "Exercise guides", "Weight loss supplements"], previewUrl: "https://ai-wealth.com/dfy/weightloss-2" },
  { id: 33, niche: "Weight Loss", pageName: "Summer Body Countdown", designAngle: DESIGN_ANGLES[2], description: "Seasonal urgency page with countdown. Perfect for time-sensitive weight loss offers.", recommendedProducts: ["Fast-result programs", "30-day challenges", "Detox kits", "Quick-start diets"], previewUrl: "https://ai-wealth.com/dfy/weightloss-3" },
  { id: 34, niche: "Weight Loss", pageName: "Science of Fat Loss", designAngle: DESIGN_ANGLES[3], description: "Educational page explaining the science behind weight loss, then recommending the product.", recommendedProducts: ["Science-backed supplements", "Metabolic programs", "Nutrition courses", "Health monitoring tools"], previewUrl: "https://ai-wealth.com/dfy/weightloss-4" },
  { id: 35, niche: "Weight Loss", pageName: "Diet Plan Showdown", designAngle: DESIGN_ANGLES[4], description: "Compares popular diets (keto, IF, paleo) and recommends your product as the best approach.", recommendedProducts: ["Diet comparison guides", "Flexible diet programs", "Nutrition plans", "Custom meal services"], previewUrl: "https://ai-wealth.com/dfy/weightloss-5" },
  { id: 36, niche: "Weight Loss", pageName: "Coach's Video Message", designAngle: DESIGN_ANGLES[5], description: "Video-led page from a coach/trainer explaining the weight loss method.", recommendedProducts: ["Video fitness programs", "Online coaching", "Training courses", "Workout subscriptions"], previewUrl: "https://ai-wealth.com/dfy/weightloss-6" },
  { id: 37, niche: "Weight Loss", pageName: "Find Your Diet Match", designAngle: DESIGN_ANGLES[6], description: "Quiz that identifies the visitor's body type and recommends the ideal weight loss product.", recommendedProducts: ["Personalized diet plans", "Body-type programs", "Custom supplements", "Metabolism assessments"], previewUrl: "https://ai-wealth.com/dfy/weightloss-7" },
  { id: 38, niche: "Weight Loss", pageName: "One Simple Solution", designAngle: DESIGN_ANGLES[7], description: "Ultra-clean page with one product, one message, one CTA. Highest conversion potential.", recommendedProducts: ["Single supplements", "Detox products", "Simple diet guides", "Quick-fix programs"], previewUrl: "https://ai-wealth.com/dfy/weightloss-8" },
  { id: 39, niche: "Weight Loss", pageName: "Community Wins Gallery", designAngle: DESIGN_ANGLES[8], description: "Gallery of community success stories, weight loss photos, and celebration posts.", recommendedProducts: ["Community-based programs", "Challenge groups", "Accountability systems", "Social diet apps"], previewUrl: "https://ai-wealth.com/dfy/weightloss-9" },
  { id: 40, niche: "Weight Loss", pageName: "Total Body Overhaul", designAngle: DESIGN_ANGLES[9], description: "Comprehensive long-form page covering nutrition, exercise, mindset, and supplements.", recommendedProducts: ["Complete weight loss systems", "Bundle offers", "Premium coaching", "Subscription programs"], previewUrl: "https://ai-wealth.com/dfy/weightloss-10" },

  // Self-Improvement (10 pages)
  { id: 41, niche: "Self-Improvement", pageName: "Growth Journeys", designAngle: DESIGN_ANGLES[0], description: "Stories of personal transformation — from stuck to thriving. Powerful social proof.", recommendedProducts: ["Personal development courses", "Coaching programs", "Mindset books", "Habit-building tools"], previewUrl: "https://ai-wealth.com/dfy/improvement-1" },
  { id: 42, niche: "Self-Improvement", pageName: "Break Free From Limits", designAngle: DESIGN_ANGLES[1], description: "Problem-solution page addressing limiting beliefs, procrastination, and self-sabotage.", recommendedProducts: ["Mindset programs", "Therapy tools", "Self-help courses", "Personal coaching"], previewUrl: "https://ai-wealth.com/dfy/improvement-2" },
  { id: 43, niche: "Self-Improvement", pageName: "Last Chance Enrollment", designAngle: DESIGN_ANGLES[2], description: "Urgency-driven page for limited enrollment programs. Creates immediate action.", recommendedProducts: ["Cohort-based courses", "Live workshops", "Mentorship programs", "Exclusive events"], previewUrl: "https://ai-wealth.com/dfy/improvement-3" },
  { id: 44, niche: "Self-Improvement", pageName: "Success Mindset Lesson", designAngle: DESIGN_ANGLES[3], description: "Teaches a powerful mindset concept, then recommends the full program to go deeper.", recommendedProducts: ["Full development programs", "Advanced courses", "Coaching subscriptions", "Learning platforms"], previewUrl: "https://ai-wealth.com/dfy/improvement-4" },
  { id: 45, niche: "Self-Improvement", pageName: "Method Comparison Guide", designAngle: DESIGN_ANGLES[4], description: "Compares self-improvement methods and frameworks, recommending the best one.", recommendedProducts: ["Framework-based programs", "System courses", "Methodology guides", "Structured plans"], previewUrl: "https://ai-wealth.com/dfy/improvement-5" },
  { id: 46, niche: "Self-Improvement", pageName: "Keynote Video Page", designAngle: DESIGN_ANGLES[5], description: "Inspirational video page with a keynote-style presentation about personal growth.", recommendedProducts: ["Video courses", "Masterclass subscriptions", "TED-style programs", "Motivation memberships"], previewUrl: "https://ai-wealth.com/dfy/improvement-6" },
  { id: 47, niche: "Self-Improvement", pageName: "Discover Your Strengths", designAngle: DESIGN_ANGLES[6], description: "Personality/strengths quiz that leads to a tailored product recommendation.", recommendedProducts: ["Personality assessments", "Strengths programs", "Custom coaching", "Personalized plans"], previewUrl: "https://ai-wealth.com/dfy/improvement-7" },
  { id: 48, niche: "Self-Improvement", pageName: "Simple Daily System", designAngle: DESIGN_ANGLES[7], description: "Clean minimalist page for a daily habit or routine product. Simple and effective.", recommendedProducts: ["Daily planners", "Habit apps", "Journaling tools", "Morning routine guides"], previewUrl: "https://ai-wealth.com/dfy/improvement-8" },
  { id: 49, niche: "Self-Improvement", pageName: "Student Wins Showcase", designAngle: DESIGN_ANGLES[8], description: "Showcase of student success stories, reviews, and achievement highlights.", recommendedProducts: ["Proven courses", "Community programs", "Mentorship systems", "Student-driven platforms"], previewUrl: "https://ai-wealth.com/dfy/improvement-9" },
  { id: 50, niche: "Self-Improvement", pageName: "Life Mastery Blueprint", designAngle: DESIGN_ANGLES[9], description: "Comprehensive long-form page covering mindset, habits, goals, and transformation.", recommendedProducts: ["Complete self-improvement systems", "Premium coaching bundles", "Lifetime access courses", "All-in-one programs"], previewUrl: "https://ai-wealth.com/dfy/improvement-10" },
];

/* ─── Sync Popup ─── */
function SyncPopup({
  page,
  onClose,
  onSynced,
}: {
  page: DFYPage;
  onClose: () => void;
  onSynced: () => void;
}) {
  const { user } = useAuth();
  const [promoLink, setPromoLink] = useState("");
  const [syncing, setSyncing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [step, setStep] = useState(1);

  const handleCopyName = () => {
    navigator.clipboard.writeText(page.pageName);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSync = async () => {
    if (!user || !promoLink.trim()) return;
    setSyncing(true);
    try {
      const { error } = await supabase.from("bridges").insert({
        user_id: user.id,
        title: page.pageName,
        affiliate_url: promoLink.trim(),
        status: "live",
        traffic: "0",
        earnings: "—",
        niche: page.niche,
      });
      if (!error) {
        onSynced();
        onClose();
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
            <h2 className="text-xl font-extrabold text-white mb-1">Sync: {page.pageName}</h2>
            <p className="text-sm text-gray-400">Add your affiliate promo link to sync this done-for-you page.</p>
          </div>

          <div className="space-y-4">
            {/* Step 1 */}
            <div className={cn("p-4 rounded-xl border transition-all", step >= 1 ? "bg-primary/5 border-primary/20" : "bg-white/[0.02] border-white/5")}>
              <div className="flex items-center gap-3 mb-2">
                <div className={cn("w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold", step > 1 ? "bg-emerald-500/20 text-emerald-400" : "bg-primary/20 text-primary")}>
                  {step > 1 ? <Check className="w-4 h-4" /> : "1"}
                </div>
                <span className="text-sm font-bold text-white">Find a matching product on Digistore24</span>
              </div>
              <div className="ml-10 space-y-2">
                <p className="text-xs text-gray-400 leading-relaxed">
                  Recommended products for this page: <span className="text-gray-300 font-medium">{page.recommendedProducts.join(", ")}</span>
                </p>
                <div className="flex items-center gap-2">
                  <a href="https://www.digistore24.com/marketplace" target="_blank" rel="noopener noreferrer" onClick={() => setStep(Math.max(step, 2))} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-gray-300 hover:text-white hover:bg-white/10 transition-all">
                    <Search className="w-3 h-3" /> Open Digistore24 <ExternalLink className="w-3 h-3" />
                  </a>
                  <button onClick={() => { handleCopyName(); }} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-primary/10 border border-primary/30 text-xs font-bold text-primary hover:bg-primary/20 transition-all shrink-0">
                    {copied ? <><Check className="w-3 h-3" /> Copied!</> : <><Copy className="w-3 h-3" /> Copy Page Name</>}
                  </button>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className={cn("p-4 rounded-xl border transition-all", step >= 2 ? "bg-primary/5 border-primary/20" : "bg-white/[0.02] border-white/5 opacity-50")}>
              <div className="flex items-center gap-3 mb-2">
                <div className={cn("w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold", promoLink.trim() ? "bg-emerald-500/20 text-emerald-400" : step >= 2 ? "bg-primary/20 text-primary" : "bg-white/10 text-gray-500")}>
                  {promoLink.trim() ? <Check className="w-4 h-4" /> : "2"}
                </div>
                <span className="text-sm font-bold text-white">Paste your promo link</span>
              </div>
              <div className="ml-10">
                <div className="relative">
                  <ClipboardPaste className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                  <input
                    type="text"
                    value={promoLink}
                    onChange={(e) => setPromoLink(e.target.value)}
                    placeholder="https://www.digistore24.com/redir/..."
                    className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:border-primary/40 transition-colors"
                    disabled={step < 2}
                  />
                </div>
              </div>
            </div>
          </div>

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
            {syncing ? <><Loader2 className="w-4 h-4 animate-spin" /> Syncing...</> : <><Rocket className="w-4 h-4" /> Sync This Page</>}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

/* ════════════════════════ PAGE ════════════════════════ */

export default function AcceleratorPage() {
  const [selectedNiche, setSelectedNiche] = useState<string>(NICHES[0]);
  const [syncPopupPage, setSyncPopupPage] = useState<DFYPage | null>(null);
  const [syncedPageIds, setSyncedPageIds] = useState<Set<number>>(new Set());

  const filteredPages = DFY_PAGES.filter((p) => p.niche === selectedNiche);

  const handleSynced = (pageId: number) => {
    setSyncedPageIds((prev) => new Set(prev).add(pageId));
  };

  return (
    <div className="space-y-8 pb-20 font-(family-name:--font-display)">
      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="p-8 md:p-12 rounded-2xl border border-white/5 bg-linear-to-br from-amber-500/5 via-black/40 to-transparent backdrop-blur-sm text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-[10px] font-bold uppercase tracking-widest text-amber-400 mb-6">
          <Sparkles className="w-3.5 h-3.5" /> Premium Feature
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
          Accelerator
        </h1>
        <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
          50 done-for-you landing pages across 5 niches — each with a unique design angle and conversion strategy. Check the page, find a matching product, and sync it with your affiliate link.
        </p>
      </motion.div>

      {/* Niche Tabs */}
      <div>
        <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-3">Select a Niche</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
          {NICHES.map((niche) => {
            const c = NICHE_COLORS[niche] || DEFAULT_NC;
            const isActive = selectedNiche === niche;
            const count = DFY_PAGES.filter((p) => p.niche === niche).length;
            return (
              <button
                key={niche}
                onClick={() => setSelectedNiche(niche)}
                className={cn(
                  "relative flex flex-col items-center gap-1.5 px-3 py-4 rounded-xl border transition-all duration-200 text-center group",
                  isActive
                    ? `${c.bg} ${c.border} ${c.text} shadow-lg`
                    : "bg-white/[0.02] border-white/5 text-gray-500 hover:bg-white/5 hover:border-white/10 hover:text-gray-300"
                )}
              >
                <span className="text-[11px] font-bold uppercase tracking-wide leading-tight">{niche}</span>
                <span className={cn("text-[10px]", isActive ? "opacity-70" : "text-gray-600")}>{count} pages</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Niche Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className={cn("text-xl font-bold", (NICHE_COLORS[selectedNiche] || DEFAULT_NC).text)}>{selectedNiche}</h2>
          <p className="text-xs text-gray-500 mt-0.5">{filteredPages.length} done-for-you pages — each with a unique design & angle</p>
        </div>
      </div>

      {/* Pages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPages.map((page, index) => {
          const nc = NICHE_COLORS[page.niche] || DEFAULT_NC;
          const isSynced = syncedPageIds.has(page.id);

          return (
            <motion.div key={page.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }}>
              <GlassPanel intensity="low" className="p-5 border-white/5 hover:border-primary/20 transition-all duration-300 h-full flex flex-col">
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border", nc.text, nc.bg, nc.border)}>
                        {page.niche}
                      </span>
                      {isSynced && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-400/10 border border-emerald-400/20 text-[10px] font-bold text-emerald-400">
                          <CheckCircle className="w-3 h-3" /> Synced
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-white">{page.pageName}</h3>
                  </div>
                </div>

                {/* Design Angle */}
                <div className="flex items-center gap-2 mb-3">
                  <Palette className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                  <span className="text-xs text-gray-400 font-medium">{page.designAngle}</span>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-400 leading-relaxed mb-4 flex-1">{page.description}</p>

                {/* Recommended Products */}
                <div className="mb-4 p-3 rounded-lg bg-white/[0.02] border border-white/5">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Recommended For</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {page.recommendedProducts.map((prod, i) => (
                      <span key={i} className="inline-flex items-center px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-[10px] text-gray-400">
                        {prod}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex items-center gap-2">
                  <a
                    href={page.previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-gray-400 uppercase tracking-wider hover:bg-white/10 hover:text-white transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Check Page
                  </a>

                  <button
                    onClick={() => setSyncPopupPage(page)}
                    disabled={isSynced}
                    className={cn(
                      "flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300",
                      isSynced
                        ? "bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 cursor-default"
                        : "bg-linear-to-r from-primary to-cyan-400 text-black hover:shadow-[0_0_20px_rgba(0,242,255,0.2)]"
                    )}
                  >
                    {isSynced ? <><CheckCircle className="w-3.5 h-3.5" /> Synced</> : <><Rocket className="w-3.5 h-3.5" /> Sync Page</>}
                  </button>
                </div>
              </GlassPanel>
            </motion.div>
          );
        })}
      </div>

      {/* Sync Popup */}
      <AnimatePresence>
        {syncPopupPage && (
          <SyncPopup
            page={syncPopupPage}
            onClose={() => setSyncPopupPage(null)}
            onSynced={() => handleSynced(syncPopupPage.id)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
