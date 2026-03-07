"use client";

import { GlassPanel } from "@/components/ui/glass-panel";
import { NeonButton } from "@/components/ui/neon-button";
import { CheckCircle, Globe, Signal, RefreshCw, BarChart3, Zap, ArrowRight, User, TrendingUp, Play, ShieldCheck, Clock, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/auth-context";
import { SmartImage } from "@/components/ui/smart-image";

interface ScrapedData {
    title: string;
    description: string;
    image: string | null;
}

interface BridgePreviewProps {
    url: string;
    data?: ScrapedData | null;
    bridgeId?: string | null;
}

export function BridgePreview({ url, data, bridgeId }: BridgePreviewProps) {
    const [broadcasted, setBroadcasted] = useState(false);
    const [saving, setSaving] = useState(false);
    const [previewUrl, setPreviewUrl] = useState("");
    const router = useRouter();
    const { user } = useAuth();

    // Use passed ID or fallback to fake for display if needed (though should be real)
    const displayId = bridgeId || `BRG-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    useEffect(() => {
        const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://ai-wealth.com';
        if (bridgeId) {
            setPreviewUrl(`${baseUrl}/review/${bridgeId}`);
        } else {
            const params = new URLSearchParams();
            if (data?.title) params.append('title', data.title);
            if (data?.description) params.append('description', (data.description || "").substring(0, 200) + '...'); // Truncate for URL safety
            if (data?.image) params.append('image', data.image);
            if (url) params.append('url', url);
            setPreviewUrl(`${baseUrl}/review/preview?${params.toString()}`);
        }
    }, [bridgeId, data, url]);

    const handleBroadcast = async () => {
        setBroadcasted(true);
        setSaving(true);

        try {
            if (bridgeId) {
                // Update existing bridge status to 'live'
                const { error } = await supabase
                    .from('bridges')
                    .update({
                        status: 'live',
                        traffic: '0',
                        earnings: '$0.00'
                    })
                    .eq('id', bridgeId);

                if (error) throw error;
            } else {
                // FALLBACK: If bridge wasn't saved during sync, save it now!
                if (!user) throw new Error("User not authenticated");

                // Reconstruct title/desc logic roughly if needed
                let title = data?.title || "Wealth Bridge";
                if (!data?.title) {
                    try {
                        const hostname = new URL(url).hostname;
                        const domain = hostname.replace('www.', '').split('.')[0];
                        title = `Bridge - ${domain.charAt(0).toUpperCase() + domain.slice(1)}`;
                    } catch (e) { }
                }

                const { error: insertError } = await supabase.from('bridges').insert({
                    user_id: user.id,
                    title: title.substring(0, 255),
                    description: (data?.description || "").substring(0, 1000),
                    image_url: data?.image || null,
                    affiliate_url: url,
                    status: 'live', // Directly live
                    traffic: '0',
                    earnings: '$0.00'
                });

                if (insertError) throw insertError;
            }

            setTimeout(() => {
                router.push('/bridges');
                router.refresh(); // Refresh to ensure list is updated
            }, 2000);
        } catch (error: any) {
            console.error('Error:', error);
            setSaving(false);
            setBroadcasted(false);
            // Show explicit error to user
            alert(`Broadcast failed: ${error?.message || "Unknown error"}`);
        }
    };

    return (
        <div className="min-h-screen pb-20 w-full flex flex-col items-center">
            {/* Success Banner */}
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-center py-6"
            >
                <div className="inline-flex items-center gap-3 text-emerald-400 bg-emerald-500/10 px-6 py-2 rounded-full border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                    <CheckCircle className="w-4 h-4" />
                    <span className="font-bold uppercase text-sm tracking-wide">Ready for Broadcast</span>
                    <span className="text-gray-500 font-mono text-xs border-l border-white/10 pl-3">#{displayId.substring(0, 8)}</span>
                </div>
            </motion.div>

            {/* PREVIEW CONTAINER */}
            <div className="mb-12 w-full px-4 md:px-8 flex justify-center overflow-hidden">
                <div className="relative w-full max-w-[1200px] bg-[#0f1115] rounded-2xl border border-white/10 shadow-2xl overflow-hidden">

                    {/* Browser Toolbar */}
                    <div className="flex items-center px-6 py-4 gap-4 bg-[#0f1115] border-b border-white/5 z-20 relative">
                        <div className="flex gap-2.5">
                            <div className="w-3.5 h-3.5 rounded-full bg-[#FF5F57] hover:bg-[#FF5F57]/80 transition-colors" />
                            <div className="w-3.5 h-3.5 rounded-full bg-[#FEBC2E] hover:bg-[#FEBC2E]/80 transition-colors" />
                            <div className="w-3.5 h-3.5 rounded-full bg-[#28C840] hover:bg-[#28C840]/80 transition-colors" />
                        </div>
                        <div className="flex-1 bg-[#1c1e24] rounded-lg h-10 flex items-center px-5 text-gray-400 font-mono text-sm border border-white/5 transition-colors hover:bg-[#23252b] hover:border-white/10 group">
                            <Globe className="w-4 h-4 mr-3 text-emerald-500 group-hover:text-emerald-400 transition-colors" />
                            <span className="truncate max-w-[calc(100%-120px)] text-emerald-400/80 group-hover:text-emerald-400 transition-colors">
                                {previewUrl || "Loading..."}
                            </span>

                            {/* External Link Button */}
                            {previewUrl && (
                                <a
                                    href={previewUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ml-auto flex items-center gap-2 px-3 py-1 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-bold transition-colors border border-emerald-500/20"
                                >
                                    <span>OPEN</span>
                                    <ExternalLink className="w-3 h-3" />
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Scalable Content Area */}
                    <div className="w-full relative bg-slate-50 h-[600px] overflow-y-auto scrollbar-hide font-sans text-slate-900">
                        {/* Top Bar Preview */}
                        <div className="bg-white border-b border-slate-200 sticky top-0 z-10 px-6 h-12 flex items-center justify-between">
                            <div className="text-sm font-bold text-slate-800">Wealth<span className="text-emerald-600">Bridge</span></div>
                            <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase text-slate-500">
                                <ShieldCheck className="w-3 h-3 text-emerald-500" /> Verified Review
                            </div>
                        </div>

                        <div className="p-8 md:p-12">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                                {/* Left: Product Image */}
                                <div className="relative group rounded-xl border border-slate-200 shadow-xl overflow-hidden p-4 flex items-center justify-center bg-white aspect-4/3">
                                    {data?.image ? (
                                        <SmartImage
                                            src={data.image}
                                            alt={data.title || "Scraped Product"}
                                            className="object-contain w-full h-full drop-shadow-md mix-blend-multiply"
                                        />
                                    ) : (
                                        <div className="flex flex-col items-center justify-center p-6 text-center text-slate-300">
                                            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mb-4 animate-pulse">
                                                <Zap className="w-6 h-6 text-slate-300" />
                                            </div>
                                            <p className="text-sm font-bold text-slate-400">Image Pending</p>
                                        </div>
                                    )}
                                    <div className="absolute top-4 right-4 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-md animate-pulse">
                                        LIVE OFFER
                                    </div>
                                </div>

                                {/* Right: Content */}
                                <div className="space-y-6">
                                    <div>
                                        <div className="inline-flex items-center gap-1.5 mb-3 px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase border border-emerald-100">
                                            <div className="w-1 h-1 rounded-full bg-emerald-500" /> Recommended
                                        </div>
                                        <h1 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight mb-4">
                                            {data?.title || "Product Title Placeholder"}
                                        </h1>
                                        <p className="text-slate-600 leading-relaxed text-sm">
                                            {data?.description || "This is a placeholder description. Once the bridge is live, the actual product description scraped from the target URL will appear here."}
                                        </p>
                                    </div>

                                    <div className="space-y-2 border-y border-slate-100 py-4">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="flex items-center gap-2">
                                                <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                                                    <ArrowRight className="w-2.5 h-2.5 text-emerald-600" />
                                                </div>
                                                <div className="h-2 bg-slate-100 rounded w-3/4" />
                                            </div>
                                        ))}
                                    </div>

                                    <button className="w-full bg-slate-900 text-white font-bold py-3 rounded-lg shadow-lg text-sm uppercase tracking-wide">
                                        Get Instant Access
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CONTROLS - REFINED DESIGN */}
            <div className="w-full px-4 md:px-8 max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">

                    {/* Status Card 1 */}
                    <div className="bg-[#0b0c10] border border-white/10 rounded-2xl p-6 flex flex-col justify-between h-[160px] relative overflow-hidden group hover:border-emerald-500/30 transition-all duration-500 shadow-lg shadow-black/50">
                        <div className="flex justify-between items-start">
                            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.2em] group-hover:text-emerald-400/70 transition-colors">Index Status</p>
                            <Globe className="w-5 h-5 text-emerald-500 opacity-60 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="relative z-10 space-y-3">
                            <h3 className="text-3xl font-bold text-white tracking-tight leading-none group-hover:scale-[1.02] transition-transform origin-left">Google / Bing</h3>
                            <div className="flex items-center gap-2.5">
                                <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse shadow-[0_0_8px_rgba(234,179,8,0.6)]" />
                                <p className="text-[11px] text-yellow-500/90 font-bold tracking-widest uppercase">Pending Sync...</p>
                            </div>
                        </div>
                        <div className="absolute bottom-0 left-0 w-full h-[3px] bg-linear-to-r from-emerald-600 to-emerald-400 opacity-40 group-hover:opacity-100 transition-opacity" />
                    </div>

                    {/* Status Card 2 */}
                    <div className="bg-[#0b0c10] border border-white/10 rounded-2xl p-6 flex flex-col justify-between h-[160px] relative overflow-hidden group hover:border-blue-500/30 transition-all duration-500 shadow-lg shadow-black/50">
                        <div className="flex justify-between items-start">
                            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.2em] group-hover:text-blue-400/70 transition-colors">Signal Strength</p>
                            <Signal className="w-5 h-5 text-blue-500 opacity-60 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="relative z-10 space-y-3">
                            <h3 className="text-5xl font-black text-white tracking-tighter leading-none group-hover:scale-[1.02] transition-transform origin-left">12%</h3>
                            <div className="flex items-center gap-2">
                                <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
                                <p className="text-[11px] text-blue-400/90 font-bold tracking-widest uppercase">+2% this week</p>
                            </div>
                        </div>
                        <div className="absolute bottom-0 left-0 w-full h-[3px] bg-linear-to-r from-blue-600 to-blue-400 opacity-40 group-hover:opacity-100 transition-opacity" />
                    </div>

                    {/* Status Card 3 */}
                    <div className="bg-[#0b0c10] border border-white/10 rounded-2xl p-6 flex flex-col justify-between h-[160px] relative overflow-hidden group hover:border-purple-500/30 transition-all duration-500 shadow-lg shadow-black/50">
                        <div className="flex justify-between items-start">
                            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.2em] group-hover:text-purple-400/70 transition-colors">Est. Conversion</p>
                            <BarChart3 className="w-5 h-5 text-purple-500 opacity-60 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="relative z-10 space-y-3">
                            <h3 className="text-5xl font-black text-white tracking-tighter leading-none group-hover:scale-[1.02] transition-transform origin-left">4.2%</h3>
                            <div className="flex items-center gap-2">
                                <div className="px-2 py-0.5 rounded-sm bg-purple-500/20 text-purple-300 text-[10px] font-black uppercase border border-purple-500/30">High</div>
                                <p className="text-[11px] text-purple-400/90 font-bold tracking-widest uppercase">Potential</p>
                            </div>
                        </div>
                        <div className="absolute bottom-0 left-0 w-full h-[3px] bg-linear-to-r from-purple-600 to-purple-400 opacity-40 group-hover:opacity-100 transition-opacity" />
                    </div>

                    {/* Broadcast Button */}
                    <button
                        onClick={handleBroadcast}
                        disabled={broadcasted}
                        className="bg-[#0b0c10] hover:bg-[#0f1115] border border-primary/20 hover:border-primary/50 rounded-2xl p-6 flex flex-col justify-between h-[160px] relative overflow-hidden group transition-all duration-300 text-left w-full shadow-lg shadow-black/50 hover:shadow-primary/20 cursor-pointer"
                    >
                        <div className="flex justify-between items-start w-full">
                            <p className="text-[11px] font-bold text-primary uppercase tracking-[0.2em]">Action Required</p>
                            <Zap className="w-5 h-5 text-primary animate-[pulse_2s_infinite]" />
                        </div>

                        <div className="relative z-10 mt-auto">
                            {broadcasted ? (
                                <div className="flex items-center gap-3">
                                    <RefreshCw className="w-6 h-6 animate-spin text-white" />
                                    <h3 className="text-3xl font-black text-white uppercase tracking-wider">
                                        {saving ? 'Processing' : 'Done'}
                                    </h3>
                                </div>
                            ) : (
                                <div className="flex items-center justify-between w-full group-hover:translate-x-1 transition-transform duration-300">
                                    <h3 className="text-3xl font-black text-white uppercase tracking-wider group-hover:text-primary transition-colors">Broadcast</h3>
                                    <ArrowRight className="w-8 h-8 text-white group-hover:text-primary transition-colors" />
                                </div>
                            )}
                            <p className="text-[10px] text-gray-500 font-mono tracking-[0.15em] mt-3 uppercase group-hover:text-primary/70 transition-colors">Initiate Traffic Flow</p>
                        </div>

                        <div className="absolute bottom-0 left-0 w-full h-[3px] bg-linear-to-r from-primary to-primary/50 shadow-[0_-2px_10px_rgba(var(--primary),0.5)]" />
                        <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    </button>

                </div>
            </div>
        </div>
    );
}
