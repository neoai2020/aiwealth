"use client";

import { motion } from "framer-motion";
import { Zap, TrendingUp, Cpu, Gauge, Rocket, ArrowRight, CheckCircle2, Play, BarChart3, Activity, Globe, Share2, ZapOff, Timer } from "lucide-react";
import { GlassPanel } from "@/components/ui/glass-panel";
import { NeonButton } from "@/components/ui/neon-button";
import { cn } from "@/lib/utils";
import React from "react";

export default function AcceleratorPage() {
    return (
        <div className="space-y-12 pb-32">
            {/* Hero Section */}
            <section className="relative">
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="p-8 md:p-16 rounded-[2.5rem] border border-white/5 bg-linear-to-br from-white/5 via-black/40 to-transparent backdrop-blur-3xl shadow-2xl relative overflow-hidden flex flex-col items-center text-center"
                >

                    <div className="relative z-10 max-w-4xl space-y-8">
                        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-[0.3em] text-primary mx-auto">
                            Strategy Accelerator v2.0
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none italic font-display">
                            WEALTH <br /><span className="inline-block pr-4 text-primary italic uppercase">ACCELERATOR</span>
                        </h1>
                        <p className="text-gray-400 text-lg md:text-2xl leading-relaxed max-w-2xl mx-auto font-medium">
                            Unlock **Exponential Growth**. High-frequency market indexing designed to optimize your portfolio across distributed channels in real-time.
                        </p>
                        <div className="flex flex-wrap justify-center gap-6 pt-6">
                            <NeonButton variant="primary" glow className="px-12 h-16 text-[12px] tracking-widest uppercase font-black shadow-[0_0_40px_rgba(0,255,170,0.3)]">
                                <Zap className="w-5 h-5 mr-3" /> ACCELERATE PROFITS
                            </NeonButton>
                            <button className="px-12 h-16 rounded-full text-white text-[10px] font-black tracking-widest uppercase hover:bg-white/10 transition-all flex items-center gap-3 bg-white/5">
                                <Activity className="w-5 h-5" /> PERFORMANCE METRICS
                            </button>
                        </div>
                    </div>
                </motion.div>
            </section>


            {/* Core Metrics Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Sync Velocity", value: "x12.5", sub: "+2.4s today", icon: Gauge, color: "text-blue-400" },
                    { label: "Traffic Multiplier", value: "340%", sub: "Peak performance", icon: TrendingUp, color: "text-emerald-400" },
                    { label: "Indexing Load", value: "Normal", sub: "99.9% Success", icon: Cpu, color: "text-primary" },
                    { label: "Viral Probability", value: "High", sub: "Trend detected", icon: Activity, color: "text-orange-400" },
                ].map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <GlassPanel intensity="low" className="p-8 border-white/5 hover:border-primary/30 transition-all duration-500 group relative overflow-hidden bg-white/2">
                            <div className="flex items-start justify-between mb-6">
                                <div className={`w-14 h-14 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center group-hover:border-primary/50 transition-all shadow-xl group-hover:shadow-primary/20`}>
                                    <stat.icon className={cn("w-6 h-6 transition-transform duration-500 group-hover:scale-110", stat.color)} />
                                </div>
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">{stat.label}</p>
                                <p className={`text-4xl font-black ${stat.color} tracking-tighter mb-1 italic font-display`}>{stat.value}</p>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-bold text-white/40 uppercase">{stat.sub}</span>
                                    <div className="h-px flex-1 bg-white/5" />
                                </div>
                            </div>
                        </GlassPanel>
                    </motion.div>
                ))}
            </div>

            {/* Advanced Visualization & Scaling Logic */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Visual Chart Placeholder */}
                <GlassPanel className="lg:col-span-2 p-10 space-y-8 flex flex-col justify-between overflow-hidden relative">

                    <div className="space-y-2">
                        <h3 className="text-3xl font-black text-white tracking-tighter flex items-center gap-3 italic">
                            PROFIT PROJECTIONS
                        </h3>
                        <p className="text-gray-400 text-sm max-w-md italic">
                            Our proprietary neural forecasting engine predicts your wealth compounding based on current market trends.
                        </p>
                    </div>

                    {/* Mock CSS Chart */}
                    <div className="h-64 flex items-end gap-2 px-4 border-b border-l border-white/10 relative mt-8">
                        {/* Legend */}
                        <div className="absolute -left-12 top-0 h-full flex flex-col justify-between text-[8px] font-mono text-gray-600 uppercase">
                            <span>100k</span>
                            <span>50k</span>
                            <span>25k</span>
                            <span>5k</span>
                            <span>0k</span>
                        </div>

                        {[40, 65, 35, 85, 45, 95, 75, 88, 62, 92, 100, 85, 95, 120].map((h, i) => (
                            <motion.div
                                key={i}
                                initial={{ height: 0 }}
                                animate={{ height: `${h / 1.5}%` }}
                                transition={{ delay: i * 0.05, duration: 1 }}
                                className={`flex-1 rounded-t-sm bg-linear-to-t ${i > 10 ? 'from-primary to-emerald-400 shadow-[0_0_15px_rgba(0,255,170,0.3)]' : 'from-primary/20 to-primary/40'}`}
                            />
                        ))}
                    </div>

                    <div className="flex items-center gap-6 pt-4 border-t border-white/5">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded bg-primary/20" />
                            <span className="text-[10px] font-bold text-gray-500 uppercase">Baseline Growth</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded bg-primary" />
                            <span className="text-[10px] font-bold text-gray-500 uppercase">Accelerated Growth</span>
                        </div>
                    </div>
                </GlassPanel>

                {/* Right Column Features */}
                <div className="space-y-6">
                    <GlassPanel className="p-8 bg-linear-to-br from-primary/10 to-transparent border-primary/20">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2">
                                <Share2 className="w-5 h-5 text-primary" />
                                <span className="text-xs font-black text-white uppercase tracking-widest">Network Nodes</span>
                            </div>
                            <span className="text-[10px] font-mono text-primary font-bold">14.2k Active</span>
                        </div>
                        <div className="space-y-3">
                            {["Global Distributed Pings", "SEO Force Indexer", "Platform API Optimizer"].map(f => (
                                <div key={f} className="flex items-center justify-between p-3 rounded-lg bg-black/40 border border-white/5 group hover:border-primary/30 transition-all cursor-default">
                                    <span className="text-[10px] font-bold text-gray-300 uppercase">{f}</span>
                                    <CheckCircle2 className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            ))}
                        </div>
                    </GlassPanel>

                    <GlassPanel className="p-8 space-y-4">
                        <h4 className="text-xs font-black text-gray-500 uppercase tracking-widest">Growth Velocity</h4>
                        <div className="flex items-center gap-4">
                            <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "94%" }}
                                    className="h-full bg-linear-to-r from-primary to-emerald-500 shadow-[0_0_10px_rgba(0,255,170,0.5)]"
                                />
                            </div>
                            <span className="text-xs text-primary font-black">94%</span>
                        </div>
                        <p className="text-[10px] text-gray-500 leading-relaxed italic">
                            "Operating at maximum capital efficiency. Portfolios are fully optimized for current market volatility."
                        </p>
                    </GlassPanel>
                </div>
            </div>

            {/* Accelerator Masterclass Section */}
            <section className="space-y-10">
                <div className="flex flex-col md:flex-row items-end justify-between gap-6 px-2 border-b border-white/5 pb-8">
                    <div className="max-w-2xl">
                        <h2 className="text-4xl font-black text-white tracking-tighter uppercase mb-4 italic">The Wealth <span className="text-primary italic">Strategy Hub</span></h2>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            Unlock the full potential of your premium subscription. These proprietary strategies take years to master—we give you the blueprint in minutes.
                        </p>
                    </div>
                    <NeonButton variant="secondary" className="px-8 h-12 text-[10px] font-black uppercase tracking-widest">
                        Unlock Full Library
                    </NeonButton>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { title: "Zero-Latency Indexing", duration: "12:45", category: "Indexing", icon: Zap },
                        { title: "Distributed Traffic Loops", duration: "18:20", category: "Syndication", icon: Share2 },
                        { title: "Node Multiplication", duration: "15:10", category: "Scaling", icon: TrendingUp },
                    ].map((video, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + i * 0.1 }}
                        >
                            <GlassPanel className="p-0 overflow-hidden group border-white/5 hover:border-primary/30 transition-all cursor-pointer">
                                <div className="aspect-video relative bg-black flex items-center justify-center">
                                    <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent z-10" />
                                    <div className="absolute inset-0 opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700 bg-cover bg-center" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&q=80&w=800)` }} />

                                    <div className="relative z-20 w-12 h-12 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/50 flex items-center justify-center group-hover:scale-125 transition-transform duration-500">
                                        <Play className="w-5 h-5 text-primary ml-1" fill="currentColor" />
                                    </div>

                                    <div className="absolute bottom-4 left-4 z-20 px-2 py-1 rounded bg-black/80 border border-white/10 text-[8px] font-black text-primary uppercase tracking-widest">
                                        {video.category}
                                    </div>
                                    <div className="absolute bottom-4 right-4 z-20 text-[9px] font-mono text-gray-400">
                                        {video.duration}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h4 className="text-white font-black uppercase tracking-tight group-hover:text-primary transition-colors text-sm mb-2">{video.title}</h4>
                                    <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest leading-loose">Premium Masterclass Module {i + 1}</p>
                                </div>
                            </GlassPanel>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Final Call to Action */}
            <section className="py-16">
                <GlassPanel className="p-10 md:p-16 flex flex-col items-center text-center space-y-16 border-primary/20 bg-linear-to-b from-primary/5 via-black/40 to-transparent relative overflow-hidden rounded-[2.5rem] shadow-xl shadow-primary/5">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center shadow-[0_0_40px_rgba(0,255,170,0.15)] relative z-10 border border-primary/20 mx-auto mb-3">
                        <Zap className="w-7 h-7 text-primary" />
                    </div>

                    <div className="space-y-10 max-w-3xl relative z-10 flex flex-col items-center">
                        <h3 className="text-3xl md:text-5xl font-black text-white italic tracking-tighter uppercase leading-none font-display pr-[0.1em]">
                            EXPONENTIAL <span className="text-primary italic">GROWTH</span> <br />
                            <span className="text-xl md:text-2xl mt-4 block opacity-90">IS ONE SYNC AWAY</span>
                        </h3>
                        <p className="text-gray-400 text-base md:text-lg leading-relaxed font-medium opacity-80 max-w-xl mx-auto">
                            Stop settling for incremental gains. The Accelerator engine is primed and waiting for your command. Push your portfolio into the stratosphere now.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full max-w-lg relative z-10 pt-4">
                        <NeonButton variant="primary" className="h-16 px-12 text-xs font-black uppercase tracking-[0.2em] shadow-xl flex-1 w-full sm:w-auto">
                            SYNC NOW
                        </NeonButton>
                        <button className="h-16 px-10 rounded-full text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all flex-1 w-full sm:w-auto backdrop-blur-md bg-white/5">
                            CONTACT SUPPORT
                        </button>
                    </div>

                    <div className="pt-12 flex flex-wrap items-center justify-center gap-8 relative z-10 opacity-50">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary" />
                            <span className="text-[9px] uppercase font-black tracking-[0.15em] text-white">Encrypted Assets</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary" />
                            <span className="text-[9px] uppercase font-black tracking-[0.15em] text-white">Proprietary AI</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary" />
                            <span className="text-[9px] uppercase font-black tracking-[0.15em] text-white">Verified Security</span>
                        </div>
                    </div>
                </GlassPanel>
            </section>
        </div>
    );
}
