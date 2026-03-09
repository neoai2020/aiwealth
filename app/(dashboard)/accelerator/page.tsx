"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassPanel } from "@/components/ui/glass-panel";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/auth-context";
import { DFY_PAGES, type DFYPage } from "@/lib/dfy-pages";
import {
  Rocket,
  ExternalLink,
  X,
  Check,
  CheckCircle,
  Loader2,
  Search,
  ClipboardPaste,
  Sparkles,
  Palette,
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
            <div className="p-4 rounded-xl border transition-all bg-primary/5 border-primary/20">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold bg-primary/20 text-primary">1</div>
                <span className="text-sm font-bold text-white">Find a matching product on Digistore24</span>
              </div>
              <div className="ml-10 space-y-2">
                <p className="text-xs text-gray-400 leading-relaxed">
                  Recommended products for this page: <span className="text-gray-300 font-medium">{page.recommendedProducts.join(", ")}</span>
                </p>
                <a href="https://www.digistore24-app.com/app/en/affiliate/account/marketplace/all" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-gray-300 hover:text-white hover:bg-white/10 transition-all">
                  <Search className="w-3 h-3" /> Open Digistore24 <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-4 rounded-xl border transition-all bg-primary/5 border-primary/20">
              <div className="flex items-center gap-3 mb-2">
                <div className={cn("w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold", promoLink.trim() ? "bg-emerald-500/20 text-emerald-400" : "bg-primary/20 text-primary")}>
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
                    href={`/dfy/${page.id}`}
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
