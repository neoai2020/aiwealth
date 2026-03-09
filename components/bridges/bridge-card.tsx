"use client";

import { useState } from "react";
import { GlassPanel } from "@/components/ui/glass-panel";
import { ExternalLink, Globe, Trash2, Pencil, X, Loader2, Check, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface BridgeCardProps {
  id: string;
  title: string;
  url: string;
  status: "indexing" | "live" | "optimizing" | "paused";
  traffic: string;
  earnings: string;
  niche?: string;
  onDelete?: (id: string) => void;
  onUrlUpdated?: (id: string, newUrl: string) => void;
}

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
};

const DEFAULT_NICHE_COLOR = { text: "text-gray-400", bg: "bg-gray-400/10", border: "border-gray-400/20" };

function shortenUrl(url: string): string {
  try {
    const parsed = new URL(url.startsWith("http") ? url : `https://${url}`);
    const path = parsed.pathname.length > 20
      ? parsed.pathname.substring(0, 20) + "..."
      : parsed.pathname;
    return parsed.hostname.replace("www.", "") + (path !== "/" ? path : "");
  } catch {
    return url.length > 40 ? url.substring(0, 40) + "..." : url;
  }
}

export function BridgeCard({ id, title, url, status, traffic, earnings, niche, onDelete, onUrlUpdated }: BridgeCardProps) {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editUrl, setEditUrl] = useState(url);
  const [saving, setSaving] = useState(false);
  const [displayUrl, setDisplayUrl] = useState(url);

  const isRecurring = earnings?.toLowerCase().includes("recurring");

  const handleSaveUrl = async () => {
    if (!editUrl.trim() || saving) return;
    setSaving(true);
    try {
      const { error } = await supabase
        .from("bridges")
        .update({ affiliate_url: editUrl.trim() })
        .eq("id", id);
      if (!error) {
        setDisplayUrl(editUrl.trim());
        onUrlUpdated?.(id, editUrl.trim());
        setEditModalOpen(false);
      } else {
        console.error("Error updating link:", error);
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setSaving(false);
    }
  };
  const getStatusColor = (s: string) => {
    switch (s) {
      case "live": return "text-green-500 bg-green-500/10 border-green-500/20";
      case "indexing": return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20";
      case "optimizing": return "text-blue-500 bg-blue-500/10 border-blue-500/20";
      default: return "text-gray-500 bg-gray-500/10 border-gray-500/20";
    }
  };

  const getGlowColor = (s: string) => {
    switch (s) {
      case "live": return "hover:border-green-500/50 hover:shadow-[0_0_25px_rgba(34,197,94,0.15)]";
      case "indexing": return "hover:border-yellow-500/50 hover:shadow-[0_0_25px_rgba(234,179,8,0.15)]";
      default: return "hover:border-primary/50 hover:shadow-[0_0_25px_rgba(0,242,255,0.15)]";
    }
  };

  const nicheLabel = niche || "General";
  const nicheColor = NICHE_COLORS[nicheLabel] || DEFAULT_NICHE_COLOR;

  const displayEarnings = (!earnings || earnings === "$0.00" || earnings === "0")
    ? (() => {
        const seed = id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const min = 150 + (seed % 350);
        const max = min + 800 + (seed % 1200);
        return `$${min.toLocaleString()} – $${max.toLocaleString()}`;
      })()
    : earnings;

  return (
    <GlassPanel
      intensity="low"
      className={cn(
        "p-0 border-white/5 transition-all duration-500 group overflow-hidden relative h-full",
        getGlowColor(status)
      )}
    >
      {/* Card Header */}
      <div className="p-5 border-b border-white/5">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1 min-w-0 mr-3">
            <h3
              className="font-bold text-base text-white truncate group-hover:text-primary transition-colors"
              title={title}
            >
              {title}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <Globe className="w-3 h-3 text-gray-500 shrink-0" />
              <span
                className="text-xs text-gray-500 truncate font-mono"
                title={displayUrl}
              >
                {shortenUrl(displayUrl)}
              </span>
            </div>
          </div>
          <div
            className={cn(
              "px-2.5 py-1 rounded text-[10px] font-bold uppercase border shrink-0",
              getStatusColor(status)
            )}
          >
            <span className="flex items-center gap-1.5">
              <span
                className={cn(
                  "w-1.5 h-1.5 rounded-full animate-pulse",
                  status === "live"
                    ? "bg-green-500"
                    : status === "indexing"
                      ? "bg-yellow-500"
                      : "bg-blue-500"
                )}
              />
              {status}
            </span>
          </div>
        </div>

        {/* Niche Badge + Recurring Label */}
        <div className="flex items-center gap-2 flex-wrap">
          <div
            className={cn(
              "inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border",
              nicheColor.text,
              nicheColor.bg,
              nicheColor.border
            )}
          >
            {nicheLabel}
          </div>
          {isRecurring && (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-amber-400/20 bg-amber-400/10 text-amber-400">
              <RefreshCw className="w-3 h-3" />
              Recurring
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="p-5 grid grid-cols-2 gap-3">
        <div className="bg-black/40 p-3 rounded-lg border border-white/5">
          <div className="text-[10px] text-gray-500 uppercase mb-1">
            Est. Traffic
          </div>
          <div className="text-sm font-bold text-white tabular-nums">
            {traffic || "0"}
          </div>
        </div>
        <div className="bg-black/40 p-3 rounded-lg border border-white/5">
          <div className="text-[10px] text-gray-500 uppercase mb-1">
            Est. Earnings
          </div>
          <div className="text-sm font-bold text-green-400 tabular-nums">
            {displayEarnings}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="p-5 pt-0 flex flex-col gap-2">
        <div className="flex gap-3">
          <Link
            href={`/review/${id}`}
            target="_blank"
            className="flex-1 h-10 flex items-center justify-center gap-2 text-gray-400 hover:text-white bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 border border-white/5 text-xs font-bold uppercase tracking-wider"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Check Synced Page
          </Link>

          <button
            onClick={() => onDelete?.(id)}
            className="h-10 w-10 flex items-center justify-center text-gray-500 hover:text-red-400 bg-white/5 rounded-xl hover:bg-red-500/10 hover:border-red-500/30 transition-all duration-300 border border-white/5 shrink-0"
            title="Delete synced page"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        <button
          onClick={() => { setEditUrl(displayUrl); setEditModalOpen(true); }}
          className="h-10 flex items-center justify-center gap-2 text-gray-400 hover:text-amber-400 bg-white/5 rounded-xl hover:bg-amber-500/10 hover:border-amber-500/30 transition-all duration-300 border border-white/5 text-xs font-bold uppercase tracking-wider"
        >
          <Pencil className="w-3.5 h-3.5" />
          Edit Promotional Link
        </button>
      </div>

      {/* Top line decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent group-hover:via-primary/50 transition-all duration-500" />

      {/* Edit Promotional Link Modal */}
      <AnimatePresence>
        {editModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-black/95 border border-white/10 rounded-3xl p-8 shadow-2xl backdrop-blur-xl"
            >
              <button
                onClick={() => setEditModalOpen(false)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-extrabold text-white mb-1">
                    Edit Promotional Link
                  </h2>
                  <p className="text-sm text-gray-400">
                    Update the affiliate link for <span className="text-white font-medium">{title}</span>
                  </p>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">
                    Promotional Link
                  </label>
                  <input
                    type="text"
                    value={editUrl}
                    onChange={(e) => setEditUrl(e.target.value)}
                    placeholder="https://www.digistore24.com/redir/..."
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:border-primary/40 transition-colors"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && editUrl.trim()) handleSaveUrl();
                    }}
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleSaveUrl}
                    disabled={!editUrl.trim() || saving}
                    className={cn(
                      "flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-bold uppercase tracking-wider transition-all duration-300",
                      editUrl.trim() && !saving
                        ? "bg-linear-to-r from-primary to-cyan-400 text-black hover:shadow-[0_0_20px_rgba(0,242,255,0.2)]"
                        : "bg-white/5 border border-white/10 text-gray-600 cursor-not-allowed"
                    )}
                  >
                    {saving ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
                    ) : (
                      <><Check className="w-4 h-4" /> Save Changes</>
                    )}
                  </button>
                  <button
                    onClick={() => setEditModalOpen(false)}
                    className="px-6 py-3.5 rounded-2xl border border-white/10 text-white text-sm font-bold hover:bg-white/5 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </GlassPanel>
  );
}
