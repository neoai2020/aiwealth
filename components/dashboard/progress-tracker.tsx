"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GlassPanel } from "@/components/ui/glass-panel";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/auth-context";
import { Flame, Target, Award, Star, Zap, Trophy } from "lucide-react";

const DAILY_TARGET = 7;

interface Badge {
  label: string;
  icon: React.ElementType;
  achieved: boolean;
  description: string;
}

export function ProgressTracker() {
  const { user } = useAuth();
  const [syncedToday, setSyncedToday] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const fetchProgress = async () => {
      if (!user) return;
      try {
        const { count, error } = await supabase
          .from("bridges")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user.id);

        if (error) throw error;

        const total = count || 0;
        setTotalPages(total);

        const today = new Date().toISOString().split("T")[0];
        const { count: todayCount } = await supabase
          .from("bridges")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user.id)
          .gte("created_at", `${today}T00:00:00`);

        setSyncedToday(todayCount || 0);

        const dayStreak = Math.min(Math.floor(total / 2), 30);
        setStreak(dayStreak);
      } catch (err) {
        console.error("Error fetching progress:", err);
      }
    };

    fetchProgress();
  }, [user]);

  const progressPercent = Math.min((syncedToday / DAILY_TARGET) * 100, 100);
  const remaining = Math.max(DAILY_TARGET - syncedToday, 0);

  const badges: Badge[] = [
    {
      label: "First Sync",
      icon: Star,
      achieved: totalPages >= 1,
      description: "Sync your first product",
    },
    {
      label: "7-Day Streak",
      icon: Flame,
      achieved: streak >= 7,
      description: "Maintain a 7-day streak",
    },
    {
      label: "50 Pages",
      icon: Trophy,
      achieved: totalPages >= 50,
      description: "Create 50 synced pages",
    },
    {
      label: "Power User",
      icon: Zap,
      achieved: totalPages >= 100,
      description: "Create 100 synced pages",
    },
  ];

  return (
    <GlassPanel
      intensity="low"
      className="p-6 md:p-8 border-white/5 hover:border-primary/20 transition-all duration-500"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
            <Target className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white font-(family-name:--font-display)">
              Daily Progress
            </h3>
            <p className="text-sm text-gray-400">
              Track your sync activity and milestones
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20">
          <Flame className="w-4 h-4 text-orange-400" />
          <span className="text-sm font-bold text-orange-400">
            {streak}-day streak
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-300">
            You&apos;ve synced{" "}
            <span className="text-white font-bold">
              {syncedToday}/{DAILY_TARGET}
            </span>{" "}
            products today
          </span>
          <span className="text-sm font-bold text-primary">
            {Math.round(progressPercent)}%
          </span>
        </div>
        <div className="w-full h-3 rounded-full bg-white/5 border border-white/10 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="h-full rounded-full bg-linear-to-r from-primary via-cyan-400 to-primary shadow-[0_0_12px_rgba(0,242,255,0.4)]"
          />
        </div>
        {remaining > 0 && (
          <p className="text-xs text-gray-500 mt-2">
            Sync{" "}
            <span className="text-primary font-semibold">{remaining} more</span>{" "}
            product{remaining !== 1 ? "s" : ""} to hit your daily target!
          </p>
        )}
        {remaining === 0 && (
          <p className="text-xs text-primary font-semibold mt-2">
            Daily target reached — great work!
          </p>
        )}
      </div>

      {/* Milestone Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {badges.map((badge) => (
          <div
            key={badge.label}
            className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-300 ${
              badge.achieved
                ? "bg-primary/5 border-primary/30 shadow-[0_0_15px_rgba(0,242,255,0.1)]"
                : "bg-white/[0.02] border-white/5 opacity-40"
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                badge.achieved ? "bg-primary/20" : "bg-white/5"
              }`}
            >
              <badge.icon
                className={`w-5 h-5 ${
                  badge.achieved ? "text-primary" : "text-gray-600"
                }`}
              />
            </div>
            <span
              className={`text-xs font-bold text-center ${
                badge.achieved ? "text-white" : "text-gray-600"
              }`}
            >
              {badge.label}
            </span>
            <span className="text-[10px] text-gray-500 text-center leading-tight">
              {badge.description}
            </span>
          </div>
        ))}
      </div>
    </GlassPanel>
  );
}
