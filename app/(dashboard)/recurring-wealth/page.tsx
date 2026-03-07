"use client";

import { motion } from "framer-motion";
import { RefreshCw, DollarSign, PieChart, Layers, Calendar, ArrowUpRight, ShieldCheck, Zap, Plus, ChevronRight, TrendingUp, Users, HeartPulse, Wallet, ShieldAlert, BookOpen, Search, Rocket, CheckCircle2 } from "lucide-react";
import { GlassPanel } from "@/components/ui/glass-panel";
import { NeonButton } from "@/components/ui/neon-button";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

export default function RecurringWealthPage() {
    const [selectedTier, setSelectedTier] = useState("Pro");

    return (
        <div className="space-y-12 pb-32">
            {/* Header Section */}
            <section className="relative overflow-hidden p-8 md:p-16 rounded-[2.5rem] border border-purple-500/20 bg-linear-to-br from-purple-500/10 via-black to-purple-500/5 shadow-2xl shadow-purple-500/10">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />

                <div className="relative z-10 flex flex-col items-center text-center gap-10">
                    <div className="space-y-6 max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-[10px] font-black uppercase tracking-[0.2em] text-purple-400 mx-auto">
                            Elite Stream Engine
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none font-(family-name:--font-display)">
                            RECURRING <br />
                            <span className="inline-block pr-4 text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-500 italic uppercase">WEALTH</span>
                        </h1>
                        <p className="text-gray-400 text-lg md:text-xl leading-relaxed font-medium max-w-2xl mx-auto">
                            The ultimate blueprint for sustainable investment growth. Our engine builds automated, high-retention wealth portfolios that scale your capital.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 pt-4">
                            <NeonButton className="px-10 h-14 bg-purple-600 hover:bg-purple-500 border-none text-[12px] tracking-widest uppercase font-black shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                                <RefreshCw className="mr-2 w-4 h-4" /> SYNC WEALTH STREAMS
                            </NeonButton>
                            <button className="px-10 h-14 rounded-full text-white text-[10px] font-black tracking-widest uppercase hover:bg-white/10 transition-all flex items-center gap-2 bg-white/5">
                                <Search className="w-4 h-4" /> EXPLORE BLUEPRINTS
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Income Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Active Subs", value: "1,240", icon: Users, color: "text-blue-400", sub: "+12% MoM" },
                    { label: "Retention Rate", value: "94.8%", icon: HeartPulse, color: "text-purple-400", sub: "Elite Tier" },
                    { label: "Churn Stability", value: "98.2", icon: ShieldCheck, color: "text-emerald-400", sub: "Verified" },
                    { label: "Est. LTV", value: "$420", icon: DollarSign, color: "text-yellow-400", sub: "Per Stream" },
                ].map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <GlassPanel intensity="low" className="p-8 border-white/5 group hover:border-purple-500/30 transition-all duration-500 relative overflow-hidden bg-white/2">
                            <div className={`w-14 h-14 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center mb-6 group-hover:border-purple-500/50 transition-all shadow-xl group-hover:shadow-purple-500/20`}>
                                <stat.icon className={cn("w-6 h-6 transition-transform duration-500 group-hover:scale-110", stat.color)} />
                            </div>
                            <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-1">{stat.label}</h4>
                            <p className="text-4xl font-black text-white font-display tracking-tighter mb-1 italic">{stat.value}</p>
                            <div className="flex items-center gap-2">
                                <span className={`text-[10px] font-bold uppercase ${stat.color}`}>{stat.sub}</span>
                                <div className="h-px flex-1 bg-white/5" />
                            </div>
                        </GlassPanel>
                    </motion.div>
                ))}
            </div>

            {/* Subscription Builder UI (NEW) */}
            <section className="space-y-8">
                <div className="px-2">
                    <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">Subscription <span className="text-purple-500">Architect</span></h2>
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1 italic">Configure high-retention investment tiers</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Tier Configurator */}
                    <GlassPanel className="lg:col-span-2 p-8 md:p-12 space-y-8 relative overflow-hidden">

                        <div className="flex flex-wrap gap-4 relative z-10">
                            {["Basic", "Pro", "Elite"].map(tier => (
                                <button
                                    key={tier}
                                    onClick={() => setSelectedTier(tier)}
                                    className={cn(
                                        "px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all",
                                        selectedTier === tier
                                            ? "bg-purple-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                                            : "bg-white/5 text-gray-400 hover:bg-white/10"
                                    )}
                                >
                                    {tier} Node
                                </button>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 relative z-10 items-stretch">
                            <div className="md:col-span-7 space-y-8 flex flex-col justify-center">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Base Payout</label>
                                    <div className="text-4xl font-black text-white italic tracking-tighter">
                                        {selectedTier === "Basic" ? "$19" : selectedTier === "Pro" ? "$49" : "$197"}<span className="text-sm text-gray-500 ml-1">/ mo</span>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <h4 className="text-[10px] font-black text-purple-400 uppercase tracking-widest">Node Features</h4>
                                    <div className="space-y-3">
                                        {[
                                            "Automated Portfolio Rebalancing",
                                            "Market Growth Access",
                                            selectedTier !== "Basic" ? "Custom Domain Mapping" : null,
                                            selectedTier === "Elite" ? "Direct API Integration" : null,
                                        ].filter(Boolean).map((f, i) => (
                                            <div key={i} className="flex items-center gap-3">
                                                <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                                                <span className="text-xs text-gray-300 font-medium">{f}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <GlassPanel intensity="low" className="md:col-span-5 p-6 bg-black/40 border-purple-500/20 flex flex-col justify-between">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 mb-2">
                                        <TrendingUp className="w-4 h-4 text-emerald-400" />
                                        <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Growth Forecast</span>
                                    </div>
                                    <p className="text-[10px] text-gray-400 leading-relaxed italic">
                                        This tier configuration is optimized for {selectedTier === "Elite" ? "high-ticket whale leads" : "mass-market volume scaling"}.
                                    </p>
                                </div>
                                <div className="pt-6 border-t border-white/5">
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Est. Monthly Scale</span>
                                        <span className="text-xs font-black text-white italic">+$4,200</span>
                                    </div>
                                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-emerald-500/40 w-[65%] shadow-[0_0_10px_rgba(16,185,129,0.2)]" />
                                    </div>
                                </div>
                            </GlassPanel>
                        </div>

                        <NeonButton className="w-full h-14 bg-purple-600 hover:bg-purple-500 border-none text-white font-black tracking-[0.2em] uppercase italic shadow-[0_0_30px_rgba(168,85,247,0.3)] mt-10">
                            UPDATE STRATEGY
                        </NeonButton>
                    </GlassPanel>

                    {/* Churn Shield Stats */}
                    <div className="flex flex-col gap-6">
                        <GlassPanel className="flex-1 p-8 border-purple-500/30 bg-linear-to-br from-purple-500/10 to-transparent flex flex-col justify-between">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 rounded-lg bg-purple-500/20 border border-purple-500/40">
                                    <HeartPulse className="w-5 h-5 text-purple-400 animate-pulse" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-black text-white uppercase tracking-widest">Churn Shield</h3>
                                    <p className="text-[10px] text-purple-400 font-bold tracking-widest uppercase">Active Protection</p>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                                        <span>Deflection Success</span>
                                        <span className="text-purple-400">84%</span>
                                    </div>
                                    <div className="h-1.5 bg-black/40 rounded-full overflow-hidden">
                                        <div className="h-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)] w-[84%]" />
                                    </div>
                                </div>
                                <p className="text-xs text-gray-400 leading-relaxed italic font-sans">
                                    "Our AI detects cancellation signals through behavior patterns and automatically deploys portfolio-specific retention strategies."
                                </p>
                            </div>
                        </GlassPanel>

                        <GlassPanel intensity="low" className="p-6 space-y-3 border-orange-400/10 bg-orange-400/2">
                            <div className="flex items-center gap-2">
                                <ShieldAlert className="w-4 h-4 text-orange-400" />
                                <span className="text-[10px] font-black text-orange-400 uppercase tracking-widest">Active Alerts</span>
                            </div>
                            <div className="p-4 rounded-xl bg-orange-400/5 border border-orange-400/10">
                                <p className="text-[11px] text-gray-400 font-medium leading-relaxed">3 subscribers in 'At-Risk' phase. Wealth Shield protocols engaged.</p>
                            </div>
                        </GlassPanel>
                    </div>
                </div>
            </section>

            {/* Passive Income Roadmap (Timeline) */}
            <section className="space-y-12">
                <div className="text-center space-y-4">
                    <h2 className="text-4xl font-black text-white tracking-tighter uppercase italic">Passive Income <span className="text-purple-500 underline decoration-purple-500/30">Roadmap</span></h2>
                    <p className="text-gray-500 text-sm font-bold uppercase tracking-[0.3em]">Phase-based wealth compounding strategy</p>
                </div>

                <div className="relative pt-10 pb-10">
                    {/* Central Line */}
                    <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-white/5 -translate-x-1/2 hidden md:block" />

                    <div className="space-y-20 relative z-10">
                        {[
                            { phase: "01", title: "Foundation Assets", desc: "Setting up your first 10 wealth portfolios and targeting core recurring niches (Software, Hosting, Subscriptions).", icon: Layers, align: "left" },
                            { phase: "02", title: "Growth Compounding", desc: "Engaging the Accelerator engine to scale each portfolio to 1k active users and building the first tier-1 sub base.", icon: Zap, align: "right" },
                            { phase: "03", title: "Equity Automation", desc: "Enabling Wealth Shield and automated rewards to maximize LTV and stabilizing revenue above $10k/mo.", icon: RefreshCw, align: "left" },
                            { phase: "04", title: "Global Exit Strategy", desc: "Selling highly stabilized recurring portfolios on premium marketplaces for 24-36x monthly revenue multiples.", icon: Rocket, align: "right" },
                        ].map((step, i) => (
                            <div key={i} className={cn("flex flex-col md:flex-row items-center gap-10", step.align === "left" ? "md:flex-row" : "md:flex-row-reverse")}>
                                <div className="flex-1 w-full">
                                    <motion.div
                                        initial={{ opacity: 0, x: step.align === "left" ? -50 : 50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                    >
                                        <GlassPanel className={cn("p-8 md:p-10 space-y-4 hover:border-purple-500/40 transition-all bg-white/1", step.align === "left" ? "text-right" : "text-left")}>
                                            <div className={cn("flex items-center gap-4 mb-2", step.align === "left" ? "justify-end" : "justify-start")}>
                                                <span className="text-5xl md:text-6xl font-black text-white/5 uppercase italic">{step.phase}</span>
                                                <h3 className="text-2xl font-black text-white uppercase tracking-tight italic">{step.title}</h3>
                                            </div>
                                            <p className="text-gray-400 text-sm leading-relaxed max-w-lg ml-auto mr-auto md:ml-0 md:mr-0 inline-block font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                                                {step.desc}
                                            </p>
                                        </GlassPanel>
                                    </motion.div>
                                </div>

                                <div className="shrink-0 relative">
                                    <div className="w-16 h-16 rounded-full bg-black border border-purple-500/50 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.3)] relative z-20 overflow-hidden">
                                        <div className="absolute inset-0 bg-purple-500/10 animate-pulse" />
                                        <step.icon className="w-6 h-6 text-purple-400 relative z-10" />
                                    </div>
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl -z-10" />
                                </div>

                                <div className="flex-1 hidden md:block" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Premium Funnel Templates (NEW) */}
            <section className="space-y-10">
                <div className="flex flex-col md:flex-row items-end justify-between gap-6 px-2">
                    <div>
                        <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">Stream <span className="text-purple-500">Templates</span></h2>
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1 italic">Deploy proven recurring architectures</p>
                    </div>
                    <button className="flex items-center gap-2 text-[10px] font-black text-purple-400 uppercase tracking-widest hover:text-white transition-colors">
                        View Marketplace <ChevronRight className="w-4 h-4" />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        { title: "SaaS Bridge v1", niche: "Technology", roi: "240%", color: "border-blue-500/30" },
                        { title: "Mastermind Node", niche: "Education", roi: "410%", color: "border-purple-500/30" },
                        { title: "VPN Affiliate Box", niche: "Security", roi: "180%", color: "border-emerald-500/30" },
                    ].map((tpl, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <GlassPanel className={cn("p-8 space-y-6 group hover:shadow-2xl hover:shadow-purple-500/5 transition-all text-center relative overflow-hidden", tpl.color)}>
                                <div className="space-y-1">
                                    <h4 className="text-white font-black uppercase tracking-tight group-hover:text-purple-400 transition-colors text-lg italic">{tpl.title}</h4>
                                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em]">{tpl.niche} Architecture</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/5">
                                    <div>
                                        <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest mb-1">Potential ROI</p>
                                        <p className="text-sm font-black text-emerald-400 font-display italic">{tpl.roi}</p>
                                    </div>
                                    <div>
                                        <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest mb-1">Setup Time</p>
                                        <p className="text-sm font-black text-white font-display italic">12 min</p>
                                    </div>
                                </div>
                                <NeonButton variant="ghost" className="w-full h-12 bg-white/10 hover:bg-white/20 border-white/20 text-[10px] font-black uppercase tracking-[0.2em] italic text-white shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                                    DEPLOY TEMPLATE
                                </NeonButton>
                            </GlassPanel>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Final Call to Action */}
            <section className="py-16">
                <GlassPanel className="p-10 md:p-16 flex flex-col items-center text-center space-y-16 border-purple-500/20 bg-linear-to-b from-purple-500/5 via-black to-transparent relative overflow-hidden rounded-[2.5rem] shadow-xl shadow-purple-500/5">
                    <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center shadow-[0_0_40px_rgba(168,85,247,0.15)] relative z-10 border border-purple-500/20 mx-auto mb-3">
                        <RefreshCw className="w-7 h-7 text-purple-400" />
                    </div>

                    <div className="space-y-10 max-w-3xl relative z-10 flex flex-col items-center">
                        <h3 className="text-3xl md:text-5xl font-black text-white italic tracking-tighter uppercase leading-none font-display pr-[0.1em]">
                            COMPOUND YOUR <br />
                            <span className="text-purple-400 italic">FREEDOM</span>
                        </h3>
                        <p className="text-gray-400 text-base md:text-lg leading-relaxed font-medium opacity-80 max-w-xl mx-auto">
                            Stop trading time for money. Activate our automated wealth streams and watch your capital compound with institutional precision.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full max-w-lg relative z-10 pt-4">
                        <NeonButton variant="primary" className="h-16 px-12 text-xs font-black uppercase tracking-[0.2em] shadow-xl bg-purple-600 hover:bg-purple-500 flex-1 w-full sm:w-auto">
                            INITIATE GROWTH
                        </NeonButton>
                        <button className="h-16 px-10 rounded-full text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all flex-1 w-full sm:w-auto backdrop-blur-md bg-white/5">
                            SPEAK TO ADVISOR
                        </button>
                    </div>

                    <div className="pt-12 flex flex-wrap items-center justify-center gap-8 relative z-10 opacity-50">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-purple-400" />
                            <span className="text-[9px] uppercase font-black tracking-[0.15em] text-white">Automated Yield</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-purple-400" />
                            <span className="text-[9px] uppercase font-black tracking-[0.15em] text-white">Risk Optimized</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-purple-400" />
                            <span className="text-[9px] uppercase font-black tracking-[0.15em] text-white">Passive Scaling</span>
                        </div>
                    </div>
                </GlassPanel>
            </section>
        </div>
    );
}
