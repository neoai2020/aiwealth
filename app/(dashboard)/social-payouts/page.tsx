"use client";

import { motion } from "framer-motion";
import { Globe, Users, MessageSquare, Share2, TrendingUp, Zap, MousePointer2, BarChart3, Instagram, Twitter, Facebook, Youtube, Rocket, CheckCircle2, Copy, Calendar, Heart, Send, BarChart } from "lucide-react";
import { GlassPanel } from "@/components/ui/glass-panel";
import { NeonButton } from "@/components/ui/neon-button";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

export default function SocialPayoutsPage() {
    const [activeTab, setActiveTab] = useState("TikTok");
    const [copiedHook, setCopiedHook] = useState<string | null>(null);

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopiedHook(text);
        setTimeout(() => setCopiedHook(null), 2000);
    };

    return (
        <div className="space-y-12 pb-32">
            {/* Header / Hero Section */}
            <section className="relative overflow-hidden p-8 md:p-16 rounded-[2.5rem] border border-blue-500/20 bg-linear-to-br from-blue-500/10 via-black to-cyan-500/5 shadow-2xl shadow-blue-500/10">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />

                <div className="relative z-10 flex flex-col items-center text-center gap-10">
                    <div className="space-y-6 max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 mx-auto">
                            Social Distribution Protocol
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none font-(family-name:--font-display)">
                            SOCIAL <br />
                            <span className="inline-block pr-4 text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400 font-black italic uppercase">PAYOUTS</span>
                        </h1>
                        <p className="text-gray-400 text-lg md:text-xl leading-relaxed font-medium max-w-2xl mx-auto">
                            Turn social engagement into a high-frequency wealth engine. Our AI-powered optimization suite identifies viral trends and deploys targeted investment channels.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 pt-4">
                            <NeonButton className="px-10 h-14 bg-blue-600 hover:bg-blue-500 border-none text-[12px] tracking-widest uppercase font-black shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                                <Zap className="mr-2 w-4 h-4" /> START OPTIMIZATION
                            </NeonButton>
                            <button className="px-10 h-14 rounded-full text-white text-[10px] font-black tracking-widest uppercase hover:bg-white/10 transition-all flex items-center gap-2 bg-white/5">
                                <MessageSquare className="w-4 h-4" /> VIEW HOOK LIBRARY
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Platform Injectors (NEW) */}
            <section className="space-y-8">
                <div className="flex items-center justify-between px-2">
                    <div>
                        <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">Platform <span className="text-blue-500">Optimizers</span></h2>
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1 italic">Tailored distribution channels for every network</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { net: "TikTok", icon: Globe, val: "Aggressive", color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-500/30" },
                        { net: "Instagram", icon: Instagram, val: "Viral Pulse", color: "text-pink-400", bg: "bg-pink-400/10", border: "border-pink-500/30" },
                        { net: "X / Twitter", icon: Twitter, val: "High Frequency", color: "text-cyan-400", bg: "bg-cyan-400/10", border: "border-cyan-500/30" },
                        { net: "YouTube", icon: Youtube, val: "Educational", color: "text-red-400", bg: "bg-red-400/10", border: "border-red-500/30" }
                    ].map((n, i) => (
                        <motion.div
                            key={n.net}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <GlassPanel intensity="low" className={cn("p-8 relative overflow-hidden group hover:bg-white/5 transition-all cursor-pointer bg-white/2", n.border)}>
                                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border border-current shadow-lg group-hover:scale-110 transition-transform", n.bg, n.color)}>
                                    <n.icon className="w-6 h-6" />
                                </div>
                                <h4 className="text-white font-black uppercase tracking-tight text-xl italic mb-2">{n.net}</h4>
                                <div className="flex items-center gap-2 mb-4">
                                    <span className={cn("px-2 py-0.5 rounded text-[8px] font-black uppercase border", n.color, n.bg, "border-current/20")}>
                                        {n.val}
                                    </span>
                                </div>
                                <div className="space-y-2">
                                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                        <div className={cn("h-full", n.bg)} style={{ width: "70%" }} />
                                    </div>
                                    <p className="text-[8px] text-gray-500 font-black uppercase tracking-widest text-right">72% Active Pool</p>
                                </div>
                            </GlassPanel>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Main Injection Interface */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Viral Hook Library (NEW) */}
                <GlassPanel className="lg:col-span-2 p-10 space-y-10 relative overflow-hidden">

                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/5 pb-8">
                        <div className="pt-10">
                            <h3 className="text-3xl font-black text-white tracking-tighter uppercase italic">Viral Content <span className="text-blue-500">Library</span></h3>
                            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1 italic">Optimized for platform-specific engagement</p>
                        </div>
                        <div className="flex gap-2">
                            {["TikTok", "Shorts", "Reels"].map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={cn(
                                        "px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border",
                                        activeTab === tab
                                            ? "bg-blue-600 border-blue-400 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                                            : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
                                    )}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 mt-10">
                        {[
                            { hook: "You've been doing [X] wrong your entire life, here's the fix...", success: "92%" },
                            { hook: "The secret 1% don't want you to know about [Bridge Niche]...", success: "88%" },
                            { hook: "Watch me turn $10 into $1,000 using this single strategy...", success: "95%" },
                            { hook: "Stop scrolling! This [Product] is literally changing everything...", success: "84%" }
                        ].map((item, i) => (
                            <div key={i} className="group p-6 rounded-2xl bg-black/40 border border-white/5 hover:border-blue-500/30 transition-all cursor-pointer relative overflow-hidden" onClick={() => handleCopy(item.hook)}>
                                <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/5 transition-all" />
                                <div className="flex justify-between items-start mb-4 relative z-10">
                                    <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em]">Efficiency: {item.success}</span>
                                    {copiedHook === item.hook ? (
                                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                    ) : (
                                        <Copy className="w-4 h-4 text-gray-600 group-hover:text-blue-400 transition-colors" />
                                    )}
                                </div>
                                <p className="text-white font-medium italic leading-relaxed relative z-10 group-hover:text-blue-200 transition-colors">"{item.hook}"</p>
                            </div>
                        ))}
                    </div>

                    <NeonButton className="w-full h-16 bg-blue-600/10 hover:bg-blue-600/20 border-blue-500/30 text-blue-400 font-black tracking-widest uppercase italic shadow-lg shadow-blue-500/5 relative z-10 mt-10">
                        GENERATE UNIQUE VARIATIONS
                    </NeonButton>
                </GlassPanel>

                {/* Right Column Context */}
                <div className="space-y-8">
                    {/* Live Sentiment Analysis (MOCK) */}
                    <GlassPanel className="p-8 border-cyan-500/30 bg-linear-to-br from-cyan-500/10 to-transparent">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-2 rounded-lg bg-cyan-500/20 border border-cyan-500/40">
                                <Heart className="w-5 h-5 text-cyan-400 animate-pulse" />
                            </div>
                            <div>
                                <h3 className="text-sm font-black text-white uppercase tracking-widest">Sentiment Stream</h3>
                                <p className="text-[10px] text-cyan-400 font-bold tracking-widest uppercase">Global Analysis</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {[
                                { label: "Positive", val: 65, color: "bg-emerald-400" },
                                { label: "Neutral", val: 25, color: "bg-blue-400" },
                                { label: "Critical", val: 10, color: "bg-red-400" }
                            ].map(s => (
                                <div key={s.label} className="space-y-2">
                                    <div className="flex justify-between text-[9px] font-black uppercase tracking-widest">
                                        <span className="text-gray-400">{s.label}</span>
                                        <span className="text-white">{s.val}%</span>
                                    </div>
                                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                        <div className={cn("h-full shadow-[0_0_10px_rgba(34,197,94,0.3)]", s.color)} style={{ width: `${s.val}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>

                    </GlassPanel>

                    <GlassPanel className="p-8 space-y-3">
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center justify-between">
                                <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Content Pulse</h4>
                            </div>
                            <div className="grid grid-cols-7 gap-4">
                                {Array.from({ length: 7 }).map((_, i) => (
                                    <div key={i} className={cn(
                                        "aspect-square rounded-lg border transition-all",
                                        i === 3 ? "bg-blue-500 border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.3)]" : "bg-white/5 border-white/10"
                                    )} />
                                ))}
                            </div>
                        </div>
                        <div className="pt-3 mt-4 text-[8px] font-black text-blue-400 uppercase tracking-[0.2em] italic border-t border-white/5">
                            Next Optimization: 2h 14m
                        </div>
                    </GlassPanel>

                    <GlassPanel intensity="low" className="p-8 border-orange-500/20 bg-orange-500/5">
                        <div className="flex items-center gap-3 mb-4">
                            <h4 className="text-[10px] font-black text-white uppercase tracking-widest">Engagement Ratio</h4>
                        </div>
                        <p className="text-3xl font-black text-white italic tracking-tighter">8.42<span className="text-xs text-orange-400 ml-1">x</span></p>
                        <p className="text-[9px] text-gray-500 mt-2 uppercase font-black italic tracking-widest">Above Industry Alpha</p>
                    </GlassPanel>
                </div>
            </div>

            {/* Final Call to Action */}
            <section className="py-16">
                <GlassPanel className="p-10 md:p-16 flex flex-col items-center text-center space-y-16 border-blue-500/20 bg-linear-to-b from-blue-500/5 via-black to-transparent relative overflow-hidden rounded-[2.5rem] shadow-xl shadow-blue-500/5">
                    <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center shadow-[0_0_40px_rgba(59,130,246,0.15)] relative z-10 border border-blue-500/20 mx-auto mb-3">
                        <Share2 className="w-7 h-7 text-blue-400" />
                    </div>

                    <div className="space-y-10 max-w-3xl relative z-10 flex flex-col items-center">
                        <h3 className="text-3xl md:text-5xl font-black text-white italic tracking-tighter uppercase leading-none font-display pr-[0.1em]">
                            MONETIZE YOUR <br />
                            <span className="text-blue-400 italic">INFLUENCE</span>
                        </h3>
                        <p className="text-gray-400 text-base md:text-lg leading-relaxed font-medium opacity-80 max-w-xl mx-auto">
                            Don't just post. Dominate. Our AI optimization suite turns social activity into a scalable wealth distribution channel.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full max-w-lg relative z-10 pt-4">
                        <NeonButton variant="primary" className="h-16 px-12 text-xs font-black uppercase tracking-[0.2em] shadow-xl bg-blue-600 hover:bg-blue-500 flex-1 w-full sm:w-auto">
                            INITIATE GROWTH
                        </NeonButton>
                        <button className="h-16 px-10 rounded-full text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all flex-1 w-full sm:w-auto backdrop-blur-md bg-white/5">
                            SYNC NETWORKS
                        </button>
                    </div>

                    <div className="pt-12 flex flex-wrap items-center justify-center gap-8 relative z-10 opacity-50">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-blue-400" />
                            <span className="text-[9px] uppercase font-black tracking-[0.15em] text-white">Viral Velocity</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-blue-400" />
                            <span className="text-[9px] uppercase font-black tracking-[0.15em] text-white">Global Reach</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-blue-400" />
                            <span className="text-[9px] uppercase font-black tracking-[0.15em] text-white">Revenue Synced</span>
                        </div>
                    </div>
                </GlassPanel>
            </section>
        </div>
    );
}
