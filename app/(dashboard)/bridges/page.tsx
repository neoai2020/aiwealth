"use client";

import { BridgeCard } from "@/components/bridges/bridge-card";
import { NeonButton } from "@/components/ui/neon-button";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Plus, Loader2, Info, Trash2, Zap } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/auth-context";
import { motion } from "framer-motion";

interface Bridge {
  id: string;
  title: string;
  affiliate_url: string;
  status: "indexing" | "live" | "optimizing" | "paused";
  traffic: string;
  earnings: string;
  niche?: string;
}

export default function BridgesPage() {
  const [bridges, setBridges] = useState<Bridge[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    async function fetchBridges() {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("bridges")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching bridges:", error);
          setBridges([]);
        } else {
          setBridges(data || []);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBridges();
  }, [user]);

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this synced page?")) return;

    try {
      const { error } = await supabase.from("bridges").delete().eq("id", id);
      if (error) {
        console.error("Error deleting bridge:", error);
        return;
      }
      setBridges((prev) => prev.filter((b) => b.id !== id));
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="space-y-8 pb-20 font-(family-name:--font-display)">
      {/* Info Banner */}
      <GlassPanel intensity="low" className="p-5 border-primary/10">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
            <Info className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white mb-2">
              Managing Your Synced Pages
            </h3>
            <p className="text-sm text-gray-400 mb-3">
              Each card below represents a synced product page. Here&apos;s what
              you can do:
            </p>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Zap className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>
                  <span className="text-white font-medium">New Product</span> —
                  Use the button above to sync a new product
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Trash2 className="w-3.5 h-3.5 text-red-400 shrink-0" />
                <span>
                  <span className="text-white font-medium">Delete</span> —
                  Remove a synced page you no longer need
                </span>
              </div>
            </div>
          </div>
        </div>
      </GlassPanel>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tighter">
            My Synced Pages
          </h1>
          <p className="text-gray-400">
            Manage and monitor your active synced products.
          </p>
        </div>
        <Link href="/sync">
          <NeonButton variant="primary" glow className="px-6">
            <Plus className="w-5 h-5 mr-2" /> Sync a New Product
          </NeonButton>
        </Link>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      ) : bridges.length === 0 ? (
        <GlassPanel className="p-12 text-center">
          <div className="max-w-md mx-auto space-y-4">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Plus className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-white">
              No Synced Pages Yet
            </h3>
            <p className="text-gray-400">
              Sync your first product to start generating traffic and earnings.
            </p>
            <Link href="/sync">
              <NeonButton variant="primary" glow className="mt-4">
                Sync Your First Product
              </NeonButton>
            </Link>
          </div>
        </GlassPanel>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bridges.map((bridge, index) => (
            <motion.div
              key={bridge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <BridgeCard
                id={bridge.id}
                title={bridge.title}
                url={bridge.affiliate_url}
                status={bridge.status}
                traffic={bridge.traffic}
                earnings={bridge.earnings}
                niche={bridge.niche}
                onDelete={handleDelete}
              />
            </motion.div>
          ))}

          {/* + Sync a New Product Card */}
          <Link href="/sync" className="group block h-full min-h-[280px]">
            <div className="h-full rounded-2xl border-2 border-dashed border-white/10 bg-white/[0.02] hover:bg-white/5 flex flex-col items-center justify-center gap-4 transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-[0_0_30px_rgba(0,242,255,0.1)]">
              <div className="w-14 h-14 rounded-full bg-black/40 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Plus className="w-7 h-7 text-gray-500 group-hover:text-primary transition-colors" />
              </div>
              <div className="text-center">
                <h3 className="font-bold text-base text-gray-400 group-hover:text-white transition-colors">
                  Sync a New Product
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Add another income stream
                </p>
              </div>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}
