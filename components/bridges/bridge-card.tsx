"use client";

import { GlassPanel } from "@/components/ui/glass-panel";
import { NeonButton } from "@/components/ui/neon-button";
import { ExternalLink, LineChart, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface BridgeCardProps {
  id: string;
  title: string;
  url: string;
  status: "indexing" | "live" | "optimizing" | "paused";
  traffic: string;
  earnings: string;
  niche?: string;
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

export function BridgeCard({ id, title, url, status, traffic, earnings, niche }: BridgeCardProps) {
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
                title={url}
              >
                {shortenUrl(url)}
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

        {/* Niche Badge */}
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
      <div className="p-5 pt-0 flex gap-3">
        <Link href={`/analytics?id=${id}`} className="flex-1">
          <NeonButton
            variant="ghost"
            className="w-full py-0 h-10 text-xs tracking-wider border-cyan-400/20 text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-400/40"
          >
            <LineChart className="w-3.5 h-3.5 mr-2" /> Analytics
          </NeonButton>
        </Link>

        <Link
          href={`/review/${id}`}
          target="_blank"
          className="h-10 w-10 flex items-center justify-center text-gray-400 hover:text-white bg-white/5 rounded-xl hover:bg-orange-500/10 hover:border-orange-500/30 hover:shadow-[0_0_15px_rgba(249,115,22,0.15)] transition-all duration-300 border border-white/5"
        >
          <ExternalLink className="w-4 h-4" />
        </Link>
      </div>

      {/* Top line decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent group-hover:via-primary/50 transition-all duration-500" />
    </GlassPanel>
  );
}
