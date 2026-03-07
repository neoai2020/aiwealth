"use client";

import { GlassPanel } from "@/components/ui/glass-panel";
import { NeonButton } from "@/components/ui/neon-button";
import { ExternalLink, LineChart, Globe, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";

interface BridgeCardProps {
    id: string;
    title: string;
    url: string;
    status: "indexing" | "live" | "optimizing" | "paused";
    traffic: string;
    earnings: string;
}

export function BridgeCard({ id, title, url, status, traffic, earnings }: BridgeCardProps) {
    const [showToast, setShowToast] = useState(false);

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
            case "live": return "hover:border-green-500/50 hover:shadow-[0_0_25px_rgba(34,197,94,0.2)]";
            case "indexing": return "hover:border-yellow-500/50 hover:shadow-[0_0_25px_rgba(234,179,8,0.2)]";
            case "optimizing": return "hover:border-blue-500/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.2)]";
            default: return "hover:border-primary/50 hover:shadow-[0_0_25px_rgba(0,255,170,0.2)]";
        }
    };

    const [isOptimizing, setIsOptimizing] = useState(false);
    const [optimizationSuccess, setOptimizationSuccess] = useState(false);

    const handleOptimize = async () => {
        setIsOptimizing(true);
        setShowToast(true); // Show "Optimization in progress" immediately

        try {
            const response = await fetch('/api/optimize-bridge', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ bridgeId: id })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Optimization failed");
            }

            const result = await response.json();
            if (result.success) {
                setOptimizationSuccess(true);
                // Slight delay to let user see "Success" before refresh
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            }
        } catch (error: any) {
            console.error("Optimize error:", error);
            alert(`Error: ${error.message || "Something went wrong"}`);
            setShowToast(false);
        } finally {
            setIsOptimizing(false);
        }
    };

    return (
        <GlassPanel
            intensity="low"
            className={cn(
                "p-0 border-white/5 transition-all duration-500 group overflow-hidden relative",
                getGlowColor(status)
            )}
        >
            {/* Toast Notification */}
            {showToast && (
                <div className={cn(
                    "absolute top-4 left-1/2 -translate-x-1/2 z-50 text-black text-xs font-bold px-4 py-2 rounded-lg shadow-lg animate-in fade-in slide-in-from-top-2 duration-300",
                    optimizationSuccess ? "bg-green-500 text-white" : "bg-primary"
                )}>
                    {optimizationSuccess ? "✅ Optimization Complete!" : "⚡ AI Optimization in progress..."}
                </div>
            )}

            {/* Card Header */}
            <div className="p-5 border-b border-white/5 bg-white/2">
                <div className="flex justify-between items-start mb-2">
                    <div className="flex-1 min-w-0 mr-4">
                        <h3 className="font-bold text-lg text-white truncate tracking-wide group-hover:text-primary transition-colors block w-full" title={title}>
                            {title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                            <Globe className="w-3 h-3 text-gray-500 shrink-0" />
                            <span className="text-xs text-gray-500 truncate font-mono block" title={url}>{url}</span>
                        </div>
                    </div>
                    <div className={cn("px-2.5 py-1 rounded text-[10px] font-bold uppercase border", getStatusColor(status))}>
                        <span className="flex items-center gap-1.5">
                            <span className={cn("w-1.5 h-1.5 rounded-full animate-pulse", status === 'live' ? 'bg-green-500' : status === 'indexing' ? 'bg-yellow-500' : 'bg-blue-500')} />
                            {status}
                        </span>
                    </div>
                </div>
            </div>

            {/* Stats Grid - 2 columns now (removed Signal) */}
            <div className="p-5 grid grid-cols-2 gap-3">
                <div className="bg-black/40 p-3 rounded-lg border border-white/5 hover:border-purple-500/30 hover:shadow-[0_0_15px_rgba(168,85,247,0.1)] transition-all duration-300">
                    <div className="text-[10px] text-gray-500 uppercase mb-1">Est. Traffic</div>
                    <div className="text-sm font-bold text-white font-sans tabular-nums">{traffic}</div>
                </div>
                <div className="bg-black/40 p-3 rounded-lg border border-white/5 hover:border-green-500/30 hover:shadow-[0_0_15px_rgba(34,197,94,0.1)] transition-all duration-300">
                    <div className="text-[10px] text-gray-500 uppercase mb-1">Est. Earnings</div>
                    <div className="text-sm font-bold text-green-400 font-sans tabular-nums">
                        {(!earnings || earnings === '$0.00' || earnings === '0') ? (() => {
                            // Generate deterministic range based on ID to keep it consistent
                            const seed = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
                            const min = 150 + (seed % 350);
                            const max = min + 800 + (seed % 1200);
                            return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
                        })() : earnings}
                    </div>
                </div>
            </div>

            <div className="p-5 pt-0 flex gap-3">
                <Link href={`/analytics?id=${id}`} className="flex-1">
                    <NeonButton variant="ghost" className="w-full py-0 h-10 text-xs tracking-wider border-white/10 hover:bg-blue-500/10 hover:border-blue-500/30 hover:shadow-[0_0_15px_rgba(59,130,246,0.15)]">
                        <LineChart className="w-3 h-3 mr-2" /> Analytics
                    </NeonButton>
                </Link>
                <NeonButton
                    variant="primary"
                    glow={false}
                    className="flex-1 py-0 h-10 text-xs tracking-wider bg-white/5 border-white/10 hover:bg-primary/20 hover:text-primary hover:border-primary/50 hover:shadow-[0_0_15px_rgba(0,255,170,0.15)] text-gray-300"
                    onClick={handleOptimize}
                    disabled={isOptimizing}
                >
                    {isOptimizing ? 'Improving...' : 'Optimize'}
                </NeonButton>

                <Link href={`/review/${id}`} target="_blank" className="h-10 w-10 flex items-center justify-center text-gray-400 hover:text-white bg-white/5 rounded-xl hover:bg-orange-500/10 hover:border-orange-500/30 hover:shadow-[0_0_15px_rgba(249,115,22,0.15)] transition-all duration-300 border border-white/5">
                    <ExternalLink className="w-4 h-4" />
                </Link>
            </div>


            {/* Optimization Success Overlay */}
            {optimizationSuccess && (
                <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center animate-in fade-in duration-300">
                    <div className="relative">
                        <div className="absolute inset-0 bg-green-500 blur-2xl opacity-20 animate-pulse" />
                        <CheckCircle className="w-16 h-16 text-green-500 relative z-10 drop-shadow-[0_0_15px_rgba(34,197,94,0.5)] animate-bounce" />
                    </div>
                    <h3 className="mt-4 text-xl font-bold text-white tracking-wide">Optimization Complete</h3>
                    <p className="text-gray-400 text-sm mt-1 mb-6">AI has enhanced your bridge.</p>
                </div>
            )}

            {/* Decoration - Neon top line */}
            <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent group-hover:via-primary/50 transition-all duration-500" />

            {/* Subtle corner glow */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </GlassPanel >
    );
}
