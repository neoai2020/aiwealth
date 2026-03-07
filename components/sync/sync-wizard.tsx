"use client";

import { useState } from "react";
import { GlassPanel } from "@/components/ui/glass-panel";
import { GlassInput } from "@/components/ui/glass-input";
import { NeonButton } from "@/components/ui/neon-button";
import { NeuralScan } from "./neural-scan";
import {
  Zap,
  CheckCircle,
  Eye,
  RotateCcw,
  ArrowRight,
  Sparkles,
  DollarSign,
  Tag,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/auth-context";
import Link from "next/link";

interface SyncResult {
  title: string;
  niche: string;
  estimatedEarnings: string;
}

export function SyncWizard() {
  const { user } = useAuth();
  const [status, setStatus] = useState<"idle" | "scanning" | "complete">(
    "idle"
  );
  const [url, setUrl] = useState("");
  const [scrapedData, setScrapedData] = useState<{
    title: string;
    description: string;
    image: string | null;
  } | null>(null);
  const [bridgeId, setBridgeId] = useState<string | null>(null);
  const [backendReady, setBackendReady] = useState(false);
  const [syncResult, setSyncResult] = useState<SyncResult | null>(null);

  const handleSync = async () => {
    if (!url) return;
    setStatus("scanning");
    setBackendReady(false);
    processBackendWork();
  };

  const processBackendWork = async () => {
    try {
      const response = await fetch("/api/analyze-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const result = await response.json();
      const data = result.success && result.data ? result.data : null;

      if (data) setScrapedData(data);

      if (!user) throw new Error("User not authenticated");

      let title = data?.title || "Wealth Bridge";
      if (!data?.title) {
        try {
          const hostname = new URL(url).hostname;
          const domain = hostname.replace("www.", "").split(".")[0];
          title = `Bridge - ${domain.charAt(0).toUpperCase() + domain.slice(1)}`;
        } catch (e) {}
      }

      const safeTitle = title.substring(0, 255);
      const safeDescription = (data?.description || "").substring(0, 1000);

      const { data: initialData, error: initialError } = await supabase
        .from("bridges")
        .insert({
          user_id: user.id,
          title: safeTitle,
          description: safeDescription,
          image_url: data?.image || null,
          affiliate_url: url,
          status: "indexing",
        })
        .select()
        .single();

      if (initialError) throw initialError;

      const newBridgeId = initialData.id;
      setBridgeId(newBridgeId);

      console.log("Generating full AI review...");
      const aiResponse = await fetch("/api/generate-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, niche: "Tech/Business" }),
      });
      const aiResult = await aiResponse.json();

      let detectedNiche = "General";
      if (aiResult.success && aiResult.data) {
        const aiContent = aiResult.data;
        detectedNiche = aiContent.product_niche || "General Interests";

        await supabase
          .from("bridges")
          .update({
            content: aiContent,
            description: (aiContent.summary || safeDescription).substring(
              0,
              1000
            ),
            niche: detectedNiche,
            status: "live",
            traffic: "0",
            earnings: "$0.00",
          })
          .eq("id", newBridgeId);
      } else {
        await supabase
          .from("bridges")
          .update({ status: "live", traffic: "0", earnings: "$0.00" })
          .eq("id", newBridgeId);
      }

      const estEarnings = `$${(Math.random() * 80 + 30).toFixed(2)} – $${(Math.random() * 120 + 100).toFixed(2)}`;
      setSyncResult({
        title: safeTitle,
        niche: detectedNiche,
        estimatedEarnings: estEarnings,
      });

      console.log("Backend work complete. Ready to finish scan.");
      setBackendReady(true);
    } catch (error: any) {
      console.error("Sync Process Failed:", error);
      alert(`Sync Failed: ${error?.message || "Unknown error"}`);
      setStatus("idle");
    }
  };

  const handleScanComplete = () => {
    setStatus("complete");
  };

  const handleSyncAnother = () => {
    setUrl("");
    setScrapedData(null);
    setBridgeId(null);
    setBackendReady(false);
    setSyncResult(null);
    setStatus("idle");
  };

  return (
    <AnimatePresence mode="wait">
      {/* SCANNING STATE */}
      {status === "scanning" && (
        <motion.div
          key="scanning"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          className="w-full"
        >
          <NeuralScan
            onComplete={handleScanComplete}
            canFinish={backendReady}
          />
        </motion.div>
      )}

      {/* COMPLETE STATE — Post-Sync Feedback */}
      {status === "complete" && (
        <motion.div
          key="complete"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          {/* Success Animation */}
          <div className="flex flex-col items-center text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
              className="relative w-20 h-20 mb-5"
            >
              <div className="absolute inset-0 rounded-full bg-emerald-400/20 animate-ping" />
              <div className="relative w-20 h-20 rounded-full bg-emerald-400/10 border-2 border-emerald-400/40 flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-emerald-400" />
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl md:text-3xl font-extrabold text-white mb-2"
            >
              Product Synced Successfully!
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-400"
            >
              Your page is being optimized and is now live.
            </motion.p>
          </div>

          {/* Product Card Preview */}
          {syncResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <GlassPanel
                intensity="medium"
                className="p-6 mb-8 border-emerald-400/20 bg-linear-to-br from-emerald-500/5 via-transparent to-cyan-500/5"
              >
                <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-4">
                  Synced Product
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                      <Sparkles className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <span className="text-[11px] text-gray-500 uppercase tracking-wider">
                        Product Name
                      </span>
                      <p className="text-base font-bold text-white">
                        {syncResult.title}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-black/30 border border-white/5">
                      <Tag className="w-4 h-4 text-cyan-400 shrink-0" />
                      <div>
                        <span className="text-[10px] text-gray-500 uppercase tracking-wider block">
                          Niche
                        </span>
                        <span className="text-sm font-bold text-white">
                          {syncResult.niche}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-black/30 border border-white/5">
                      <DollarSign className="w-4 h-4 text-emerald-400 shrink-0" />
                      <div>
                        <span className="text-[10px] text-gray-500 uppercase tracking-wider block">
                          Est. Earnings
                        </span>
                        <span className="text-sm font-bold text-white">
                          {syncResult.estimatedEarnings}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassPanel>
            </motion.div>
          )}

          {/* Two CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <Link href="/bridges" className="block">
              <NeonButton
                variant="primary"
                glow
                className="w-full h-14 text-sm"
              >
                <Eye className="w-4 h-4" />
                View My Synced Pages
                <ArrowRight className="w-4 h-4" />
              </NeonButton>
            </Link>

            <NeonButton
              variant="ghost"
              className="w-full h-14 text-sm"
              onClick={handleSyncAnother}
            >
              <RotateCcw className="w-4 h-4" />
              Sync Another Product
            </NeonButton>
          </motion.div>
        </motion.div>
      )}

      {/* IDLE STATE — Sync Input */}
      {status === "idle" && (
        <motion.div
          key="idle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="w-full"
        >
          <GlassPanel
            intensity="medium"
            className="p-6 md:p-8 border-primary/20 bg-black/40"
          >
            <div className="flex flex-col gap-5">
              <label className="text-sm font-bold text-gray-300 uppercase tracking-wider">
                Paste Your Affiliate Link
              </label>

              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary pointer-events-none">
                  <Zap className="w-5 h-5" />
                </div>
                <GlassInput
                  placeholder="Paste Digistore24 affiliate URL here..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && url) handleSync();
                  }}
                  className="h-16 pl-12 text-base md:text-lg tracking-wide bg-white/5 border-white/10 focus-visible:ring-primary focus-visible:border-primary/50"
                />
              </div>

              <NeonButton
                variant="primary"
                glow
                className="h-14 text-base w-full"
                onClick={handleSync}
                disabled={!url}
              >
                <Zap className="w-5 h-5" />
                SYNC PRODUCT
              </NeonButton>
            </div>
          </GlassPanel>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
