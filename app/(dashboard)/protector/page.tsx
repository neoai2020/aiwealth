"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Lock, EyeOff, UserX, AlertTriangle, ShieldAlert, Activity, ArrowRight, CheckCircle2, Shield, Globe, RefreshCcw, Database, HardDrive, Cpu, Search, Trash2, ChevronRight, Fingerprint, Plus } from "lucide-react";
import { GlassPanel } from "@/components/ui/glass-panel";
import { NeonButton } from "@/components/ui/neon-button";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

export default function ProtectorPage() {
    const [securityLevel, setSecurityLevel] = useState("Aggressive");

    return (
        <div className="space-y-12 pb-32">
            {/* Security Hero Section */}
            <section className="relative overflow-hidden p-8 md:p-16 rounded-[2.5rem] border border-emerald-500/20 bg-linear-to-br from-emerald-500/10 via-black to-emerald-500/5 shadow-2xl shadow-emerald-500/10">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px]" />

                <div className="relative z-10 flex flex-col items-center text-center gap-10">
                    <div className="space-y-6 max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400 mx-auto">
                            Wealth Guard Protocol
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none font-(family-name:--font-display)">
                            WEALTH <br />
                            <span className="inline-block pr-4 text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-green-500 font-black italic uppercase">PROTECTOR</span>
                        </h1>
                        <p className="text-gray-400 text-lg md:text-xl leading-relaxed font-medium max-w-2xl mx-auto">
                            Lock down your investment portfolio. Protector deploys institutional-grade risk filtering and asset anonymization to ensure your capital remains secure and your legacy is protected.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 pt-4">
                            <NeonButton className="px-10 h-14 bg-emerald-600 hover:bg-emerald-500 border-none text-[12px] tracking-widest uppercase font-black shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                                <ShieldCheck className="mr-2 w-4 h-4" /> ACTIVATE MAX PROTECTION
                            </NeonButton>
                            <button className="px-10 h-14 rounded-full text-white text-[10px] font-black tracking-widest uppercase hover:bg-white/10 transition-all flex items-center gap-2 bg-white/5">
                                <Search className="w-4 h-4" /> RISK ANALYSIS
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Security Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Risk Mitigation", value: "24,812", icon: UserX, color: "text-red-400", sub: "Last 24h" },
                    { label: "Asset Safety", value: "Verified", icon: Globe, color: "text-blue-400", sub: "Portfolio v4" },
                    { label: "Market Filtering", value: "Aggressive", icon: ShieldCheck, color: "text-emerald-400", sub: "Live Protocol" },
                    { label: "Secure Vaults", value: "156 Nodes", icon: Lock, color: "text-purple-400", sub: "Stealth Mode" },
                ].map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <GlassPanel intensity="low" className="p-8 border-white/5 group hover:border-emerald-500/30 transition-all duration-500 relative overflow-hidden bg-white/2">
                            <div className={`w-14 h-14 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center mb-6 group-hover:border-emerald-500/50 transition-all shadow-xl group-hover:shadow-emerald-500/20`}>
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

            {/* Domain Rotation Interface (NEW) */}
            <section className="space-y-8">
                <div className="flex items-center justify-between px-2">
                    <div>
                        <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">Asset <span className="text-emerald-500">Diversifier</span></h2>
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1 italic">Prevent capital concentration with automated asset diversification</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Rotator Config */}
                    <GlassPanel className="lg:col-span-2 p-10 space-y-10 relative overflow-hidden">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Active Batch</label>
                                    <div className="text-4xl font-black text-white italic tracking-tighter uppercase">Portfolio Strategy-A</div>
                                </div>
                                <div className="space-y-4 font-mono">
                                    <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                                        <span className="text-xs text-emerald-400">secure-node-01.io</span>
                                        <span className="text-[8px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 uppercase font-black">Active</span>
                                    </div>
                                    <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between opacity-50">
                                        <span className="text-xs text-gray-500">bridge-vault-proxy.net</span>
                                        <span className="text-[8px] px-2 py-0.5 rounded bg-white/5 text-gray-500 uppercase font-black">Waitlisted</span>
                                    </div>
                                    <button className="w-full h-[50px] border border-dashed border-emerald-500/20 rounded-xl text-[11px] text-emerald-400 uppercase font-bold hover:bg-emerald-500/5 transition-all flex items-center justify-center gap-2">
                                        <Plus className="w-4 h-4" />
                                        Add Investment Endpoint
                                    </button>
                                </div>
                            </div>

                            <GlassPanel intensity="low" className="p-6 bg-black/40 border-emerald-500/20 flex flex-col justify-between">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2">
                                        <Fingerprint className="w-4 h-4 text-emerald-400" />
                                        <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Asset Encryption</span>
                                    </div>
                                    <div className="space-y-3">
                                        {[
                                            "Capital Masking",
                                            "Secure Portfolio Spoofing",
                                            "Yield Optimization Injection",
                                            "Automated Rebalancing Simulation"
                                        ].map((f, i) => (
                                            <div key={i} className="flex items-center gap-3">
                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                                <span className="text-xs text-gray-300 font-medium">{f}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="pt-6 border-t border-white/5 mt-6">
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-[8px] font-black text-gray-500 uppercase">Detection Risk</span>
                                        <span className="text-xs font-black text-emerald-400 italic">Negligible</span>
                                    </div>
                                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-emerald-500/40 w-[12%]" />
                                    </div>
                                </div>
                            </GlassPanel>
                        </div>

                        <NeonButton className="w-full h-16 bg-emerald-600/10 hover:bg-emerald-600/20 border-emerald-500/30 text-emerald-400 font-black tracking-widest uppercase italic shadow-lg shadow-emerald-500/5 mt-10">
                            REBALANCE PORTFOLIO
                        </NeonButton>
                    </GlassPanel>

                    {/* Security Level Config */}
                    <div className="space-y-6">
                        <GlassPanel className="p-8 border-emerald-500/30 bg-linear-to-br from-emerald-500/10 to-transparent">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-2 rounded-lg bg-emerald-500/20 border border-emerald-500/40">
                                    <Lock className="w-5 h-5 text-emerald-400" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-black text-white uppercase tracking-widest">Hardening Level</h3>
                                    <p className="text-[10px] text-emerald-400 font-bold tracking-widest uppercase">System Security</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3 mb-8">
                                {["Moderate", "Aggressive", "Elite", "Phantom"].map(lvl => (
                                    <button
                                        key={lvl}
                                        onClick={() => setSecurityLevel(lvl)}
                                        className={cn(
                                            "py-3 rounded-xl border text-[9px] font-black uppercase tracking-widest transition-all",
                                            securityLevel === lvl
                                                ? "bg-emerald-600 border-emerald-400 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                                                : "bg-white/5 border-white/10 text-gray-500 hover:border-emerald-500/30"
                                        )}
                                    >
                                        {lvl}
                                    </button>
                                ))}
                            </div>
                            <div className="space-y-4">
                                <p className="text-xs text-gray-400 leading-relaxed italic">
                                    "Level set to **{securityLevel}**. This protocol enables {securityLevel === "Phantom" ? "complete IP shadowing and domain ghosting" : "standard link encryption and bot deflection"}."
                                </p>
                                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] w-[85%]" />
                                </div>
                            </div>
                        </GlassPanel>

                    </div>
                </div>
            </section>


            {/* Final Call to Action */}
            <section className="py-16">
                <GlassPanel className="p-10 md:p-16 flex flex-col items-center text-center space-y-16 border-emerald-500/20 bg-linear-to-b from-emerald-500/5 via-black to-transparent relative overflow-hidden rounded-[2.5rem] shadow-xl shadow-emerald-500/5">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.15)] relative z-10 border border-emerald-500/20 mx-auto mb-3">
                        <Lock className="w-7 h-7 text-emerald-400" />
                    </div>

                    <div className="space-y-10 max-w-3xl relative z-10 flex flex-col items-center">
                        <h3 className="text-3xl md:text-5xl font-black text-white italic tracking-tighter uppercase leading-none font-display pr-[0.1em]">
                            BULLETPROOF YOUR <br />
                            <span className="text-emerald-400 italic">PROFIT FLOW</span>
                        </h3>
                        <p className="text-gray-400 text-base md:text-lg leading-relaxed font-medium opacity-80 max-w-xl mx-auto">
                            Don't leave your assets vulnerable. Activate our institutional-grade protection suite and ensure your financial legacy is built on bedrock.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full max-w-lg relative z-10 pt-4">
                        <NeonButton className="h-16 px-12 text-xs font-black uppercase tracking-[0.2em] shadow-xl bg-emerald-600 hover:bg-emerald-500 flex-1 w-full sm:w-auto">
                            DEPLOY PROTECTION
                        </NeonButton>
                        <button className="h-16 px-10 rounded-full text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all flex-1 w-full sm:w-auto backdrop-blur-md bg-white/5">
                            VIEW SYSTEM LOGS
                        </button>
                    </div>

                    <div className="pt-12 flex flex-wrap items-center justify-center gap-8 relative z-10 opacity-50">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            <span className="text-[9px] uppercase font-black tracking-[0.15em] text-white">Institutional Grade</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            <span className="text-[9px] uppercase font-black tracking-[0.15em] text-white">Anonymized Assets</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            <span className="text-[9px] uppercase font-black tracking-[0.15em] text-white">Zero Exploits</span>
                        </div>
                    </div>
                </GlassPanel>
            </section>
        </div >
    );
}
