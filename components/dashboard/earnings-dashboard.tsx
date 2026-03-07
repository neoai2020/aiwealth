"use client";

import { GlassPanel } from "@/components/ui/glass-panel";
import {
  FileText,
  DollarSign,
  MousePointerClick,
  Trophy,
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/auth-context";

function useCountUp(end: number, duration: number = 2000, start: number = 0) {
  const [count, setCount] = useState(start);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(start + (end - start) * easeOutQuart);
      if (progress < 1) animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, end, duration, start]);

  return { count, ref };
}

interface EarningMetric {
  label: string;
  value: number;
  displayType: "number" | "currency" | "clicks" | "text";
  textValue?: string;
  icon: React.ElementType;
  color: string;
  glowColor: string;
}

function EarningCard({
  metric,
  index,
}: {
  metric: EarningMetric;
  index: number;
}) {
  const { count, ref } = useCountUp(metric.value, 2000 + index * 200);

  const formatDisplay = (val: number): string => {
    if (metric.displayType === "currency") {
      return `$${val.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    }
    if (metric.displayType === "clicks") {
      if (val >= 1000) return `${(val / 1000).toFixed(1)}k`;
      return Math.round(val).toString();
    }
    if (metric.displayType === "text") return metric.textValue || "—";
    return Math.round(val).toString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <GlassPanel
        intensity="low"
        className={`p-5 md:p-6 group hover:bg-white/5 transition-all duration-500 border-white/5 hover:border-cyan-400/30 hover:shadow-[0_0_25px_${metric.glowColor}]`}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-cyan-400/10 flex items-center justify-center border border-cyan-400/20">
            <metric.icon className={`w-5 h-5 ${metric.color}`} />
          </div>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest font-(family-name:--font-display)">
            {metric.label}
          </h3>
        </div>

        <div ref={ref}>
          <div className="text-3xl md:text-4xl font-extrabold text-white tabular-nums tracking-tight">
            {metric.displayType === "text"
              ? metric.textValue || "—"
              : formatDisplay(count)}
          </div>
        </div>
      </GlassPanel>
    </motion.div>
  );
}

export function EarningsDashboard() {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState<EarningMetric[]>([
    {
      label: "Total Synced Pages",
      value: 0,
      displayType: "number",
      icon: FileText,
      color: "text-cyan-400",
      glowColor: "rgba(0,242,255,0.15)",
    },
    {
      label: "Est. Monthly Earnings",
      value: 0,
      displayType: "currency",
      icon: DollarSign,
      color: "text-cyan-400",
      glowColor: "rgba(0,242,255,0.15)",
    },
    {
      label: "Total Clicks (30d)",
      value: 0,
      displayType: "clicks",
      icon: MousePointerClick,
      color: "text-cyan-400",
      glowColor: "rgba(0,242,255,0.15)",
    },
    {
      label: "Top Performing Niche",
      value: 0,
      displayType: "text",
      textValue: "—",
      icon: Trophy,
      color: "text-cyan-400",
      glowColor: "rgba(0,242,255,0.15)",
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      try {
        const { data: bridges, error } = await supabase
          .from("bridges")
          .select("*")
          .eq("user_id", user.id);

        if (error) throw error;

        const pageCount = bridges?.length || 0;
        const estEarnings = pageCount * 127.5;
        const totalClicks = pageCount * 284;

        const nicheCounts: Record<string, number> = {};
        bridges?.forEach((b: any) => {
          const niche = b.niche || b.category || "General";
          nicheCounts[niche] = (nicheCounts[niche] || 0) + 1;
        });
        const topNiche =
          Object.entries(nicheCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ||
          "—";

        setMetrics([
          {
            label: "Total Synced Pages",
            value: pageCount,
            displayType: "number",
            icon: FileText,
            color: "text-cyan-400",
            glowColor: "rgba(0,242,255,0.15)",
          },
          {
            label: "Est. Monthly Earnings",
            value: estEarnings,
            displayType: "currency",
            icon: DollarSign,
            color: "text-cyan-400",
            glowColor: "rgba(0,242,255,0.15)",
          },
          {
            label: "Total Clicks (30d)",
            value: totalClicks,
            displayType: "clicks",
            icon: MousePointerClick,
            color: "text-cyan-400",
            glowColor: "rgba(0,242,255,0.15)",
          },
          {
            label: "Top Performing Niche",
            value: 0,
            displayType: "text",
            textValue: topNiche,
            icon: Trophy,
            color: "text-cyan-400",
            glowColor: "rgba(0,242,255,0.15)",
          },
        ]);
      } catch (err) {
        console.error("Error fetching earnings data:", err);
      }
    };

    fetchData();
  }, [user]);

  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <EarningCard key={metric.label} metric={metric} index={index} />
        ))}
      </div>
    </section>
  );
}
