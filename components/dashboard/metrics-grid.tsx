"use client";

import { GlassPanel } from "@/components/ui/glass-panel";
import { TrendingUp, Activity, Users, DollarSign } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/auth-context";

// ... existing useCountUp hook ...
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

        if (ref.current) {
            observer.observe(ref.current);
        }

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
            const currentValue = start + (end - start) * easeOutQuart;

            setCount(currentValue);

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrame);
    }, [isVisible, end, duration, start]);

    return { count, ref };
}

// ... existing formatValue function ...
function formatValue(value: number, type: string): string {
    if (type === "currency") {
        return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    if (type === "percentage") {
        return `${Math.round(value)}%`;
    }
    if (type === "number") {
        return Math.round(value).toString();
    }
    if (type === "traffic") {
        if (value >= 1000) {
            return `${(value / 1000).toFixed(1)}k`;
        }
        return Math.round(value).toString();
    }
    return value.toString();
}

interface Metric {
    label: string;
    numericValue: number;
    displayValue: string;
    valueType: string;
    trend: string;
    icon: any;
    color: string;
    shadow: string;
    graph: string;
}

function MetricCard({ metric, index }: { metric: Metric; index: number }) {
    const { count, ref } = useCountUp(metric.numericValue, 2000 + index * 200, 0);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <GlassPanel
                intensity="low"
                className="p-5 flex flex-col justify-between group hover:bg-white/5 transition-all duration-500 border-white/5 hover:border-primary/30 hover:shadow-[0_0_25px_rgba(0,255,170,0.15)]"
            >
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest font-(family-name:--font-display)">
                        {metric.label}
                    </h3>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.3, type: "spring" }}
                    >
                        <metric.icon className={`w-4 h-4 ${metric.color}`} />
                    </motion.div>
                </div>

                <div ref={ref}>
                    <div className="text-3xl font-extrabold text-white mb-2 font-sans tabular-nums tracking-tight">
                        {formatValue(count, metric.valueType)}
                    </div>
                    <motion.div
                        className="text-sm font-bold text-gray-400"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                    >
                        <span className="text-primary">{metric.trend}</span> vs last sync
                    </motion.div>
                </div>

            </GlassPanel>
        </motion.div>
    );
}

export function MetricsGrid() {
    const { user } = useAuth();
    const [metrics, setMetrics] = useState<Metric[]>([
        {
            label: "Estimated Daily Flow",
            numericValue: 0,
            displayValue: "$0.00",
            valueType: "currency",
            trend: "0%",
            icon: DollarSign,
            color: "text-secondary",
            shadow: "shadow-secondary/20",
            graph: "from-secondary/50 to-transparent",
        },
        {
            label: "Est. Active Bridges",
            numericValue: 0,
            displayValue: "0",
            valueType: "number",
            trend: "0 total",
            icon: Activity,
            color: "text-primary",
            shadow: "shadow-primary/20",
            graph: "from-primary/50 to-transparent",
        },
        {
            label: "Traffic Pulse",
            numericValue: 0,
            displayValue: "0",
            valueType: "traffic",
            trend: "0%",
            icon: Users,
            color: "text-accent",
            shadow: "shadow-accent/20",
            graph: "from-accent/50 to-transparent",
        },
    ]);

    useEffect(() => {
        const fetchMetrics = async () => {
            if (!user) return;

            try {
                // Fetch active bridges count
                const { count, error } = await supabase
                    .from('bridges')
                    .select('*', { count: 'exact', head: true })
                    .eq('user_id', user.id);

                if (error) throw error;

                const bridgeCount = count || 0;

                // Calculate semi-real metrics based on bridge count
                // In a real app, these would come from an analytics API
                const dailyFlow = bridgeCount * 41.35; // Example multiplier
                const trafficPulse = bridgeCount * 284; // Example multiplier

                setMetrics(prev => [
                    {
                        ...prev[0],
                        numericValue: 0,
                        displayValue: "$0.00",
                        trend: "0%"
                    },
                    {
                        ...prev[1],
                        numericValue: bridgeCount,
                        displayValue: bridgeCount.toString(),
                        trend: `${bridgeCount} total`
                    },
                    {
                        ...prev[2],
                        numericValue: 0,
                        displayValue: "0",
                        trend: "0%"
                    }
                ]);

            } catch (error: any) {
                console.error('Error fetching metrics:', error);
                // Log more details if it's a Supabase error
                if (error?.message) {
                    console.error('Supabase Error Details:', {
                        message: error.message,
                        code: error.code,
                        details: error.details,
                        hint: error.hint
                    });
                }
            }
        };

        fetchMetrics();
    }, [user]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {metrics.map((metric, index) => (
                <MetricCard key={metric.label} metric={metric} index={index} />
            ))}
        </div>
    );
}
